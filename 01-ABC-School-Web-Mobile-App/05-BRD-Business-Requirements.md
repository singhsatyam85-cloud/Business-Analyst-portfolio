# Business Requirements Document

## Project Name
ABC School Web and Mobile Application

## Business Problem
ABC School wants to reduce manual attendance work and improve visibility of attendance records. The current process may depend on paper, Excel or separate files, which creates manual effort and makes reporting slower.

## Business Objectives
- Allow teachers to mark student attendance digitally.
- Allow admin staff to manage student and teacher data.
- Allow admin staff to view basic attendance reports.
- Reduce manual record handling.
- Improve clarity of attendance records.
- Create a simple MVP before adding advanced school modules.

## Scope

### In Scope
- Teacher login
- Teacher class selection
- Attendance marking
- Attendance submission
- Admin attendance view
- Basic student data management
- Basic teacher data management
- Role-based access for Admin and Teacher
- Web application for Admin
- Mobile application for Teacher

### Out of Scope
- Fee management
- Transport management
- Exam marks
- Timetable automation
- Parent login
- Payment gateway
- Notifications
- Complex analytics
- Third-party integration

## Stakeholders
- School Owner
- Principal / Product Owner
- Admin Staff
- Teacher Representative
- Business Analyst
- Scrum Master
- Developer
- QA Tester
- DevOps Engineer

## Business Requirements

| ID | Business Requirement | Priority | Rationale |
|---|---|---|---|
| BR-01 | The school must be able to record attendance digitally. | Must | Reduces manual attendance effort. |
| BR-02 | Teachers must be able to mark attendance for assigned classes only. | Must | Prevents incorrect class updates. |
| BR-03 | Admin must be able to manage student records. | Must | Supports basic school data management. |
| BR-04 | Admin must be able to manage teacher records. | Should | Supports class and teacher allocation. |
| BR-05 | Admin must be able to view attendance reports. | Should | Improves operational visibility. |
| BR-06 | The first release must avoid advanced modules such as fees, transport and payments. | Must | Keeps MVP small and deliverable. |

## Assumptions
- ABC School will nominate one Product Owner.
- Teachers will use the mobile application.
- Admin staff will use the web application.
- Project 1 focuses only on attendance and basic data management.
- No external system integration is required in Project 1.

## Risks and Clarifications
- Current attendance process must be confirmed.
- Number of students, teachers and classes must be confirmed.
- Requirement approval owner must be confirmed.
- Android-only versus Android and iOS must be confirmed for future release planning.

## Success Criteria
- Teachers can mark and submit attendance digitally.
- Admin can view attendance records.
- Admin can manage basic student and teacher data.
- MVP scope is agreed before development starts.
- UAT scenarios can be mapped to business requirements.
