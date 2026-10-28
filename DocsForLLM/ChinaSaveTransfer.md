# China save transfer implementation

This guide describes the current source implementation and reconciles the owner's review corrections on 2026-10-23. Direct source observations and owner-confirmed behavior are distinguished below. It is not runtime validation or deployment approval. Product policy and durable deferrals are recorded separately in [ADR 0003](ADR/0003-ChinaSaveTransfer.md).

## Surface and dependencies

- [`SaveArchiveProgram/TransferToChinaCommand.cs`](../SaveArchiveProgram/TransferToChinaCommand.cs) adds the global `/transfer-to-china` command to the existing `SaveArchiveProgram` plugin.
- The project references the private `PhigrosLibraryCSharp.Modification` package at version `1.1.0`. The public command calls its upload API directly; the package source and upload mechanics remain outside this repository and must not be copied into public documentation.
- That package's dependency metadata requires `PhigrosLibraryCSharp` `5.2.0` or later; Core's project still declares `5.1.0`. This is a dependency/deployment fact, not a claimed restore or build failure. No dependency resolution was executed during this review.
- Core's `AccountCommand.ListenQrCodeChange` (moved from the removed `LoginCommand`, ADR 0005) returns the acquired token without changing the bot binding. The ordinary `/account register qrcode` callback still performs the binding update after polling.
- Framework commands expose the protected `CreateComponentId(payload)` helper. The transfer command handles its own routed buttons through `HandleInteraction`.
- `SaveArchiveProgramPlugin.Load` still registers only the existing `SaveArchiveService`. There is no transfer session/service registration.
- `ArchiveProgramRunHelper` is a development launcher that stages this plugin before delegating to `CoreRunHelper`. It is not a production deployment procedure and must not be run for validation.

## Command and current flow

Default English syntax:

```text
/transfer-to-china use_archived_data:<true|false> [account_token:<China session token>]
```

The command inherits `CommandBase`, so the normal registered-user and TOS gates apply. The slash response is ephemeral through the command base default.

### Source eligibility and archive boundary

- [`ArchiveSaveCommand.cs`](../SaveArchiveProgram/ArchiveSaveCommand.cs) lines 30–34 now reject non-international bindings before consent or enqueueing. The owner confirmed that legacy archives are handled by manual cleanup; automatic per-save region classification is not the selected boundary for this implementation.
- Transfer lines 71–83 admit a user when their current binding is international **or** their archive directory exists. Archive mode additionally requires that directory. The earlier unconditional rejection of China-bound archive users is no longer present.
- The directory exception is not restricted to archive mode: a China-bound user with an archive directory currently also passes `use_archived_data:false`. That branch reads their current binding at lines 212–217, without an additional region check. This is the exact remaining live-mode behavior, not a reassertion of the previous archive-eligibility finding.
- This review did not inspect or clean real archives. Directory existence is the implemented admission check, not proof that manual legacy cleanup has been completed or that every referenced archive file is usable.

### Source

- `use_archived_data:false` reads the clicking user's current database binding when upload begins, fetches its current cloud-save list, and uses the first save result. The initial slash callback does not capture the source token or save object.
- `use_archived_data:true` uses `./ArchiveProgram/{DiscordUserId}`. It selects the `ArchivedInfo_*.json` file with the greatest timestamp encoded in its filename, then uses the first save result from that manifest's SaveInfo file and the corresponding archived ZIP.
- There is no source menu or pagination. The implementation means “current first live save” or “first save in the newest archive,” rather than a user-selected historical entry.
- Source selection and ZIP loading happen after the destination confirmation steps, immediately before the upload calls. No source account/save preview is shown.

### China destination authentication

- If `account_token` is supplied, the command treats it as a China token and fetches player information.
- Otherwise it shows a **Begin QR Code Login** button, requests a TapTap China QR code, and reuses Core's localized login-begin and login-timeout messages. QR polling stops 15 seconds before the provider's stated expiry.
- Authentication is kept separate from the existing bot binding. The command displays the destination nickname and creation time before showing a danger-styled **Proceed** button.
- The remaining transfer text and controls are currently plain English. No transfer-specific localization keys were added.
- The auth choice is the optional slash token versus the QR-start button; there is no auth select menu, modal, or create-account control.
- **Owner-confirmed QR behavior:** login requires an existing initialized China account and cannot create one. Source shows China QR acquisition and reuse of `AccountCommand.ListenQrCodeChange`; the former Core `LoginCommand.cs` (login now in `AccountCommand`) delegated authentication to the library. The earlier account-creation warning inferred from an optional API flag is withdrawn: that signature alone does not establish account-creation behavior. No private authentication implementation or live login was inspected to replace the owner's confirmation.

### Replacement, completion, and binding

