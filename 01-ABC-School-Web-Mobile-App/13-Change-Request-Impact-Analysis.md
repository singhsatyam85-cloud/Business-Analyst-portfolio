# Change Request and Impact Analysis

## Sample Change Request
Teachers want the ability to edit attendance after submission.

## Current MVP Behaviour
Teacher marks attendance and submits it. After successful submission, the attendance record is saved and confirmation appears.

## Requested Change
Allow teacher to edit submitted attendance for the same class and date.

## Impact Analysis

| Area | Impact |
|---|---|
| Scope | Medium impact. Edit attendance was not part of the original MVP. |
| Business Rules | Need rule for who can edit and how long edit access remains open. |
| Approval | Need confirmation whether Principal/Admin approval is required for corrections. |
| Development | Requires edit screen, validation logic and audit trail. |
| Testing | Requires extra test cases for valid edit, invalid edit, duplicate edit and approval flow. |
| Data | Requires storing original and updated attendance value if audit tracking is required. |
| Timeline | May affect Sprint 1 if added immediately. Better for Sprint 2 or Phase 2. |
| Risk | Incorrect attendance changes can create reporting and compliance issues. |

## Recommendation
Do not add this change into Sprint 1 MVP. Keep Sprint 1 focused on teacher login, class selection, attendance marking and submission. Move attendance edit to Sprint 2 or Phase 2 after business rules and approval process are confirmed.

## BA Decision Note
This is not a defect if the original requirement did not include post-submission edit. It should be treated as a change request and reviewed with the Product Owner.
