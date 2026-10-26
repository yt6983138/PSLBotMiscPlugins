# ADR 0004: Command-owned Discord component routing

- **Status:** Accepted. Architecture and rollout scope are settled; exact API and lifecycle mechanics are implementation details within these decisions.
- **Recorded:** 2026-10-23.
- **Source:** Owner's component-infrastructure planning request, answers, and implementation correction on 2026-10-23.

Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md). This is a planning decision record, not authorization to implement, build, deploy, or perform live checks.

## Context

[ADR 0003](0003-ChinaSaveTransfer.md) motivates a multi-step save-selection and replacement-confirmation flow. The required infrastructure belongs in the reusable command framework, with the transfer command as an example consumer. Existing commands are keyed singletons; each component interaction needs its own acknowledgement.

## Accepted decisions

- Design shared routing that returns button and dropdown interactions to the command that created them, extending existing abstractions and helpers. Include consistent localization, acknowledgement, authorization, and error handling.
- **Modals are out of scope.**
- **Support slash commands first.** User-context and message-context command support is not required in the first version. Their future integration remains a design consideration.
- **Route directly to the owning command.** Add a command-level interaction handler receiving the raw Discord interaction. The owner's proposed shape is `HandleInteraction(SocketInteraction ...)`; exact signature and optional parameters remain to be finalized. Commands dispatch their own actions; a Framework action-to-method registry is not required.
- **Keep the central wrapper in `CommandResolveService` thin.** It is the entry point for routing and hooks, then forwards to the command base. It must not impose a Core account/TOS/automatic-deferral template before calling the command. Commands handle acknowledgement and workflow-specific behavior.
- **Use a cancellable asynchronous before-interaction hook, analogous to the existing slash hook.** Await subscribed handlers sequentially. A rejecting hook is responsible for acknowledging the interaction and marking it canceled/handled; stop invoking subsequent hooks and do not forward to the command. If allowed, forward the interaction without automatic acknowledgement. Exact event/argument names remain to be finalized.
- **Preserve the existing slash before-hook exception policy in the first version.** Report a hook exception through `OnEventHandlerError`, then continue under the ordinary cancellation rules. An exception alone must not automatically cancel dispatch. The owner declined the proposed stop-on-hook-error behavior in favor of consistency; reconsider exception policy across command families in a future refactor plan. This deferral does not approve a future behavior change.
- **Use the hook's mutable `Canceled` flag for component admission; do not propagate a component cancellation token through event arguments or the raw command handler.** `Canceled` stops later before hooks and command dispatch for that interaction. Commands may still create and pass their own operation-specific timeout/cancellation tokens where their workflow needs them.
- **Use the existing task and shutdown conventions for this rollout; do not add an `IHostedService` lifecycle to the command resolver.** Component command tasks remain in `Program.RunningTasks`, which the existing AdminHelper soft-shutdown paths already wait. New component socket subscriptions detach through the existing `Program.BeforeMainExiting` lifecycle. A general dispatcher/host-stop cancellation or draining redesign is deferred to future refactor work.
- **Match the legacy slash/user/message dispatch and error pattern.** Component execution honors `RunOnDifferentThread`, uses `Program.RunningTasks.AddOrUpdate`, and passes an asynchronous component-error lambda to the `Action<Exception>` callback of `Utils.RunWithTaskOnEnd`. The owner accepts the resulting `async void` limitation for consistency: cleanup can remove the command task before error handlers finish, and exceptions escaping that asynchronous callback are not observed by the wrapper. Do not fix only the component path; reconsider the callback contract and tracking coherently across all command families in a future refactor.
- **Expose routing validity and the invalidity reason in component event arguments.** Hooks must be able to inspect invalid framework-owned interactions, including old-process, removed/unregistered-command, and malformed routes, even when no command can be resolved. Exact property/enum names are implementation details; `IsValid` and an invalid-reason property describe the intended contract. Invalid routing must never reach a command, regardless of whether a hook responds or cancels.
- **Core owns the unavailable-control reply.** A Core hook handles invalid-route notifications with a localized ephemeral response asking the user to run the command again. Framework exposes validation information, logs the invalid route, and aborts command dispatch; it does not supply that Discord response itself. A Framework-only installation therefore logs/aborts unless a consuming plugin supplies a responding hook. Command-owned workflow expiry remains the consuming command/service's concern.
- **Status-hook integration is required as part of the component rollout, using the same policy as slash commands.** Extend `AdminHelper/Services/StatusService.cs` to subscribe to the component before-hook. Block users other than the configured admin whenever `CurrentStatus != Status.Normal`, covering `UnderMaintenance`, `ShuttingDown`, and `UpdatingData`; preserve the configured-admin exemption. This applies to clicks on messages created before the status changed. Existing maintenance/shutdown/data-update entry points continue controlling the shared status.
- **Leave `AdminHelper/Services/BlackListService.cs` as-is.** Component blacklist integration and changes to its existing slash-expression context are outside this rollout. This is not a commitment to a later blacklist migration.
- **Assume TOS consent when the component is issued.** Do not add a central TOS recheck for every component interaction. This decision concerns component execution; it does not remove existing slash-command TOS checks. Ownership, resource access, and other command-specific authorization remain command responsibilities.
- **Use command `Type.TypeHandle` as process-local routing identity, paired with an identifier for the process instance.** The version-1 implementation initially Base64-encoded a packed 32-bit process ID, 32-bit random nonce initialized once for the process, and 64-bit type-handle comparison key before the opaque payload; this replaced the earlier process-start-time suggestion. The envelope format was later redesigned as described in the 2026-10-24 addendum below. The accepted process-isolation policy is unchanged: old-process IDs must not resolve a type in the new process.
- **Commands own workflow state.** Small state may be encoded in custom IDs/option values; other state and concurrency/duplicate-operation coordination can live in command-owned services. A mandatory Framework UI-session service is not part of the selected architecture.
- **Use thin extensions over Discord's existing component builders.** Reuse `ComponentBuilder`, `ButtonBuilder`, `SelectMenuBuilder`, and `SelectMenuOptionBuilder`, with separate routing-ID/payload helpers and localized label/placeholder/description helpers. Reuse existing `LocalizedString` formatting; custom IDs and option values remain language-independent. Exact helper signatures remain open.
- **Default localized rendering to the current interaction's `UserLocale`, with an explicit locale override available.** A command that wants to preserve the original message's language can retain and supply that locale; the Framework does not require stored message-language state. Shared messages may change language when another user updates them using the default.
- **QuickReply should conveniently select the operation, with editing as the default for component interactions.** On a component with `HasResponded == false`, acknowledge through `UpdateAsync` and edit the message containing the component; otherwise use `ModifyOriginalResponseAsync`. Existing deferred slash-command calls continue editing their original response. Sequential repeated QuickReply calls are edits, not automatic follow-ups. The owner explicitly confirmed that creating separate replies was not the intention of this helper. This supersedes the assistant's unaccepted edit-only/no-automatic-acknowledgement proposal.
- A command calling QuickReply is choosing acknowledgement through a helper; this does not introduce automatic acknowledgement in the dispatcher. Long-running component handlers still need to acknowledge/defer before lengthy work.
- **Keep QuickReply stateless.** It has no weak-table, semaphore, attempt flag, or replacement per-interaction gate. The caller must await and sequence acknowledgement; concurrent helper calls are not serialized and do not receive an exactly-once guarantee. Any coordination between separate clicks belongs to the consuming command/workflow and is not implemented as part of this rollout.
- **Routed controls expire across process restarts**, including controls whose workflow payload is self-contained. This expands the earlier decision permitting in-memory UI sessions to expire on restart. Framework-managed sessions and restart-surviving stateless routes had only been proposals and were never accepted requirements.
- Component expiration does not authorize replaying external operations or treating an uncertain/completed upload as unperformed. Business-operation recovery remains a separate concern.

