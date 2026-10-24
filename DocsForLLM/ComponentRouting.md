# Command-owned component routing

This is the implemented API guide for the button/select infrastructure accepted in [ADR 0004](ADR/0004-CommandComponentRouting.md). Modals are not part of this implementation. [`SaveArchiveProgram/TransferToChinaCommand.cs`](../SaveArchiveProgram/TransferToChinaCommand.cs) is a current consumer; the compile-only generic example is [`PSLDiscordBot.Core/Command/Global/Template/ComponentCommand.cs`](../PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Template/ComponentCommand.cs), which deliberately has no active `[AddToGlobal]` attribute.

## Command and route API

Discoverable slash commands are keyed singletons. A command that owns components overrides:

```csharp
public override Task HandleInteraction(
	SocketInteraction arg,
	object executer)
```

Create a button/select custom ID with the protected `BasicCommandBase.CreateComponentId(payload)` helper. It delegates to `ComponentRoutingUtility.CreateComponentId(commandType, payload)`, which takes the payload as raw bytes (`ReadOnlySpan<byte>`); there is no string/delimiter payload API. The complete ID, including the Framework envelope, must fit Discord's 100-character custom-ID limit; the utility validates this after encoding and throws instead of trimming. `component.GetComponentPayload()` returns the payload as a raw `byte[]`; commands own their payload format (current consumers use MemoryPack).

`CreateComponentId` emits an **encrypted** envelope. The binary wire layout is `{nonce:12}{tag:12}{ciphertext}{0xFF}`, encoded with `Base16384CJK` at 14 bits per CJK character so the result fits Discord's 100-character limit. The ciphertext is AES-128-GCM over the concatenation of a 12-byte embedded identifier (32-bit process ID + 64-bit command-type-handle comparison key) and the caller's payload; a random nonce is generated for each created ID, and the AES key is a random 16-byte value generated once per process by `RandomNumberGenerator` in the type's static constructor — it is explicitly not derived from the bot token. Because the identifier and payload travel inside authenticated ciphertext, routing targets and payload bytes cannot be forged or rewritten without the process key: any modified or fabricated ID fails tag verification.

Capacity: 100 characters encode at most 175 bytes (100 × 14 bits). Subtracting the 25 bytes of fixed wire overhead (12-byte nonce + 12-byte tag + 0xFF terminator) and the 12-byte embedded identifier leaves an approximately 138-byte payload budget — in formula terms `payload ≤ 175 − 37`, capped by the 100-character check the utility performs after encoding. An early >200-byte payload check protects the internal stack allocation first. Keep payloads small and binary: Base64-in-payload inflation wastes the budget, while raw MemoryPack keeps even a token-bearing context within it.

`Parse` never throws for an unparseable ID and never falls back to a plaintext interpretation: too-long/too-short IDs, invalid `Base16384CJK` characters, a missing valid terminator, GCM authentication failure (`CryptographicException`), an unresolvable type handle, and non-component command types all yield `ComponentInteractionInvalidReason.MalformedId`. A decryptable ID whose embedded process ID differs from the current process yields `ExpiredProcess`, so controls expire after a restart. `GetComponentPayload` throws only after `Parse` reports a reason. The `Parse` overload that outputs a `Type` additionally checks `SupportsComponents`; the dispatcher resolves the registered keyed singleton from the type key instead of dereferencing an arbitrary handle.

The dispatcher also enforces single-use IDs. `CommandResolveService.EnsureNonceNotUsed` records each nonce in `InteractionUsedNonces` and causes an exact-ID replay to fail with `ComponentInteractionInvalidReason.UsedNonce`. A nonce is consumed only when `Parse` has reported `None` (malformed and old-process IDs never consume a slot), but it is consumed even if command resolution fails afterward, so one issued ID can never dispatch twice. The nonce dictionary is process-local and grows with each created control.

Routing identifies a destination, not a user or resource. The encrypted envelope carries no user binding — no AAD ties it to a clicker — and this is an owner-accepted residual risk, not a recommendation to add it: the policy relies on commands replying ephemerally, or on public messages that are deliberately clickable by anyone. Commands must use the authenticated `interaction.User.Id` for identity and validate their own ownership/action/revision semantics, acknowledge or defer promptly, and keep mutable per-interaction state in locals or a command-owned service rather than on the singleton command. There is no automatic component account/TOS wrapper. Workflow-specific operations may still use their own timeout/cancellation sources; the dispatcher does not propagate a token itself, but the payload is opaque authenticated bytes, so commands that need one (such as `/transfer-to-china` carrying the China session token) transport it inside the encrypted payload.

