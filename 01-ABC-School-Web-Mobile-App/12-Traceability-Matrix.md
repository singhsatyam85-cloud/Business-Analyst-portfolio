# Requirement Traceability Matrix

## Purpose
This matrix connects requirements, user stories, acceptance criteria and UAT test cases. It helps confirm that every key requirement is covered during testing.

| Requirement ID | Requirement | User Story | Acceptance Criteria Summary | Test Case | Status |
|---|---|---|---|---|---|
| FR-01 | Teacher can log in securely using approved credentials. | Teacher Login | Valid login opens dashboard; invalid login shows error. | TC-01, TC-02 | Not Started |
| FR-02 | Teacher can view only assigned classes after login. | Select Class and Section | Teacher sees assigned classes only. | TC-03 | Not Started |
| FR-03 | Teacher can select assigned class and section. | Select Class and Section | Correct student list appears after selection. | TC-03 | Not Started |
| FR-04 | System displays students from selected class and section. | Select Class and Section | Student list matches selected class and section. | TC-03 | Not Started |
| FR-05 | Teacher can mark each student as Present, Absent or Late. | Mark Attendance | Teacher can select attendance status for each student. | TC-04 | Not Started |
| FR-06 | Teacher can submit completed attendance. | Submit Attendance | Submit action is available after completing attendance. | TC-05 | Not Started |
| FR-07 | System shows confirmation after successful submission. | Submit Attendance | Confirmation message appears. | TC-05 | Not Started |
| FR-08 | System prevents submission if mandatory values are missing. | Mark Attendance | Validation message appears for missing values. | TC-06 | Not Started |
| FR-09 | Admin can view daily attendance report. | Admin View Attendance Report | Daily attendance records are visible. | TC-07 | Not Started |
| FR-10 | Admin can view attendance by class and date. | Admin View Attendance Report | Report can be filtered by class and date. | TC-08 | Not Started |

## Notes
Traceability should be updated when requirements, user stories or UAT test cases change.
