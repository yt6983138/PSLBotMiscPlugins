# ADR 0003: International-to-China save transfer

- **Status:** Accepted for source scope, archive-region identifiers, replacement behavior, account-binding choice, and public/private boundary; detailed implementation remains proposed.
- **Recorded:** 2026-10-23.
- **Source:** Owner answers in the China-transfer planning discussion on 2026-10-23.

Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md). This record does not authorize implementation, deployment, publishing private code, or live transfers.

## Context

[ADR 0001](0001-InternationalCloudSaveResponse.md) establishes one-way international-to-China transfer as part of the shutdown response. The owner selected transfer as the next planning focus ahead of self-service archive download because users generally lack the technical background to use downloaded saves themselves. Existing gradual-delivery priorities and the international cloud retrieval cutoff still apply.

The owner has a private package that implements the upload operations. It is not included anywhere in this repository. The previously recorded intentional anti-cheating boundary remains applicable.

## Decision

- Support **server archives and live international cloud saves** as transfer sources. The live source depends on the international cloud service remaining available; archived sources support the post-shutdown workflow.
- If the China destination already has a cloud save, **replace it after user confirmation**.
- Make switching the bot's registered account to the China destination a **user-selectable option**, applied after the transfer succeeds and the destination save is verified. The default for this option has not been chosen.
- Keep the **transfer flow public**. Use the owner's **existing private upload package** for the upload operations. The package API, adapter, dependency wiring, and deployment details remain to be established.
- **Modals are out of scope** for the transfer workflow. The exact arrangement of slash-command options, dropdowns, and buttons remains under discussion.

### Identifying the region of archived saves

Owner-confirmed identifiers, supplied on 2026-10-23: inspect `results[index].gameFile` in the archived SaveInfo file for the selected save.

- A `key` beginning with **`kviehleldgxs`** identifies an international save.
- A `url` with domain **`rak3ffdi.tds1.tapfiles.cn`** identifies a China save.

These identifiers resolve how existing archives can be classified without an explicit region field. They are owner-supplied format knowledge, not independently validated against live archives. Missing or contradictory metadata handling remains an implementation detail to resolve.

## Consequences

- The planned first workflow has a whole-save replacement operation. Save merging is not part of the selected behavior.
- Replacement confirmation must identify the selected source and destination so the user understands what is being replaced.
- Destination authentication and the optional persistent bot-account change are distinct steps. Authenticating a destination alone must not perform the optional account switch.
- A completed transfer does not imply an unconditional account switch; honor the user's selected option.
- Public flow implementation must respect the private upload-package boundary. This decision does not authorize copying or publishing that package's implementation.
- This transfer scope is distinct from the editable local-score collection in [ADR 0002](0002-LocalScoreSystem.md). Current approved transfer sources are server archives and live international cloud saves.

## Open questions

- Private package input/output API, supported replacement behavior, and adapter/dependency integration.
- Exact user interaction flow, source/save selection, and default for the account-switch option.
- China account prerequisites and handling of multiple cloud-save objects at the destination.
- Source/archive validation, including incomplete, unrecognized, or contradictory region metadata.
- Verification criteria, retry behavior after an uncertain upload result, and interaction lifetime.
- User instructions for loading the transferred cloud save in a compatible China-side game build.

A proposed workflow and static source findings may be available in gitignored `DocsForLLM/Notes/ChinaSaveTransferPlan.md`. They are not additional approved requirements.