On Proceed, the command clears controls, displays **Transferring...**, and fetches the destination save list. If the destination already has data and the payload's overwrite Boolean is false, it displays a second overwrite warning and another **Proceed** button carrying that Boolean as true. That click fetches the destination list again; no particular destination save object is retained from the earlier warning.

With no destination saves, the command uploads the source as a new save. With existing saves, the public command downloads the current first destination ZIP, uploads a copy of it, then uploads the source against the original first save object. This describes the command's intended backup/replacement sequence, not verified backend ordering or atomicity.

After the upload calls return without throwing, the command reports **Transfer complete!**, asks the user to check the destination, and displays the destination token in a Discord spoiler. It does **not** read back the result or change the bot binding. There is no in-command switch control: the completion text suggests a separate `/account register token` action. The full default-English China invocation is:

```text
/account register token token:<destination token> is_international:false
```

That separate command checks that it can fetch the China save and replaces the registered `UserData` using its own normal behavior; it does not compare the save with this transfer's source. It is not a transfer-specific verified-success switch and does not preserve all existing binding preferences. The absence of automatic read-back is a source observation, separate from the owner's accepted generic error-handling policy; it is not authorization to add another verification/binding workflow now.

**Owner-confirmed cancellation UX:** dismiss or ignore the ephemeral prompt, or leave Proceed unclicked. A dedicated Cancel button is not required. This abandons the pending user decision; dismissing a message does not stop a QR poll or upload callback that has already started. No cancellation service or extra control is part of this workflow.

## State and component behavior

`TransferToChinaCommand` does not retain mutable workflow state on its singleton command instance and does not register a transfer session service. A fresh MemoryPack `Context` is created in the slash callback and serialized into routed component payloads as **raw MemoryPack bytes** — no Base64 and no string delimiters are used. It currently carries:

- the next `ButtonOperation`, a byte enum (`QRCodeLogin = 1`, `ConfirmedAccount = 2`) that selects the branch in `HandleInteraction`;
- archive versus live source choice (`UseArchivedData`);
- the China account token (`AccountToken`);
- a Boolean recording whether the generic overwrite warning was confirmed (`ConfirmedOverride`).

The action choice travels in the payload's `NextOperation` field rather than as text action keys; there is intentionally no Cancel operation. The context carries no initiating user, message, fixed source/target identity, completion/consumed marker, or account-switch choice. It is small workflow state carried by the controls, not a retained singleton user session.

### What the token-bearing payload means

- `Context.AccountToken` is a serialized field. It initially receives the optional slash token, and `LoginDone` assigns the authenticated session token before building Proceed (lines 147–167).
- The command's private `CreateComponentId` sets `NextOperation`, calls `MemoryPackSerializer.Serialize(context)`, and passes those raw bytes into Framework routing (lines 61–65). The Framework envelope **encrypts** the identifier-and-payload plaintext with the per-process AES-128-GCM key before encoding (see [ComponentRouting.md](ComponentRouting.md)); the complete custom ID is ciphertext, and reading or modifying it without the process key fails authentication.
- `HandleInteraction` recovers the context through `component.GetComponentPayload()` followed by `MemoryPackSerializer.Deserialize<Context>` (lines 113–132). Deserialization happens only after the encrypted route authenticates and passes the dispatcher's single-use nonce check.
- The initial QR-start control has a null destination token. Proceed controls after either direct-token or QR authentication carry the acquired token, but only inside the encrypted payload. There is deliberately no per-user binding in the envelope (an owner-accepted residual risk under ADR 0004), and each issued control is single-use because the dispatcher rejects exact-ID replays. No real token or payload was decoded or printed during review, and no credential-handoff refactor is authorized here.

### Acknowledgement, button removal, and multiple clicks

`HandleInteraction` first checks the component type, replies **Please wait...** through awaiting `QuickReply(..., x => x.Components = null)` (line 116), then parses the payload (lines 118–120). A fresh, unacknowledged component makes this `QuickReply` use `UpdateAsync` (`MessageUtility.cs` lines 147–158), which both acknowledges the interaction and removes the button UI in one edit; later `QuickReply` calls therefore use `ModifyOriginalResponseAsync`. There is no missing-acknowledgement finding.

