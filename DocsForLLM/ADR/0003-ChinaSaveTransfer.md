# ADR 0003: International-to-China save transfer

- **Status:** Accepted product policy. Current implementation and owner review clarifications are recorded; QR localization compatibility is deferred to a future refactor. This is not runtime validation.
- **Recorded:** 2026-10-23.
- **Implementation reviewed:** 2026-10-23.
- **Source:** Owner answers in the China-transfer planning discussion and subsequent implementation-review corrections on 2026-10-23.

Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md). This record does not authorize deployment, publishing private code, or live transfers.

## Context

[ADR 0001](0001-InternationalCloudSaveResponse.md) establishes one-way international-to-China transfer as part of the shutdown response. The owner selected transfer as the next planning focus ahead of self-service archive download because users generally lack the technical background to use downloaded saves themselves. Existing gradual-delivery priorities and the international cloud retrieval cutoff still apply.

The owner has a private package that implements the upload operations. Its source is not included in this repository; `SaveArchiveProgram` now references package version `1.1.0`. The previously recorded intentional anti-cheating boundary remains applicable.

## Decision

- Support **server archives and live international cloud saves** as transfer sources. The live source depends on the international cloud service remaining available; archived sources support the post-shutdown workflow.
- Require an already initialized China destination. Transfer must not create a destination account.
- Allow destination authentication either through a direct token slash option or a TapTap China QR control. **Modals remain out of scope.**
- If the China destination already has a cloud save, **replace it after user confirmation**.
- Show enough source and destination identity for an informed replacement decision. Cancellation uses dismissing/ignoring the ephemeral prompt or not clicking Proceed; a dedicated Cancel control is not required, per the owner's review correction.
- Make switching the bot's registered account to the China destination a **user-selectable option**, applied after the transfer succeeds and the destination save is verified. The default for this option has not been chosen.
- Keep the **transfer flow public**. Use the owner's **existing private upload package** for the upload operations. Current dependency wiring is described below; the private implementation must not be copied into the public flow.
- Login and link-token localization (now the `/account register` keys) may be reused; other transfer text may remain plain text. The exact arrangement of controls is an implementation choice within the requirements above.

### Identifying the region of archived saves

Owner-confirmed identifiers, supplied on 2026-10-23: inspect `results[index].gameFile` in the archived SaveInfo file for the selected save.

- A `key` beginning with **`kviehleldgxs`** identifies an international save.
- A `url` with domain **`rak3ffdi.tds1.tapfiles.cn`** identifies a China save.

These identifiers describe how existing archives can be classified without an explicit region field. They are owner-supplied format knowledge, not independently validated against live archives. The owner subsequently selected command-level international-only archive enrollment plus manual legacy-archive cleanup as the current boundary; this metadata knowledge does not require an automatic classifier in the transfer command.

## Owner review clarifications and deferral

Confirmed on 2026-10-23:

- `/archive-save` now rejects non-international bindings. Transfer admits an international binding or an existing user archive directory, and requires the directory for archive mode. Legacy archive cleanup remains manual and owner-managed; agents must not inspect or clean real archives as validation.
- The owner confirms that QR login requires an existing initialized China account and cannot create one. The earlier review inference about creation from a library flag is withdrawn; no private authentication algorithms or live checks are required to restate this owner-confirmed policy.
- Dismissing/ignoring an ephemeral prompt is the intended cancellation UX. This supersedes the earlier wording requiring an explicit cancellation action/button; it does not mean dismissing a message cancels an already-running callback.
- Upload exceptions may use the existing generic Core handlers. A transfer-specific error/recovery architecture is not required. This acceptance is separate from what the source actually verifies and does not authorize additional verification, retry, session, or binding workflows.
- The QR localization/model naming mismatch belongs in a **future refactor plan**, not a current implementation fix. `QRCodeDataModel` supplies `Url`/`EncodedUrl`, while the checked-in `AccountRegisterQrCodeBegin` default (formerly `LoginBegin`) uses `BeginUrl`/`EncodedBeginUrl`. Record future discussion without selecting or implementing a replacement now. Local detail is in gitignored `Notes/CommandDispatchRefactorPlan.md`; this tracked record preserves the durable deferral in a fresh clone.

## Consequences

- The planned first workflow has a whole-save replacement operation. Save merging is not part of the selected behavior.
- Replacement confirmation must identify the selected source and destination so the user understands what is being replaced.
- Destination authentication and the optional persistent bot-account change are distinct steps. Authenticating a destination alone must not perform the optional account switch.
- A completed transfer does not imply an unconditional account switch; honor the user's selected option.
- Public flow implementation must respect the private upload-package boundary. This decision does not authorize copying or publishing that package's implementation.
- This transfer scope is distinct from the editable local-score collection in [ADR 0002](0002-LocalScoreSystem.md). Current approved transfer sources are server archives and live international cloud saves.

## Current implementation facts

The current [`TransferToChinaCommand`](../../SaveArchiveProgram/TransferToChinaCommand.cs) uses required `use_archived_data` and optional `account_token` slash options, or a button-started China QR login. It uses the newest archive/first save or the current live first save, confirms the destination account, and adds a second warning when destination data exists. Its initial directory exception currently also admits live mode for a non-international binding when an archive directory exists. It calls the private package directly. Its four-field context (next `ButtonOperation`, source choice, `AccountToken`, overwrite confirmations Boolean) is carried as raw MemoryPack inside the encrypted component payload; it has no retained transfer session service or timer.

`UserData` now separates `IsInternational` and `IsLocal` over an `AccountMode` flag; the `IsInternational` setter is `[Obsolete]`. `UserData.SaveCache` throws `InvalidOperationException` when `Token` is null (local-only account). `TransferToChinaCommand` has no guard for that case, a known gap. The command does not automatically switch the bot binding. After uploader calls return, it displays the destination token and suggests a separate manual `/account register token` action (formerly `/link-token`, see [ADR 0005](0005-AccountCommand.md)); a China binding requires that command's `is_international:false` option. It performs no destination read-back comparison. Source/target identity is not fixed by its generic overwrite Boolean. Cancellation by dismissing/ignoring the prompt and generic error routing are intentional owner-confirmed behavior, not missing features. See [ChinaSaveTransfer.md](../ChinaSaveTransfer.md) for the complete current flow, native button-removal/concurrency semantics, token encoding explanation, dependencies, and observable limits.

## Open questions and implementation gaps

- Default presentation for the optional account-switch choice; the current implementation uses a later manual `/account register token` action instead of an in-command choice.
- Handling of multiple source and destination save objects beyond the current first-result behavior.
- Usability of incomplete archive references and association of the first source/target result between prompts, within the owner-managed archive boundary.
- Verification criteria for any future transfer-owned binding switch. No new read-back or retry workflow is authorized by this record's implementation review.
- User instructions for loading the transferred cloud save in a compatible China-side game build.

The earlier proposed workflow and source findings were removed from the local notes after implementation; this ADR and [ChinaSaveTransfer.md](../ChinaSaveTransfer.md) are the durable record.