## Consequences

- Persistent UI-session storage and restoration are not required for the first version.
- Per-user session state must not be stored directly on singleton command instances.
- Old visible controls are invalid after restart. Framework must expose that outcome to hooks before ending dispatch; Core provides the user-facing unavailable response.
- Routing identity need not survive a deployment or a CLR type rename, because all old-process controls expire. A stable public command-name registry is not required.
- Routing identity and process-instance matching identify a destination; they do not establish the clicking user's authorization.
- Existing helper families should support command-owned acknowledgement/localization without requiring a generic session or custom interaction-context object.
- The agreed component hook short-circuits on cancellation. Current slash dispatch checks cancellation after invoking all handlers; this decision does not authorize changing existing slash-hook behavior.
- Adding a component before-hook without connecting AdminHelper's status gate is incomplete delivery of this infrastructure. Subscription lifetime and matching unsubscription must be included in the integration.
- Event arguments cannot require a successfully resolved command for invalid-route notifications. Routing validity is separate from hook cancellation and command-specific authorization.
- Component command-task tracking follows the existing `Program.RunningTasks` convention, but the legacy `Action<Exception>` callback means asynchronous error-hook completion is not reliably included in that tracked lifetime. This scope does not add cooperative cancellation or a separate async host-drain mechanism for component work.

## Addendum (2026-10-24): encrypted envelope redesign

The owner reworked the routing envelope after the accepted plan. This addendum records the implemented redesign without reopening or re-deciding the items above; the ADR status remains Accepted.

