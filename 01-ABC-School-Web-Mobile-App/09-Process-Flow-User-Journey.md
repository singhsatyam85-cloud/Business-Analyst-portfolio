# Process Flow and User Journey

## Core Teacher Attendance Journey

```text
Teacher Login
     ↓
Dashboard
     ↓
Select Class and Section
     ↓
View Student List
     ↓
Mark Attendance
     ↓
Review Attendance
     ↓
Submit Attendance
     ↓
Confirmation Message
```

## Step Details

| Step | User Action | System Response |
|---|---|---|
| 1 | Teacher logs in | System validates credentials and opens dashboard |
| 2 | Teacher selects class and section | System loads matching student list |
| 3 | Teacher marks attendance | System records Present, Absent or Late selection |
| 4 | Teacher submits attendance | System validates mandatory values |
| 5 | System saves attendance | Confirmation message appears |

## Key Business Rules
- Teacher must be authenticated before viewing classes.
- Teacher can only view assigned classes.
- Student list must match selected class and section.
- Attendance cannot be submitted with missing mandatory values.
- System must show success or validation message clearly.

## Exception Examples
- Invalid login attempt.
- No class assigned to teacher.
- Duplicate attendance submission for same class and date.
- Network or save failure.
