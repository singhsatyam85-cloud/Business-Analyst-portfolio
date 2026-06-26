# UAT Test Cases

## Project Name
ABC School Web and Mobile Application

## UAT Objective
Validate whether the Teacher Attendance MVP works as expected from the business user perspective.

## Testers
- Teacher Representative
- Admin Staff
- Business Analyst
- QA Tester
- Product Owner / Principal

## UAT Test Scenarios

| Test ID | Scenario | Steps | Expected Result | Linked Requirement | Status |
|---|---|---|---|---|---|
| TC-01 | Teacher logs in with valid credentials | Enter valid login details and click Sign In | Login successful and dashboard opens | FR-01 | Not Started |
| TC-02 | Teacher enters wrong password | Enter invalid password and click Sign In | Error message appears | FR-01 | Not Started |
| TC-03 | Teacher selects class and section | Select assigned class and section | Correct student list appears | FR-02 / FR-03 | Not Started |
| TC-04 | Teacher marks attendance | Mark students as Present, Absent or Late | Attendance values are selected successfully | FR-05 | Not Started |
| TC-05 | Teacher submits completed attendance | Complete attendance and submit | Attendance saved and confirmation shown | FR-06 / FR-07 | Not Started |
| TC-06 | Teacher submits missing attendance values | Leave one required value blank and submit | Validation message appears | FR-08 | Not Started |
| TC-07 | Admin opens attendance report | Login as Admin and open attendance report | Daily attendance records are visible | FR-09 | Not Started |
| TC-08 | Admin filters attendance by class and date | Select class and date filter | Filtered attendance record is visible | FR-10 | Not Started |

## BA Role During UAT
- Prepare UAT scenarios.
- Support testers and users.
- Clarify expected behaviour.
- Triage defects and feedback.
- Help Product Owner decide whether issues are bugs, changes or training needs.

## UAT Sign-Off Criteria
- Must-have test cases passed.
- No open critical defect.
- Product Owner accepts MVP behaviour.
- Known limitations are documented.
