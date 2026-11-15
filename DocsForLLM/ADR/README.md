# Architecture decision records

ADRs record durable, owner-confirmed decisions. The index is in [../README.md](../README.md#decision-records). Work tracking lives on the owner's GitHub project board; see [GitHub access](../../AGENTS.md#github-access) for agent access to it. An ADR and the board do not replace each other.

## Contents of an ADR

An ADR keeps:

- context;
- the decision;
- rejected alternatives;
- consequences;
- open questions.

Implementation detail (line numbers, signatures, byte layouts, helper names) does not belong in an ADR. It goes to plans (disposable) or to topic guides in `DocsForLLM/` (current behaviour). Parts to be settled during implementation are listed as open questions when the ADR is accepted.

Accepting an ADR is not implementation or operational authorization. ADRs and the index do not record implementation progress (no "Implemented", "NOT TESTED" or "deferred until..." in `Status:` lines or in the index); unresolved questions stay in the ADR's open-questions section.

## Header lines

- `Status:` is one of `Proposed`, `Accepted`, `Superseded by ADR NNNN`, `Rejected`. Keep proposals distinct from accepted decisions.
- `Tracking:` is directly under `Status:` and has exactly one format: `[Project #2 item](<board item URL>)` (the board item, not the bare issue URL) or `none`. Usually there is one tracking issue per ADR, in the code-owning repository, even if the ADR spans several repositories.
- `Frozen: YYYY-MM-DD` is directly under `Tracking:` once the ADR is frozen. It describes the document's state, not implementation progress. The owner sets it, or an agent does with the owner's consent. If an agent finds a closed tracking issue without a `Frozen:` line, or a `Frozen:` line without a closed issue, it reports the mismatch and does not guess.

## Freeze

- An Accepted ADR freezes when its tracking issue closes.
- An ADR with `Tracking: none` freezes only when the owner says so explicitly.
- If a tracking issue is reopened, the ADR stays frozen; follow-up work gets an addendum or a new ADR.

## Changing an ADR

Only the owner approves ADR edits. If the code contradicts the ADR, the agent stops and asks; it never edits the ADR to match its own implementation without the owner's approval.

**Before freeze:** changes found during implementation are edited directly into the ADR and the plan in the same change. Each edit adds one line to a `## Revisions` log in the ADR (date, what changed, why). Addenda are not used before freeze.

**After freeze:** the decision text is not rewritten. Use either:

- an addendum: an owner decision recording how the decision was concretely realized, or a clarification; or
- a new superseding ADR for a change of mind.

**Folding:** existing addenda and inline updates are folded into ADR bodies as a one-time, owner-authorized migration, including ADRs that are frozen under the new rule. Each folded ADR gets a `## Revisions` entry saying so and naming the pre-fold commit.

## Supersession

Explicitly record when a later decision supersedes an earlier one. The older ADR's `Status:` becomes `Superseded by ADR NNNN`.

## Naming and numbering

Use a numbered filename (`0001-Topic.md`), numbered consecutively, with the title `# ADR NNNN: Title`. Record the source/date of the decision.

## Notes

See the placement rules in [../README.md](../README.md#organization).

## Template

```markdown
# ADR NNNN: Title

- **Status:** Proposed
- **Tracking:** none
- **Recorded:** YYYY-MM-DD
- **Source:** for example owner decision

## Context

## Decision

## Rejected alternatives

## Consequences

## Open questions
```

Add a `- **Frozen:** YYYY-MM-DD` line under `Tracking:` when the ADR freezes. The `## Revisions` log (`- YYYY-MM-DD: what changed, why.`) is added with the first post-acceptance edit.
