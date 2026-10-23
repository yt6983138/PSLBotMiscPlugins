# Team, operations, and planning context

This document supports planning discussions, including team-level and operational decisions. It is not an implementation plan or authorization to execute proposed actions. Read `RepositoryGuide.md` for repository and validation rules.

Keep confirmed facts, proposals, decisions, and unresolved questions distinct. Do not treat an unanswered question as permission to choose on the team's behalf.

## Scope of this interview

- The owner has explicitly limited this session to **team and operating context**.
- Shutdown details are recorded as context, not as a technical implementation plan.
- Archive implementation improvements remain undecided and are deferred to a separate session. Do not resume implementation-design questioning in this interview.

## Confirmed organizational context

Source: project owner's statements in the planning interview.

- The owner is the bot's main and only programmer.
- The team has **six people total**: the owner, three Vietnamese localizers, one French localizer, and one UI designer.
- The owner alone manages the support server and all operations.
- The owner also handles **Traditional Chinese and Simplified Chinese localization**.
- The UI designer supplies designs using Figma, Photoshop, or other tools of their choice. The owner converts those designs into **HTML + JavaScript templates for rendering**. The designer is not an additional programmer.
- The owner wants agents to help with planning, including team-level and operational decisions, and to retain the relevant context in documentation.

Decision authority, consultation practices, and operating constraints are recorded below. Unspecified details remain open rather than being filled in by assumptions.

### Role map

| Role | People | Confirmed responsibilities |
| --- | --- | --- |
| Owner | 1 | All programming; support-server management; all operations; Traditional and Simplified Chinese localization; converting UI designs into rendering templates. |
| Vietnamese localizers | 3 | Vietnamese localization. Other responsibilities and division of work are not yet established. |
| French localizer | 1 | French localization. Other responsibilities are not yet established. |
| UI designer | 1 | Producing UI designs; implementation is handled by the owner. |

Do not plan as though six team members provide six people of engineering or operational capacity. Only the owner currently performs those responsibilities. Willingness to take on other duties remains unknown.

### Volunteer capacity and planning constraints

- Contributors participate **voluntarily and without pay**.
- Availability can vary substantially; contributors may be very busy.
- **Do not assume weekly hours**, standing availability, or committed throughput for the team. No fixed owner coding-time allowance has been supplied either.
- The owner cannot require unpaid contributors to take on work. Treat proposed assignments as requests requiring explicit willingness, not binding obligations.
- Do not invent contributor deadlines or rely on unconfirmed availability. Fixed external dates do not imply volunteer delivery commitments.
- Additional responsibilities or a time-bound commitment must be agreed with the relevant person before a plan relies on them.

## Decision-making and community input

Source: owner's description of current practice.

- Contributors decide within their own roles. Do not assume the owner centrally approves every localization or design decision.
- There is not an established team-discussion process for these decisions.
- The owner asks **users** about new features and behavior changes, describing the goal as "true democracy."
- Users can also request features or fixes directly.
- The owner decides on requests based on **complexity and impacts**. A user request is not automatically an accepted commitment.
- User preferences are **not binding implementation instructions**. The owner can decline a popular request based on complexity and impacts.
- When declining, the owner explains the reasons (for example, API limits or heavy storage requirements) and asks users for other choices.
- Preserve this community-led approach with transparent feasibility limits; do not equate "true democracy" with mandatory majority-rule delivery or dismissal of user input.
- User input comes through **polls, support-server discussions, DMs, and a feedback form**.
- The owner has not had time to check the feedback form lately. Do not assume it is actively monitored, all submissions have been reviewed, or silence means there is no feedback.
- The owner judges whether consultation is sufficient **case by case**; no fixed participation threshold or waiting period is established.
- **Server admins' input has slightly higher priority because of their management needs.** Do not invent numerical vote weights or treat their requests as automatically overriding others or the owner's feasibility judgment.
- Public statements that a feature is "planned" mean **intended work that can still change**, not an unconditional delivery commitment.
- Upon release, the owner announces the full details and differences from the planning announcement. Agents can help draft that comparison, but the owner publishes it.
- Do not present a changing roadmap as a broken fixed promise, silently describe planned features as available, or invent release dates.

## Agreed role of planning agents

The owner explicitly agreed to the following boundary:

- Help compare options, challenge assumptions, recommend a choice, and draft user polls or announcements.
- Support team-level and operational planning, not only technical implementation planning.
- Keep recommendations and communication drafts distinct from approved decisions or public commitments.
- **Agents must never operate without the owner's supervision.** They are not autonomous operators or substitute support staff.
- **Do not respond to users or publish/send announcements on the owner's behalf.** Provide drafts to the owner; the owner handles user-facing communication. Approval of draft content is not permission to send it.
- Actions outside requested coding work and decision support must go through the owner first. Do not infer permission to deploy, administer services, change live data, or perform other operations from a planning conversation or coding request.
- Do not decide on the owner's behalf. Surface choices for the owner rather than silently turning recommendations into policy.
- Do not treat planning discussion as authorization to implement code changes or perform operational actions.
- Respect contributor autonomy, voluntary capacity, the owner's feasibility judgment, and the service's proportionate reliability posture.
- Requested coding work remains subject to repository rules: **build only, never run projects**, and preserve unrelated work. The supervision boundary does not waive these rules.

## Support and owner availability

- Support and outage handling are **best-effort when the owner returns** if the owner is busy or unavailable.
- Do not plan around substitute coverage or invent response-time guarantees.
- Agents must not fill a coverage gap by operating services or communicating with users unattended.

## Work prioritization

The owner's stated default order is:

1. **Critical bug fixes**.
2. **Support**.
3. **Popular user feature requests**.
4. **The owner's own ideas**.