## Hooks and lifecycle

`ICommandResolveService` exposes:

- `BeforeComponentInteractionExecutes`: `AsyncEventHandler<ComponentInteractionEventArgs>`.
- `OnComponentInteractionError`: `AsyncEventHandler<ComponentInteractionExceptionEventArgs>`.

Before-hook arguments expose `Interaction`, nullable `Command`, authoritative `IsValid` and `InvalidReason`, nullable `Payload`, and mutable `Canceled`. Hooks also receive invalid Framework-owned routes (reasons include `MalformedId`, `UsedNonce`, `ExpiredProcess`, `CommandNotFound`, and `CommandNotSupported`), so they must tolerate a null command. Invalid routes cannot dispatch regardless of `Canceled`. Before hooks run sequentially and stop after explicit cancellation; a hook exception is reported through `OnEventHandlerError` and later hooks continue under the normal cancellation rules.

Error-hook arguments expose `Exception`, `Interaction`, and nullable `Command`. Component command execution matches the older dispatchers: the command task is placed in `Program.RunningTasks` and passed to `Utils.RunWithTaskOnEnd`, whose `Action<Exception>` receives an asynchronous error-hook lambda. That lambda becomes `async void`, so task cleanup can occur before error hooks finish and exceptions escaping the lambda are not observed by the wrapper. This acknowledged limitation is deferred for a coherent refactor across every command family. Component socket subscriptions detach through `Program.BeforeMainExiting`; the resolver does not implement `IHostedService`, propagate a component cancellation token, or add a separate host-drain mechanism.

## Localized controls and replies

`BuilderUtility` adds localized overloads for:

- `ButtonBuilder.WithLabel`;
- `SelectMenuBuilder.WithPlaceholder`;
- `SelectMenuOptionBuilder.WithLabel` and `WithDescription`.

Pass an `IDiscordInteraction` to use its `UserLocale`, or a `Language` to preserve an explicit locale. Formatting uses `LocalizedString.GetFormatted`; unknown Discord locale codes safely select English US and then use the `LocalizedString` fallback chain. Native Discord.Net builders validate label/placeholder/description lengths. Keep routing IDs and select values language-independent.

`QuickReply` and `QuickReplyWithAttachments` select the edit operation:

- fresh `IComponentInteraction` (`HasResponded == false`): `UpdateAsync` acknowledges and edits the clicked message;
- acknowledged/deferred component: `ModifyOriginalResponseAsync` edits that interaction's original response;
- non-component interaction: the existing `ModifyOriginalResponseAsync` behavior remains.

`MessageUtility` is stateless: it has no weak-table, semaphore, attempt flag, or replacement acknowledgement gate. Every call independently checks `HasResponded`; callers must await and sequence the initial acknowledgement before making later helper edits. Sequential repeated calls edit rather than create automatic follow-ups, but concurrent calls are not serialized and can race. Coordination between separate clicks belongs to the command/workflow when needed and is not implemented by this helper. Use explicit Discord.Net response/follow-up methods for separate or ephemeral messages. The action-first localized overload supports message changes without rebinding existing params-format calls:

```csharp
await interaction.QuickReply(
	properties => properties.Components = controls,
	localizedMessage,
	formatArgument);
```

Explicit-locale overloads put `Language` before `LocalizedString` (and after the attachment array for localized attachment calls). Attachment helpers retain the `AttachFiles` permission check: rejected attachments are disposed, text fallback is sent, and requested component/embed modifications are still applied.

## Core and AdminHelper integration

Core responds ephemerally to invalid routes with `ComponentInteractionUnavailable`, and handles callback failures with `ComponentInteractionError` using an initial response or ephemeral follow-up as appropriate. It does not log route payloads. AdminHelper's shared status hook blocks all non-admin component interactions whenever status is not `Normal`, including maintenance, shutdown, and data updates; its slash and component subscriptions detach together. Component blacklist checks are intentionally not included.

Existing deployed localization data does not automatically merge generated defaults. The owner must add `ComponentInteractionUnavailable` and `ComponentInteractionError` through the normal localization deployment/update process. Core has safe English fallback text until those keys are present; do not reset or mutate live localization files merely to validate a build.
