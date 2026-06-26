# User Stories and Acceptance Criteria

## Epic
Attendance Management

## Story 1: Teacher Login
**As a** teacher,  
**I want** to log in securely,  
**so that** I can access my assigned classes and mark attendance.

### Acceptance Criteria
1. Teacher can enter valid login details.
2. System opens teacher dashboard after successful login.
3. System shows an error message for incorrect login details.
4. Teacher cannot access admin screens.

## Story 2: Select Class and Section
**As a** teacher,  
**I want** to select a class and section,  
**so that** I can mark attendance for the correct students.

### Acceptance Criteria
1. Teacher can view only assigned classes after login.
2. Teacher can select class and section before opening the student list.
3. System displays only students from the selected class and section.
4. System shows a message if no class is assigned.

## Story 3: Mark Attendance
**As a** teacher,  
**I want** to mark each student as Present, Absent or Late,  
**so that** attendance can be recorded accurately.

### Acceptance Criteria
1. Student list is visible after class selection.
2. Teacher can select Present, Absent or Late for each student.
3. System prevents submission if required attendance values are missing.
4. Teacher can review attendance before submission.

## Story 4: Submit Attendance
**As a** teacher,  
**I want** to submit attendance,  
**so that** the school can save the attendance record.

### Acceptance Criteria
1. Teacher can submit completed attendance.
2. System saves the attendance record successfully.
3. System shows a confirmation message after submission.
4. System handles network or save failure with a clear message.

## Story 5: Admin View Attendance Report
**As an** admin,  
**I want** to view attendance reports,  
**so that** I can monitor daily attendance records.

### Acceptance Criteria
1. Admin can open attendance report screen.
2. Admin can view daily attendance records.
3. Admin can filter attendance by class and date.
4. Admin can see student attendance status where available.

## Definition of Ready
A story is ready for sprint when:
- Business rule is confirmed.
- Wireframe or screen flow is attached.
- Priority is agreed.
- Dependencies are known.
- Acceptance criteria are reviewed by tester.

## Open Clarifications
- Can attendance be edited after submission?
- Who approves corrections?
- Should late marking require a reason?
- Should reports be downloadable in Project 1, or only viewable on screen?
