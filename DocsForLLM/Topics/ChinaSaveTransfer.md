# China save transfer implementation

This guide describes the current source implementation and reconciles the owner's review corrections on 2026-10-23. Direct source observations and owner-confirmed behavior are distinguished below. It is not runtime validation or deployment approval. Product policy and durable deferrals are recorded separately in [ADR 0003](../ADR/0003-ChinaSaveTransfer.md).

## Surface and dependencies

- [`SaveArchiveProgram/TransferToChinaCommand.cs`](../../SaveArchiveProgram/TransferToChinaCommand.cs) adds the global `/transfer-to-china` command to the existing `SaveArchiveProgram` plugin.
- The project references the private `PhigrosLibraryCSharp.Modification` package at version `1.1.0`. The public command calls its upload API directly; the package source and upload mechanics remain outside this repository and must not be copied into public documentation.
- That package's dependency metadata requires `PhigrosLibraryCSharp` `5.2.0` or later; Core's central package management declares `5.2.1`. This is a dependency/deployment fact, not a claimed restore or build failure. No dependency resolution was executed during this review.
- Core's `AccountCommand.ListenQrCodeChange` (moved from the removed `LoginCommand`, ADR 0005) returns the acquired token without changing the bot binding. The ordinary `/account register qrcode` callback still performs the binding update after polling.
- Framework commands expose the protected `CreateComponentId(payload)` helper. The transfer command handles its own routed buttons through `HandleInteraction`.
- `SaveArchiveProgramPlugin.Load` still registers only the existing `SaveArchiveService`. There is no transfer session/service registration.
- `ArchiveProgramRunHelper` is a development launcher that stages this plugin before delegating to `CoreRunHelper`. It is not a production deployment procedure and must not be run for validation.

## Command and current flow

Default English syntax:

```text
/transfer-to-china [account_token:<China session token>]
```

The command inherits `CommandBase` and overrides `MasterConstraints` to the registered-user and TOS constraints. The slash response is ephemeral through the command base default. Since `c8cb3c8` (a stopgap for the discontinued international cloud save service) the command is archive-only and the `/archive-save` command no longer exists; see the addendum in [ADR 0003](../ADR/0003-ChinaSaveTransfer.md).

### Source eligibility and archive boundary

- `RootCallback` admits a user only when `./ArchiveProgram/{DiscordUserId}` (`SaveArchiveService.ArchiveProgramDir`) exists; otherwise it replies that there is no archived save. There is no check of the user's current binding or region. The owner confirmed that legacy archives are handled by manual cleanup; automatic per-save region classification is not the selected boundary for this implementation.
- Nothing in `SaveArchiveProgram` currently creates new archives for users (no enrollment command); `SaveArchiveService` and its archive writer remain in the project. Only already-existing archive directories can be transferred.
- This review did not inspect or clean real archives. Directory existence is the implemented admission check, not proof that manual legacy cleanup has been completed or that every referenced archive file is usable.

### Source

- `Upload` reads `./ArchiveProgram/{clicking user's Discord ID}`. It selects the `ArchivedInfo_*.json` file with the greatest timestamp encoded in its filename, then uses the first save result from that manifest's SaveInfo file and the corresponding archived ZIP.
- The source is never the live international cloud save; the command does not read `UserData.SaveCache` or the user's binding token.
- There is no source menu or pagination. The implementation means “first save in the newest archive,” rather than a user-selected historical entry.
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
- the China account token (`AccountToken`);
- a Boolean recording whether the generic overwrite warning was confirmed (`ConfirmedOverride`).

The action choice travels in the payload's `NextOperation` field rather than as text action keys; there is intentionally no Cancel operation. The context carries no initiating user, message, fixed source/target identity, completion/consumed marker, or account-switch choice. In particular, source and target identity is not fixed by the `ConfirmedOverride` Boolean: the destination save list is fetched again on each Proceed and the source archive is chosen at upload time, so the user confirms an overwrite without a pinned save object (verified in `Upload`). It is small workflow state carried by the controls, not a retained singleton user session.

### What the token-bearing payload means