- **Proceed:** `Upload` begins with an awaited `QuickReply("Transferring...", x => x.Components = null)` at line 170, before fetching the destination at line 173. If an existing save needs the second warning, lines 175–189 deliberately add a new Proceed button afterward.
- **QR start:** the button-removing **Please wait...** reply at line 116 is applied before the QR request at line 122, so UI removal is immediate at entry on this branch. QR polling starts afterward, and the login-begin reply at line 124 reuses Core's localized text.
- Once the edit is applied, the old buttons are no longer available for normal new clicks. It does **not** revoke interactions already issued by the client, cancel their callbacks, or serialize them. The resolver starts/tracks each handler separately rather than awaiting one operation before dispatching another (`CommandResolveService.cs` lines 343–405).
- Each issued click carries its own random nonce, and the dispatcher rejects an exact-ID replay with `UsedNonce` before any command runs (`CommandResolveService.cs` lines 356–373). Double-clicking the same issued button therefore cannot run the handler twice; re-running the command creates fresh controls. Within one callback, `ConfirmedOverride` only records whether to skip the second overwrite warning; it is not additionally consumed by the dispatcher, and two separately issued buttons (from separate command runs) remain independent.
- There is no command-level ownership comparison in lines 113–132, no owner field in the payload, and source lookup uses the clicker's `arg.User.Id` at line 194. Normal ephemeral visibility remains the UI side of the boundary; the payloads are now encrypted but carry no per-user binding (an owner-accepted residual risk under ADR 0004). Button removal is neither an ownership check nor an atomic execution guard.

These are native helper/callback semantics, not a request to add a generic session store, persistence, locks, or timers. No ownership or atomic-guard code was added.

Framework routing makes controls process-local, so visible controls expire after a bot restart. `Upload` opens and disposes a database requester locally before reading source data; it does not retain a DbContext. QR data and polling are callback-local and awaited. No transfer timer, lock, retained per-user dictionary, `UserData.ShallowCopy`, or cached `SaveCache` mutation is used. The existing archiver's queue, consent dictionary, and processing loop are separate from transfer state.

The command-local design is substantially simpler than the historical session/service proposal. The complete routed ID must still fit Discord's 100-character limit; explaining its contents or click concurrency does not authorize reinstating the old scaffold.

## Accepted error policy and observable limits

**Owner-confirmed policy:** upload errors may propagate to the existing generic handlers. Apart from initial eligibility checks and the QR timeout reply, authentication, empty-save, archive-read, and upload exceptions use those handlers. Slash failures use the slash error path; component failures reach Core's `OnComponentInteractionError` (`PSLPlugin.cs` lines 315–340). After deferral its response is an ephemeral follow-up (lines 360–371). This is intentional, not an unresolved requirement for custom error states, recovery services, or enterprise retries.

- **Completion meaning:** lines 223–245 await the upload calls and then report completion. There is no automatic destination read-back/comparison. That remains a factual limitation separate from generic error routing; this review does not approve adding a verification workflow. ADR 0003's verified-success requirement for any transfer-owned binding switch remains distinct, and this command performs no such switch.
- **Resource selection:** lines 167 and 193–217 select the destination/source at action time. The payload does not pin those objects, so a newer archive or changed first save/binding can change the data used between prompts. This is current behavior, not an approved session/snapshot framework proposal.
- **Archive usability:** lines 196–210 assume a manifest, SaveInfo result, GameFile, and corresponding ZIP. Missing entries/files raise exceptions through the accepted generic handler. The archiver can retain a manifest after a failed ZIP download (`SaveArchiveService.cs` lines 131–165); the reader does not verify filename hashes.

## Deferred refactor item

The owner directed the reused QR localization/model naming mismatch to a **future refactor plan**, not a current fix. Transfer line 118 supplies `QRCodeDataModel`, which exposes `Url`/`EncodedUrl` in Core `AccountCommand.cs` (nested class, moved from `LoginCommand`); the checked-in `AccountRegisterQrCodeBegin` default (formerly `LoginBegin`) uses `BeginUrl`/`EncodedBeginUrl` in `LocalizationService.cs`. Existing deployed localization may differ. The durable deferral is in ADR 0003; detailed local planning is in gitignored `Notes/CommandDispatchRefactorPlan.md`. No template, model, key, or live localization change is authorized by recording this item.

**Separately deferred:** Core's existing before-command/error reporting includes raw slash-option values, including `account_token`. The owner explicitly deferred global token logging redaction. Do not treat this documentation review as permission to change it, and do not add new token/save logging.

## Deployment notes

- Restore and deployment must have authorized access to `PhigrosLibraryCSharp.Modification` `1.1.0` and must deploy its runtime assembly with the plugin's dependencies. The repository contains no NuGet source configuration for that private package.
- Preserve the working-directory-relative `ArchiveProgram` tree and grant the bot process the existing read/write access it needs. Do not inspect, publish, or copy real archives during validation.
- Routed controls do not survive a process restart; users must rerun the command.
- Live-source retrieval still depends on international cloud availability. Archived-source transfer depends on a complete usable archive.
- No transfer-specific localization keys were added. Reused keys follow Core's normal localization deployment process. The QR template/model naming item is owner-deferred; do not reset live localization or implement that refactor as part of documenting transfer.
- This review changed documentation only. No build, test, project/helper execution, migration, Discord request, QR request, or live transfer was performed.
