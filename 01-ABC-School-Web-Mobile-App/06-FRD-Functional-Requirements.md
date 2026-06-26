# Functional Requirements Document

## Project Name
ABC School Web and Mobile Application

## Module
Teacher Attendance and Admin Attendance View

## Functional Requirements

| ID | Functional Requirement | Priority | Notes |
|---|---|---|---|
| FR-01 | Teacher can log in securely using approved credentials. | Must | Required for access control and user accountability. |
| FR-02 | Teacher can view only assigned classes after login. | Must | Prevents teachers from marking unrelated classes. |
| FR-03 | Teacher can select assigned class and section. | Must | Ensures correct attendance list is loaded. |
| FR-04 | System displays students from the selected class and section. | Must | Supports accurate marking. |
| FR-05 | Teacher can mark each student as Present, Absent or Late. | Must | Core attendance functionality. |
| FR-06 | Teacher can submit completed attendance. | Must | Saves attendance record. |
| FR-07 | System shows confirmation after successful submission. | Must | Gives user feedback. |
| FR-08 | System prevents submission if mandatory attendance values are missing. | Must | Prevents incomplete records. |
| FR-09 | Admin can view daily attendance report. | Should | Improves operational visibility. |
| FR-10 | Admin can view attendance by class and date. | Should | Supports basic reporting. |

## Non-Functional Requirements

| ID | Non-Functional Requirement | Priority | Notes |
|---|---|---|---|
| NFR-01 | Attendance page should load within 3 seconds under normal usage. | Should | Supports teacher adoption and usability. |
| NFR-02 | Application should work on desktop and mobile screen sizes. | Should | Supports web and mobile access. |
| NFR-03 | User access should be role based. | Must | Teachers should not access admin screens. |
| NFR-04 | Error messages should be clear and understandable. | Should | Reduces user confusion. |

## Business Rules
- Teacher must be authenticated before viewing classes.
- Teacher must see only assigned classes.
- Student list must match selected class and section.
- Attendance cannot be submitted with missing mandatory values.
- System must show success or validation message clearly.
- Teachers should be blocked from admin screens.

## Exception Scenarios
- Invalid login attempt.
- No class assigned to teacher.
- Duplicate attendance submission for same class and date.
- Network or save failure.
- Missing attendance value before submission.