- **Problem.** Discord does not verify custom IDs: any client can read them, and a user can attach or modify ID bytes on a message. The version-1 plaintext envelope therefore allowed clients to observe payloads — disqualifying once [`/transfer-to-china`](../ChinaSaveTransfer.md) needed to carry a China session token inside the routed payload — and to forge routing targets arbitrarily.
- **Replaced envelope.** The implemented wire format is `{nonce:12}{tag:12}{GCM ciphertext}{0xFF}`, `Base16384CJK`-encoded at 14 bits per CJK character. The ciphertext is AES-128-GCM over a packed 12-byte identifier (32-bit process ID, 64-bit type-handle key) followed by the caller payload, so the identifier now travels inside authenticated plaintext and routing targets are no longer forgeable: modified or fabricated IDs fail tag verification.
- **Per-process key.** The 16-byte AES-128-GCM key is generated once per process by `RandomNumberGenerator` in the utilities' static constructor. Deriving the key from the bot token was explicitly considered and **rejected**. IDs remain invalid after a process restart, matching the accepted expiry policy above.
- **Replay protection.** The dispatcher records each nonce in `CommandResolveService.InteractionUsedNonces` via `EnsureNonceNotUsed` and rejects an exact-ID replay with `ComponentInteractionInvalidReason.UsedNonce`. A nonce is consumed when `Parse` otherwise succeeds; malformed and old-process IDs do not consume slots. This makes one issued control single-use; re-running the command issues a fresh ID.
- **Capacity.** The 100-character custom-ID limit bounds the payload to approximately 138 bytes (175 encoded bytes minus 37 bytes of fixed envelope overhead and embedded identifier; 14 bits per CJK character). Payloads must stay small binary data (raw MemoryPack), not Base64-inflated strings.
- **Accepted residual risks.** Nothing in the envelope binds an ID to a specific clicking user; there is no per-user AAD binding. The accepted policy is that commands use the authenticated `interaction.User.Id` for identity, rely on ephemeral replies, and treat public messages as intentionally clickable by anyone. This residual risk is recorded as accepted; proposals for session stores/user-binding AAD were not adopted.

## Current implementation addendum: LocalCommand payload routing

- `LocalCommand` components route on the first payload byte: `0x01` score-select menu (pending `LocalWorkflowStore<LocalScoreDraft>` entry), `0x02` import Proceed (pending `StagedLocalImport`). `LogoutCommand` uses `0x42` for its confirm button.
- Owner-bound component-level state recheck: `LogoutCommand.HandleInteraction` re-reads the user record, TOS agreement, and local-data presence before deleting. `LocalCommand` Proceed takes its pending entry owner-bound and atomically, then commits the prepared snapshot. Its recheck is registration only and does not re-verify local mode (see ADR 0002). Score-select re-reads the local collection at selection time.
- Pending local entries expire after a fixed 15 minutes and are process-local.

## Planning status

No owner-facing architecture or rollout decisions remain open for this component-infrastructure plan. Transfer-specific workflow decisions remain under ADR 0003 and command-level planning. Implementation was separately authorized; this record does not by itself authorize further code changes, deployment, or execution.

## Implementation details within the accepted design

These are implementation choices, not permission to change the policies above.

- The raw handler is `HandleInteraction(SocketInteraction arg, object executer)`, with a compatible virtual default for existing commands. Hook arguments expose routing validity/reason and an optional resolved command. A propagated cancellation-token parameter is explicitly excluded.
- Preserve the packed process-ID/type-key routing identity, registered-command lookup, opaque payload extraction, and Discord custom-ID validation; the envelope itself follows the encrypted format recorded in the addendum below.
- Optional reusable ownership/expiry/message-binding and Core access helpers. Workflow state, stale revisions, concurrency, completion, and duplicate-confirmation policy belong to the consuming command/service.
- Registration/unsubscription, legacy `Program.RunningTasks` / `RunWithTaskOnEnd` integration, and component command-error hooks/reporting. Preserve the accepted before-hook exception policy; the acknowledged asynchronous error-callback limitation and broader cross-family dispatcher/shutdown-lifecycle refactors are deferred.
- QuickReply/localized-modification/attachment overloads preserve existing deferred slash-call behavior. The helper's `HasResponded` branch is stateless; callers sequence acknowledgement and use explicit APIs for unsupported/mixed response modes rather than relying on automatic follow-ups or a helper gate.
- Localized helper/locale-override signatures, fallback handling, dynamic-label formatting/overflow, and compatible overload binding.

## Implementation work areas

- **Framework:** existing command resolver/interface, command base, component event arguments, routing-ID/payload helpers, BuilderUtility, and MessageUtility; use the existing keyed command instances and task lifecycle.
- **Core:** register the invalid-route response hook and provide its localization keys/defaults through the existing localization system. Core must not turn this into a mandatory per-click account/TOS wrapper.
- **AdminHelper:** connect StatusService to the component before-hook and matching cleanup, using the confirmed status/admin policy.
- **Compatibility:** preserve existing command callbacks and helper call sites, retain the current hook-exception policy, and leave blacklist code unchanged.

Working proposals and source findings are in gitignored `DocsForLLM/Notes/ComponentRoutingDesign.md`; they are not additional accepted decisions.