- `Context.AccountToken` is a serialized field. It initially receives the optional slash token, and `LoginDone` assigns the authenticated session token before building Proceed (`LoginDone`).
- The command's private `CreateComponentId` overload sets `NextOperation`, calls `MemoryPackSerializer.Serialize(context)`, and passes those raw bytes into Framework routing. The Framework envelope encrypts the payload, so the complete custom ID is ciphertext (see [ComponentRouting.md](ComponentRouting.md#command-and-route-api)).
- `HandleInteraction` recovers the context through `component.GetComponentPayload()` followed by `MemoryPackSerializer.Deserialize<Context>` (via `ParseComponentId`). Deserialization happens only after the route authenticates and passes the dispatcher's single-use check.
- The initial QR-start control has a null destination token. Proceed controls after either direct-token or QR authentication carry the acquired token, but only inside the encrypted payload. The envelope has no per-user binding and each issued control is single-use ([ComponentRouting.md](ComponentRouting.md#command-and-route-api)). No real token or payload was decoded or printed during review, and no credential-handoff refactor is authorized here.

### Acknowledgement, button removal, and multiple clicks

`HandleInteraction` first checks the component type, replies **Please wait...** through awaiting `QuickReply(..., x => x.Components = null)`, then parses the payload. A fresh, unacknowledged component makes this `QuickReply` use `UpdateAsync` (`MessageUtility`), which both acknowledges the interaction and removes the button UI in one edit; later `QuickReply` calls therefore use `ModifyOriginalResponseAsync`. There is no missing-acknowledgement finding.

- **Proceed:** `Upload` begins with an awaited `QuickReply("Transferring...", x => x.Components = null)` before fetching the destination save list. If an existing save needs the second warning, `Upload` deliberately adds a new Proceed button afterward and returns.
- **QR start:** the button-removing **Please wait...** reply in `HandleInteraction` is applied before the QR request, so UI removal is immediate at entry on this branch. QR polling starts afterward, and the login-begin reply reuses Core's localized text.
- Once the edit is applied, the old buttons are no longer available for normal new clicks. It does **not** revoke interactions already issued by the client, cancel their callbacks, or serialize them. The resolver starts/tracks each handler separately rather than awaiting one operation before dispatching another (`CommandResolveService`).
- Each issued click carries its own random nonce, and the dispatcher rejects an exact-ID replay with `UsedNonce` before any command runs (`CommandResolveService`). Double-clicking the same issued button therefore cannot run the handler twice; re-running the command creates fresh controls. Within one callback, `ConfirmedOverride` only records whether to skip the second overwrite warning; it is not additionally consumed by the dispatcher, and two separately issued buttons (from separate command runs) remain independent.
- There is no command-level ownership comparison in `HandleInteraction`, no owner field in the payload, and archive lookup in `Upload` uses the clicker's `arg.User.Id`. Normal ephemeral visibility remains the UI side of the boundary; the payloads are now encrypted but carry no per-user binding (an owner-accepted residual risk under ADR 0004). Button removal is neither an ownership check nor an atomic execution guard.

These are native helper/callback semantics, not a request to add a generic session store, persistence, locks, or timers. No ownership or atomic-guard code was added.

Framework routing makes controls process-local, so visible controls expire after a bot restart. `Upload` opens and disposes a database requester locally only to load the clicker's `UserData` (used for the archive directory); it does not retain a DbContext. QR data and polling are callback-local and awaited. No transfer timer, lock, retained per-user dictionary, `UserData.ShallowCopy`, or cached `SaveCache` mutation is used. The existing archiver's queue, consent dictionary, and processing loop are separate from transfer state.

The command-local design is substantially simpler than the historical session/service proposal. The complete routed ID must still fit Discord's 100-character limit; explaining its contents or click concurrency does not authorize reinstating the old scaffold.

## Accepted error policy and observable limits

**Owner-confirmed policy:** upload errors may propagate to the existing generic handlers. Apart from initial eligibility checks and the QR timeout reply, authentication, empty-save, archive-read, and upload exceptions use those handlers. Slash failures use the slash error path; component failures reach Core's `OnComponentInteractionError` (`PSLPlugin.CommandResolveService_OnComponentInteractionError`). After deferral its response is an ephemeral follow-up. This is intentional, not an unresolved requirement for custom error states, recovery services, or enterprise retries.

- **Completion meaning:** `Upload` awaits the upload calls and then reports completion. There is no automatic destination read-back/comparison. That remains a factual limitation separate from generic error routing; this review does not approve adding a verification workflow. ADR 0003's verified-success requirement for any transfer-owned binding switch remains distinct, and this command performs no such switch.
- **Resource selection:** `Upload` selects the destination and source at action time. The payload does not pin those objects, so a newer archive or changed first destination save can change the data used between prompts. This is current behavior, not an approved session/snapshot framework proposal.
- **Archive usability:** `Upload` assumes a manifest, SaveInfo result, GameFile, and corresponding ZIP. Missing entries/files, or an archive directory without a manifest, raise exceptions through the accepted generic handler. The archiver can retain a manifest after a failed ZIP download (`SaveArchiveService.Archive`); the reader does not verify filename hashes.

## Refactor items

The reused QR localization/model naming mismatch (`QRCodeDataModel` exposes `Url`/`EncodedUrl`, while the `AccountRegisterQrCodeBegin` default used `BeginUrl`/`EncodedBeginUrl`) is **fixed** by `yt6983138/PSLDiscordBot#63`: the default template now uses `{Url}`/`{EncodedUrl}` in `LocalizationService.cs`. The earlier deferral is recorded in ADR 0003.

**Separately deferred:** Core's existing before-command/error reporting includes raw slash-option values, including `account_token`. The owner explicitly deferred global token logging redaction. Do not treat this documentation review as permission to change it, and do not add new token/save logging.

## Deployment notes

- Restore and deployment must have authorized access to `PhigrosLibraryCSharp.Modification` `1.1.0` and must deploy its runtime assembly with the plugin's dependencies. The repository contains no NuGet source configuration for that private package.
- Preserve the working-directory-relative `ArchiveProgram` tree and grant the bot process the existing read/write access it needs. Do not inspect, publish, or copy real archives during validation.
- Routed controls do not survive a process restart; users must rerun the command.
- Transfer depends only on a complete usable local archive; it does not call the international cloud service.
- No transfer-specific localization keys were added. Reused keys follow Core's normal localization deployment process. The QR template/model naming item is owner-deferred; do not reset live localization or implement that refactor as part of documenting transfer.
- This review changed documentation only. No build, test, project/helper execution, migration, Discord request, QR request, or live transfer was performed.
