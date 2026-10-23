# Command-owned component routing

This is the implemented API guide for the button/select infrastructure accepted in [ADR 0004](ADR/0004-CommandComponentRouting.md). Modals and a transfer command are not part of this implementation. The compile-only example is [`PSLDiscordBot.Core/Command/Global/Template/ComponentCommand.cs`](../PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Template/ComponentCommand.cs); it deliberately has no active `[AddToGlobal]` attribute.

## Command and route API

Discoverable slash commands are keyed singletons. A command that owns components overrides:

```csharp
public override Task HandleInteraction(
	SocketInteraction arg,
	object executer)
```

Create a button/select custom ID with `this.CreateComponentId(payload)`. The complete ID, including the Framework envelope, must fit Discord's 100-character custom-ID limit; the helper validates this and never trims the payload. `component.GetComponentPayload()` returns the opaque payload with embedded delimiters preserved.

`CreateComponentId` emits a version-1 envelope shaped as `1:{base64 identifier}:{payload}`. The 16-byte identifier packs a 32-bit process ID, a 32-bit random nonce initialized once for the process, and a 64-bit command-type handle comparison key. The resolver checks the process ID and nonce first, treats the type value only as an opaque comparison key, scans the already registered command types, and resolves the existing keyed singleton. It never reconstructs or dereferences an arbitrary handle. The nonce is process-isolation data, not authentication. Controls expire after restart; malformed, old-process, removed-command, and unsupported-command routes never dispatch.

Routing identifies a destination, not a user or resource. The callback must validate ownership/action/revision data, acknowledge or defer promptly, and keep mutable per-interaction state in locals or a command-owned service rather than on the singleton command. There is no automatic component account/TOS wrapper. Workflow-specific operations may still use their own timeout/cancellation sources; no token is propagated by the component dispatcher.

## Hooks and lifecycle

`ICommandResolveService` exposes:

- `BeforeComponentInteractionExecutes`: `AsyncEventHandler<ComponentInteractionEventArgs>`.
- `OnComponentInteractionError`: `AsyncEventHandler<ComponentInteractionExceptionEventArgs>`.

Before-hook arguments expose `Interaction`, nullable `Command`, authoritative `IsValid` and `InvalidReason`, nullable `Payload`, and mutable `Canceled`. Hooks also receive invalid Framework-owned routes, so they must tolerate a null command. Invalid routes cannot dispatch regardless of `Canceled`. Before hooks run sequentially and stop after explicit cancellation; a hook exception is reported through `OnEventHandlerError` and later hooks continue under the normal cancellation rules.

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
