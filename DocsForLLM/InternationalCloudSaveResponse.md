# International cloud-save shutdown response

Read `PlanningContext.md` for the shutdown scope and organizational context. This document records the owner's public announcement and subsequent planning decisions; it is not authorization to implement or operate anything.

## Public communication: 2026-10-22

Source: announcement supplied by the owner in the planning interview. Announcement URL/channel and publication time have not been supplied.

### Established expectations

- **Available now, as reported by the owner:** `/archive-save` archives a user's current save data to the team's server. This is not a claim of runtime validation by an agent.
- **Consent disclosure:** the announcement states that the current TOS does not cover the archive command; users must read and consent to the command-specific terms before it continues. This records the disclosure, not an assessment of legal sufficiency.
- **Archive handling expectations:** archived saves can be used for the planned local-save workflow, retrieved for users' purposes, or deleted upon request. Retention periods and request procedures have not yet been established in this interview.
- **Announced roadmap:** user-submittable local-save storage for non-cloud-save users; import from cloud-save files, spreadsheets/Excel/CSV, and local-save files; and a one-way international-to-China cloud-save transfer utility.
- **Local file constraint disclosed:** importing a local-save file requires root/jailbreak, according to the announcement.
- **Delivery expectation:** features will be delivered gradually. No specific feature delivery dates appear in the announcement.
- **Integrity concern disclosed:** user-submitted scores may undermine leaderboard validity. No leaderboard policy decision has been established.
- **Backup advice already communicated:** enable device and Google Play backups. The announcement's backup advice is not independent verification of availability or restoration guarantees.
- **Support channels offered:** open a thread or DM the owner with questions or suggestions.

### Original announcement

The following is the text supplied by the owner, preserved without editorial corrections.

---

# 2026/10/22 Discontinuation of International Cloud Saves
Hello everyone, we are sorry to announce that Pigeon Games has decided to discontinue the international cloud save features, which means one of the most important feature will be gone soon.

## What are we going to do next?
We are planning to implement an user-submittable local save storage that can be used by any non-cloud save users. We are also planning to implement following compatibility commands to help you transfer from existing workflow:
1. Import from cloud save file
2. Import from spreadsheet/excel/csv
3. Import from local save file (requires root/jailbreak)

In addition of transferring to local save storage, we are also planning to implement a cloud save transfer utility, which transfers from international to China account only.
## What can you do now?
We have implemented a save archive program (**`/archive-save` command**), which archives your current save data and uploads to our server. (**Note: Current TOS does not include terms for this command.** Please read the terms upon execution, it does not continue without your consent.)
After archiving, your save can be used to integrate to our local save storage workflow, be retrieved for your purpose, or deleted upon request.

Furthermore, you should also enable backup (both device and Google play) so your local save is recovered if your device is lost or stops working.

## What else will have problems?
One of the major problem is the leaderboard. Since the new local save storage will be user-submittable, which means any user can upload any score, thus the leaderboard may not be valid anymore.

Another major problem is coding, since the bot uses multiple tech stacks, has 20k+ LOC, and only 1 maintainer/programmer (aka me), so those will be delivered gradually.

## Ending
Thank you all for using the bot, if you have any questions or suggestions, feel free to open a thread or DM me for discussion. We are always open to suggestions and reports.

(TL;DR: Run `/archive-save` if you want to able to transfer to our new local save system in the future)

---

## Decisions still needed

- Archive implementation improvements remain **undecided and deferred to a separate session**. The owner explicitly limits this interview to team and operating context. Server-failure mitigation is out of scope per the owner.
- Capacity and priority among the announced features.
- Archive consent terms, retention, retrieval/deletion procedures, and responsibility for user requests.
- Post-shutdown service behavior and leaderboard policy.

## Confirmed transfer dependency and timing

Source: owner's clarification in the planning interview.

- International-to-China transfer can use an **archived save**; live international access is not required for that transfer workflow.
- The owner already has save-upload code. It is deliberately excluded from this codebase to prevent cheating. Its existence does not establish that an integrated transfer utility is complete.
- Treat the upload code as an intentional anti-cheating boundary. Do not assume authorization to bring it into this repository or publish it.
- Completing the planned work before **2026-10-31** is desirable, but the owner does not consider transfer delivery a hard deadline.
- The external shutdown still sets the cutoff for retrieving saves through the affected international cloud service. Archived-save-based transfer can be delivered afterward; specific retention and destination requirements remain unresolved.

## Owner's delivery priorities

- Using archived scores in the bot is **not required before shutdown**. Its later priority is not yet established.
- User self-service archive download and international-to-China transfer are **nice-to-have before shutdown and required afterward**.
- These delivery requirements have **no strict deadline**. Do not invent one or treat an undated requirement as optional.
- The owner cannot work full time on this codebase and has already communicated that work remains. Gradual delivery without fixed dates is acceptable to the owner.
- The owner clarifies that publicly "planned" features are **intended work that can still change**. Upon release, the owner will announce full details and differences from the planning announcement. The required eventual download/transfer outcomes above are the owner's current stated priorities, not unconditional or dated public guarantees.
- Reliable preservation and user instructions were proposed during the interview; the precise operational acceptance criteria remain open.

## Preservation question raised by source inspection

Static inspection only; no project was run and no operational state was checked.

- `SaveArchiveProgram/ArchiveSaveCommand.cs` acknowledges queue enrollment, not completed archiving.
- `SaveArchiveProgram/SaveArchiveService.cs` processes an in-memory queue. Exceptions are logged; individual save downloads are retried up to three times and can then be skipped. A metadata record can therefore be written without all save files.
- These observations raise an operational question about how the owner currently verifies successful, usable archives and handles failures before cloud access disappears. They are not an instruction to implement changes or evidence that production archives have failed.

### Current operating approach and intended follow-up

Source: owner's clarification in the planning interview.

- The owner currently checks archives manually. The exact checks and failure-handling process have not yet been described.
- The archive program is a temporary solution, introduced to allow an announcement as soon as possible so users have time to react.
- The owner said the temporary solution can be changed "tomorrow." Record this as an intended near-term follow-up, not a fixed release commitment or authorization to change code during this planning interview. The scope is not yet agreed.
- The owner subsequently asked to leave that scope undecided. Do not continue technical archive-design questioning in this team/operations interview or infer an improvement checklist.
- Archives are **not currently backed up**, as confirmed by the owner.
- The owner explicitly excludes server failure from the response's planning scope. Do not turn backups, redundancy, or server-failure recovery into required work without a new owner decision.
- This scope choice accepts the possibility of archive loss if the sole server copy is lost; it does not imply archives are durable or guaranteed recoverable.
