# ADR 0004: Command-owned Discord component routing

- **Status:** Accepted
- **Tracking:** none
- **Frozen:** 2026-11-15
- **Recorded:** 2026-10-23.
- **Source:** Owner's component-infrastructure planning request, answers, and implementation correction on 2026-10-23.

Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md). This is a planning decision record, not authorization to implement, build, deploy, or perform live checks. The implemented API is documented in [ComponentRouting.md](../ComponentRouting.md).

## Context

[ADR 0003](0003-ChinaSaveTransfer.md) motivates a multi-step save-selection and replacement-confirmation flow. The required infrastructure belongs in the reusable command framework, with the transfer command as an example consumer. Existing commands are keyed singletons; each component interaction needs its own acknowledgement.

Discord does not verify custom IDs: any client can read them, and a user can attach or modify ID bytes on a message. A plaintext routing ID would therefore let clients observe payloads (disqualifying once the transfer flow needs to carry a China session token in the routed payload) and forge routing targets.

## Decision

- Design shared routing that returns button and dropdown interactions to the command that created them, extending existing abstractions and helpers. Include consistent localization, acknowledgement, authorization, and error handling.
- **Modals are out of scope.**
- **Support slash commands first.** User-context and message-context command support is not required in the first version. Their future integration remains a design consideration.
- **Route directly to the owning command.** Add a command-level interaction handler receiving the raw Discord interaction. Commands dispatch their own actions; a Framework action-to-method registry is not required. The handler's signature is superseded on one point by [ADR 0013](0013-CommandCallbackAndPersistence.md).
- **Keep the central wrapper in `CommandResolveService` thin.** It is the entry point for routing and hooks, then forwards to the command base. It must not impose a Core account/TOS/automatic-deferral template before calling the command. Commands handle acknowledgement and workflow-specific behavior.
- **Use a cancellable asynchronous before-interaction hook, analogous to the existing slash hook.** Await subscribed handlers sequentially. A rejecting hook is responsible for acknowledging the interaction and marking it canceled/handled; stop invoking subsequent hooks and do not forward to the command. If allowed, forward the interaction without automatic acknowledgement.
- **Preserve the existing slash before-hook exception policy in the first version.** Report a hook exception through `OnEventHandlerError`, then continue under the ordinary cancellation rules. An exception alone must not automatically cancel dispatch. The owner declined the proposed stop-on-hook-error behavior in favor of consistency; reconsider exception policy across command families in a future refactor plan. This deferral does not approve a future behavior change.
- **Use the hook's mutable `Canceled` flag for component admission; do not propagate a component cancellation token through event arguments or the raw command handler.** `Canceled` stops later before hooks and command dispatch for that interaction. Commands may still create and pass their own operation-specific timeout/cancellation tokens where their workflow needs them.
- **Do not add an `IHostedService` lifecycle to the command resolver.** Component command tasks and component socket subscriptions follow the task and shutdown tracking convention; [ADR 0012](0012-PluginLifecycleAndHosting.md) realizes this by replacing the earlier `Program.RunningTasks` / `RunWithTaskOnEnd` tracking convention and defines that lifecycle. A general dispatcher/host-stop cancellation or draining redesign is deferred to future refactor work.
- **Match the legacy slash/user/message dispatch and error pattern.** Component execution honors `RunOnDifferentThread` and passes an asynchronous component-error callback through the same task-tracking mechanism as the other command families. Do not change only the component path; reconsider the callback contract and tracking coherently across all command families in a future refactor (done for tracking in ADR 0012).
- **Expose routing validity and the invalidity reason in component event arguments.** Hooks must be able to inspect invalid framework-owned interactions, including removed/unregistered-command and malformed routes, even when no command can be resolved. Invalid routing must never reach a command, regardless of whether a hook responds or cancels.
- **Core owns the unavailable-control reply.** A Core hook handles invalid-route notifications with a localized ephemeral response asking the user to run the command again. Framework exposes validation information, logs the invalid route, and aborts command dispatch; it does not supply that Discord response itself. A Framework-only installation therefore logs/aborts unless a consuming plugin supplies a responding hook. Command-owned workflow expiry remains the consuming command/service's concern.
- **Status-hook integration is required as part of the component rollout, using the same policy as slash commands.** `AdminHelper`'s `StatusService` subscribes to the component before-hook. Block users other than the configured admin whenever the status is not normal, covering `UnderMaintenance`, `ShuttingDown`, and `UpdatingData`; preserve the configured-admin exemption. This applies to clicks on messages created before the status changed. Existing maintenance/shutdown/data-update entry points continue controlling the shared status.
- **Leave `AdminHelper`'s blacklist service as-is.** Component blacklist integration and changes to its existing slash-expression context are outside this rollout. This is not a commitment to a later blacklist migration.
- **Assume TOS consent when the component is issued.** Do not add a central TOS recheck for every component interaction. This decision concerns component execution; it does not remove existing slash-command TOS checks. Ownership, resource access, and other command-specific authorization remain command responsibilities.
- **Route on the command's type, protected by an encrypted, authenticated envelope.** The command type's runtime handle is the process-local routing identity. It is carried, together with the caller's payload, inside authenticated encryption under a key generated once per process, so routing targets cannot be forged and payloads cannot be read or modified by clients. Deriving the key from the bot token was considered and rejected; persisting or deriving the key across restarts remains rejected. Because the key is per-process, controls from an earlier process fail verification and are indistinguishable from tampered ones (see Consequences).
- **Make each issued control single-use.** The dispatcher records each consumed nonce and rejects an exact-ID replay; malformed IDs do not consume slots. Re-running the command issues a fresh ID.
- **Keep payloads small binary data.** The 100-character custom-ID limit bounds the payload; commands must use compact binary payloads, not inflated text encodings.
- **Accept the residual risk that an ID is not bound to a specific clicking user.** There is no per-user binding. Commands use the authenticated `interaction.User.Id` for identity, rely on ephemeral replies, and treat public messages as intentionally clickable by anyone. Proposals for session stores or user-binding were not adopted.
- **Commands own workflow state.** Small state may be encoded in custom IDs/option values; other state and concurrency/duplicate-operation coordination can live in command-owned services. A mandatory Framework UI-session service is not part of the selected architecture.
- **Use thin extensions over Discord's existing component builders.** Reuse the Discord.Net component and select-menu builders, with separate routing-ID/payload helpers and localized label/placeholder/description helpers. Reuse existing `LocalizedString` formatting; custom IDs and option values remain language-independent.
- **Default localized rendering to the current interaction's `UserLocale`, with an explicit locale override available.** A command that wants to preserve the original message's language can retain and supply that locale; the Framework does not require stored message-language state. Shared messages may change language when another user updates them using the default.
- **QuickReply should conveniently select the operation, with editing as the default for component interactions.** On a component with `HasResponded == false`, acknowledge through `UpdateAsync` and edit the message containing the component; otherwise use `ModifyOriginalResponseAsync`. Existing deferred slash-command calls continue editing their original response. Sequential repeated QuickReply calls are edits, not automatic follow-ups. The owner explicitly confirmed that creating separate replies was not the intention of this helper. This supersedes the assistant's unaccepted edit-only/no-automatic-acknowledgement proposal.
- A command calling QuickReply is choosing acknowledgement through a helper; this does not introduce automatic acknowledgement in the dispatcher. Long-running component handlers still need to acknowledge/defer before lengthy work.
- **Keep QuickReply stateless.** It has no weak-table, semaphore, attempt flag, or replacement per-interaction gate. The caller must await and sequence acknowledgement; concurrent helper calls are not serialized and do not receive an exactly-once guarantee. Any coordination between separate clicks belongs to the consuming command/workflow and is not implemented as part of this rollout.
- **Routed controls expire across process restarts**, including controls whose workflow payload is self-contained. This expands the earlier decision permitting in-memory UI sessions to expire on restart. Framework-managed sessions and restart-surviving stateless routes had only been proposals and were never accepted requirements.
- Component expiration does not authorize replaying external operations or treating an uncertain/completed upload as unperformed. Business-operation recovery remains a separate concern.

