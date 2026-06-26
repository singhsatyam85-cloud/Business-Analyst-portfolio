# Wireframe and Screen Flow

## Purpose
This document shows simple screen flow thinking before detailed UI design. It helps the Product Owner, developer and tester agree on the user journey before build.

## Screen Flow

```text
Login Screen
     ↓
Teacher Dashboard
     ↓
Select Class Screen
     ↓
Attendance Page
     ↓
Submission Confirmation
```

## Screen 1: Login Screen
Fields:
- Email / Username
- Password
- Sign in button
- Error message area

Expected behaviour:
- Valid credentials open dashboard.
- Invalid credentials show clear error message.

## Screen 2: Teacher Dashboard
Fields / sections:
- Assigned classes
- Today summary
- Open attendance action

Expected behaviour:
- Teacher sees only assigned classes.
- Teacher cannot open admin screens.

## Screen 3: Select Class Screen
Fields:
- Class
- Section
- Date
- Continue button

Expected behaviour:
- Teacher selects class and section before viewing students.
- System loads the student list based on selection.

## Screen 4: Attendance Page
Fields:
- Student list
- Present / Absent / Late options
- Submit button

Expected behaviour:
- Teacher marks attendance for each student.
- System prevents submission if mandatory values are missing.

## Screen 5: Confirmation
Fields:
- Success message
- Return to dashboard option

Expected behaviour:
- Confirmation appears after successful submission.
- If save fails, system shows a clear failure message.
