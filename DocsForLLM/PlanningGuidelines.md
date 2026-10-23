# Team and planning guidelines

These are standing rules and constraints confirmed by the owner in planning discussions. Keep facts, proposals, decisions, and unresolved questions distinct. An unanswered question is not permission to choose on the team's behalf.

Read [RepositoryGuide.md](RepositoryGuide.md) for repository and validation rules. Detailed interview context may be available locally in `Notes/PlanningContext.md`; these guidelines do not depend on that file being present.

## Team responsibilities and capacity

| Role | People | Confirmed responsibilities |
| --- | --- | --- |
| Owner | 1 | All programming, support-server management, and operations; Traditional and Simplified Chinese localization; converting UI designs into HTML + JavaScript rendering templates. |
| Vietnamese localizers | 3 | Vietnamese localization. Other responsibilities and division of work are not established. |
| French localizer | 1 | French localization. Other responsibilities are not established. |
| UI designer | 1 | Producing designs using Figma, Photoshop, or tools of their choice. Implementation is handled by the owner. |

- Six team members do not provide six people of engineering or operational capacity. Only the owner currently performs those responsibilities.
- Contributors are unpaid volunteers. Availability varies; do not assume weekly hours, standing availability, or committed throughput, including a fixed owner coding-time allowance.
- Proposed assignments are requests, not obligations. Additional duties and time-bound commitments require the relevant person's explicit willingness before a plan relies on them.
- Do not invent contributor deadlines or substitute coverage. Fixed external dates do not establish volunteer delivery commitments.

## Decision authority and community consultation

- Contributors decide within their own roles. Do not assume the owner centrally approves every localization/design decision or that an established team-discussion process exists.
- The owner consults users about features and behavior changes through polls, support-server discussions, DMs, and a feedback form. Do not assume every channel is actively monitored or all submissions have been reviewed.
- Preserve the owner's community-led approach (described as "true democracy") without equating it with mandatory majority-rule delivery. User preferences and requests are not binding implementation instructions.
- The owner accepts or declines requests based on complexity and impacts, explains feasibility limits, and asks users for alternatives when declining.
- Consultation sufficiency is judged case by case; no fixed participation threshold or waiting period is established.
- Server admins' input has slightly higher priority because of their management needs. Do not invent numerical vote weights or assume this overrides feasibility judgment.
- Publicly "planned" features are intended work that can change, not unconditional delivery commitments. Do not invent release dates, describe planned features as available, or treat a changing roadmap as a broken fixed promise.
- Upon release, the owner announces full details and differences from the planning announcement. Agents may draft the comparison; the owner publishes it.

## Supervised agent role

- Help compare options, challenge assumptions, recommend choices, and draft user polls or announcements. Team-level and operational decision support is in scope when requested, not only technical implementation planning.
- Keep recommendations and drafts distinct from approved decisions or public commitments. Do not decide on the owner's behalf or silently turn recommendations into policy.
- **Agents must never operate without the owner's supervision.** They are not autonomous operators, substitute support staff, or coverage for an unavailable owner.
- **Do not respond to users or publish/send announcements on the owner's behalf.** Provide drafts to the owner. Approval of draft content is not permission to send it.
- Actions outside requested coding and decision support require the owner first. Do not infer permission to deploy, administer services, change live data, or perform other operations from a planning conversation or coding request.
- Planning discussion and decision records do not authorize implementation. Requested coding work remains subject to repository rules: **build only, never run projects**, and preserve unrelated work.
- Respect contributor autonomy, voluntary capacity, owner feasibility judgment, and the service's proportionate reliability posture.

## Support and work priorities

Support and outage handling are best-effort when the owner returns if busy or unavailable. Do not invent response-time guarantees or unattended agent coverage.

The owner's default priority order is:

1. Critical bug fixes.
2. Support.
3. Popular user feature requests.
4. The owner's own ideas.

- Greater effort generally lowers priority, **except that critical bug fixes always come first**, even when substantial effort is required. Otherwise this is a default, not an inflexible scheduling algorithm or delivery commitment.
- Only the owner makes binding severity calls. Agents may flag suspected issues and explain impacts, not assign binding severity or reorder work independently.
- Critical-bug concerns include bot-wide unavailability, security bugs, incorrect algorithms, and bad/confusing wording. Wording is critical only when the owner judges its impact to warrant it, such as opposite-meaning wording or needed TOS clarification; ordinary typos are not automatically critical.

## Proportionate resource and reliability planning

- The owner describes the bot as a nice-to-have tool users love, not a business-critical or financial service. Do not import enterprise-grade reliability requirements without agreement.
- Plan for the owner's limited engineering capacity and single-server setup: **Intel Core i7-3770, 16 GB RAM, 256 GB SSD, and 1 gigabit Ethernet**, as described by the owner.
- Hardware/link specifications are not measured available resources or guaranteed internet throughput. Registration/install counts are not active usage, concurrency, or support demand.
- No fixed spending budget is established. **Ask the owner before recommending anything paid**; do not assume funding for upgrades, servers, or hosted services.
- Request utilization, free-space, load, and API-limit measurements only when materially relevant to a decision. Do not invent capacity estimates.
- Feature-specific scope exclusions are not general reliability policy. The shutdown archive's server-failure exclusion and accepted risk are recorded in [ADR 0001](ADR/0001-InternationalCloudSaveResponse.md).

## Feature-specific decisions

- [ADR 0001](ADR/0001-InternationalCloudSaveResponse.md): international cloud-save shutdown response and archive/transfer priorities.
- [ADR 0002](ADR/0002-LocalScoreSystem.md): local-score requirements and storage decisions; unapproved design recommendations are not policy.

Ask about unresolved details only when the next decision depends on them. Record new answers as attributed facts or explicit decisions, not inferred commitments.