- Effort affects prioritization: greater effort generally means lower priority.
- **Critical bug fixes always come first**, even when they require substantial effort. Do not use effort as a reason to rank noncritical work above a critical fix.
- Outside that exception, treat the order as a default informed by effort, not an inflexible scheduling algorithm or delivery commitment.
- The owner identifies **bot-wide unavailability, security bugs, incorrect algorithms, and bad/confusing wording** as critical-bug concerns. Do not limit criticality to outages or security alone.
- **Only the owner makes the severity call.** Agents may flag suspected issues and explain impacts, but must not assign binding severity or reorder work on their own.
- Wording issues are critical **only when the owner judges their impact to warrant it**. Examples include wording that conveys the completely opposite meaning or requires TOS clarification. Ordinary typos are not automatically critical.

## Confirmed service posture

- The owner describes the bot as a **nice-to-have tool that users love**, not a business-critical or financial service.
- Planning recommendations should be proportionate to that role and the owner's limited capacity, rather than importing enterprise-grade reliability requirements.
- For the shutdown archive response, the owner explicitly excludes server-failure mitigation from scope. Archives currently have no backup. Preserve this scope decision while accurately describing the risk; do not promise guaranteed preservation or silently make backup work mandatory.

## Infrastructure and spending constraints

- There is **one server** available, as described by the owner:
  - Intel Core **i7-3770** CPU.
  - **16 GB RAM**.
  - **256 GB SSD**.
  - **1 gigabit Ethernet** connectivity.
- These are hardware specifications, not measured available resources. Do not assume the full SSD is free, all RAM/CPU is available to the bot, or Ethernet link speed guarantees internet throughput.
- No fixed spending budget has been established. **Ask the owner before recommending anything paid**; do not assume funding for upgrades, extra servers, or hosted services.
- Favor options proportionate to this single-server setup and limited volunteer engineering capacity.
- Current utilization, free disk space, measured request load, and specific external API limits have not yet been supplied. Request them only when they materially affect a decision; do not invent capacity estimates.

## Community scale

Approximate figures supplied by the owner during this interview; not independently verified live metrics:

- **2,100 registered users**, registered through TapTap login or a token.
- **900 server installs**.
- **1,400 user installs**.
- These are distinct measures, not additive counts of unique or active users. Do not infer active usage, concurrency, international-user share, or support demand from them.
- Support is **normally pretty quiet**, becoming somewhat busier around announcements of new Phigros updates.
- Support used to be substantially more frequent because of unfixed bugs and feature requests, according to the owner.
- No specific increase attributable to the cloud-save shutdown announcement has been established. Do not infer a current support surge from the historical workload.

## International Phigros cloud-save shutdown

### Confirmed date and scope

- Shutdown date: **2026-10-31**, confirmed by the owner as the exact date. Shutdown time and time zone are not yet established.
- Affected users: Phigros installations downloaded from **Google Play** or **taptap.io** (international builds).
- Unaffected users: installations downloaded from **taptap.cn** or the **Apple App Store**, identified by the owner as the China-side builds.
- The owner confirms that all international cloud-save functionality will be disabled, including login, reading saves, and uploading saves. This does not establish whether local gameplay or local saves are affected.

### Announcement supplied by the owner

The announcement's URL and publication date have not yet been supplied. Its text is retained here; the detailed scope above comes from the owner's clarification, not additional wording in the announcement.

> Dear little pigeons,
>
> Due to various reasons, we regret to inform you that Cloud Save functions on Tapio and Google Play builds will be discontinued from October 31 onwards.
>
> We're sincerely sorry for any inconvenience caused.
> #Phigros #Pigeon_Games

### Response status

The owner has published a response announcement dated **2026-10-22**. See `InternationalCloudSaveResponse.md` for the supplied text, established public expectations, and open response decisions.

- `/archive-save` is already implemented, according to the owner, with command-specific consent and server-side archiving.
- The announced roadmap includes user-submittable local-save storage, three import workflows, and one-way international-to-China cloud-save transfer.
- The announcement says delivery will be gradual; it does not give feature delivery dates.
- International-to-China transfer can work from an archived save after shutdown. The owner has save-upload code intentionally kept outside this codebase to prevent cheating; do not assume permission to import or publish it.
- Pre-shutdown delivery is desirable, not a hard transfer-delivery deadline. Retrieving saves from international cloud services remains constrained by the shutdown.
- Using archived scores in the bot is not needed before shutdown. Self-service archive download and China transfer are nice-to-have before shutdown and required afterward, without strict delivery deadlines.
- The owner cannot work full time on the codebase. Agents should not impose fixed roadmap dates; gradual delivery without deadlines is acceptable.
- Archive-preservation acceptance criteria and the remaining roadmap priorities have not yet been established in this interview.
- The owner checks archives manually. The current archive program is a temporary response chosen to communicate quickly and give users time to act; the owner intends a near-term follow-up, with scope still unresolved.

## Interview status and future clarification

The baseline team and operating context is established: roles, volunteer capacity, decision authority, community consultation, agent boundaries, infrastructure constraints, support posture, work priorities, and changeable roadmap expectations.

The following are intentionally not filled in by assumptions. Ask only when a future decision depends on them:

- Specific coordination/handoff practices and willingness to take on responsibilities outside existing contributor roles.
- Measured server utilization or API limits needed for a concrete feasibility assessment.
- Archive handling policies and remaining shutdown-response decisions listed in `InternationalCloudSaveResponse.md`.

Technical archive improvements are explicitly deferred to a separate session. No new duties, fixed hours, delivery dates, or operational actions have been agreed merely by documenting this context.

As new answers arrive, replace unresolved questions with attributed facts or explicit decisions rather than inferred commitments.