## Rejected alternatives

- A mandatory Framework UI-session service or restart-surviving stateless routes (never accepted).
- A Framework action-to-method registry (commands dispatch their own actions).
- A central per-click account/TOS/automatic-deferral wrapper in the resolver.
- Propagating a component cancellation token through event arguments or the raw command handler.
- Stop-on-hook-error for the component hook, in favor of consistency with slash hooks.
- Deriving the envelope key from the bot token, or persisting it across restarts.
- Binding an ID to a specific user (per-user authenticated data) or a session store to achieve it.
- Edit-only QuickReply without automatic acknowledgement, and a stateful QuickReply gate.
- An `IHostedService` lifecycle for the command resolver.
- Component blacklist integration in this rollout.
- A process-start-time identity and the version-1 plaintext envelope (packed process ID, nonce, and type key), replaced by the encrypted, authenticated envelope because clients could read payloads and forge routing targets.

## Consequences

- Persistent UI-session storage and restoration are not required for the first version.
- Per-user session state must not be stored directly on singleton command instances.
- Old visible controls are invalid after restart. Framework must expose that outcome to hooks before ending dispatch; Core provides the user-facing unavailable response. Hooks and logs cannot distinguish a stale control from a tampered one; both appear as malformed routes.
- Routing identity need not survive a deployment or a CLR type rename, because all old-process controls expire. A stable public command-name registry is not required. Any future design that keeps the key across restarts would also need a stable type identity.
- Routing identity identifies a destination; it does not establish the clicking user's authorization.
- Existing helper families should support command-owned acknowledgement/localization without requiring a generic session or custom interaction-context object.
- The agreed component hook short-circuits on cancellation. Current slash dispatch checks cancellation after invoking all handlers; this decision does not authorize changing existing slash-hook behavior.
- Adding a component before-hook without connecting AdminHelper's status gate is incomplete delivery of this infrastructure. Subscription lifetime and matching unsubscription must be included in the integration.
- Event arguments cannot require a successfully resolved command for invalid-route notifications. Routing validity is separate from hook cancellation and command-specific authorization.
- Component command-task tracking follows the shared lifecycle convention (see ADR 0012). This scope does not add cooperative cancellation or a separate async host-drain mechanism for component work.
- The nonce record is process-local and grows with each issued control; single-use IDs mean a control cannot be reused after its first click.
- Payload size is limited by the custom-ID length; token-bearing contexts must fit in compact binary form.
- Core and AdminHelper changes are required alongside Framework: Core registers the invalid-route response hook and its localization keys; AdminHelper connects the status gate. Existing command callbacks and helper call sites remain compatible, and blacklist code is unchanged.
- Realized by the account delete-confirm flow, which re-reads the user record and TOS agreement at click time rather than trusting issue-time state, and by the local import/score-select flow: the import Proceed step takes its owner-bound pending entry atomically and its recheck does not re-verify local mode (see [ADR 0002](0002-LocalScoreSystem.md)), while score-select re-reads the local collection at selection time. Pending local entries expire on a fixed timer and are process-local.

## Open questions

None. No owner-facing architecture or rollout decisions remain open. Transfer-specific workflow decisions remain under ADR 0003 and command-level planning. Cross-family reconsideration of the hook exception policy and the error-callback/shutdown-lifecycle contract is deferred to future refactor planning, not an open question of this ADR.

## Revisions

- 2026-11-15: addenda of 2026-10-24, 2026-10-31 and 2026-11-06 and the undated LocalCommand implementation addendum folded into the body; pre-fold text at `a66bede`.
