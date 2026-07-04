/**
 * Teacher Attendance App - Prototype Logic
 * Simulated Local State Management & Interactive Navigation Flows
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const SAMPLE_STUDENTS = [
        { roll: "01", name: "Aarav Sharma" },
        { roll: "02", name: "Diya Patel" },
        { roll: "03", name: "Rohan Singh" },
        { roll: "04", name: "Meera Gupta" },
        { roll: "05", name: "Kabir Khan" },
        { roll: "06", name: "Ananya Verma" },
        { roll: "07", name: "Ishaan Mehta" },
        { roll: "08", name: "Priya Nair" },
        { roll: "09", name: "Arjun Reddy" },
        { roll: "10", name: "Sneha Joshi" }
    ];

    // Initialize with some dummy historical logs to make "Logs" tab look realistic
    let attendanceHistory = [
        {
            id: "LOG-0912",
            className: "Class 10-A",
            date: "2026-07-03",
            present: 9,
            absent: 1,
            late: 0,
            totalCount: 10,
            exceptions: [{ name: "Kabir Khan", status: "absent" }]
        },
        {
            id: "LOG-0911",
            className: "Class 10-B",
            date: "2026-07-02",
            present: 10,
            absent: 1,
            late: 1,
            totalCount: 12,
            exceptions: [{ name: "Rahul Deshmukh", status: "absent" }, { name: "Aditi Rao", status: "late" }]
        }
    ];

    // --- State Variables ---
    let currentUser = {
        name: "Mr. Rohan Sharma",
        id: "T-4091",
        email: "teacher@school.edu",
        role: "Senior Mathematics Teacher",
        classes: "Maths (10-A, 10-B), Physics (9-A)"
    };

    let isLoggedIn = false;
    let currentScreen = 'screen-splash';
    let screenStack = [];
    
    // Active attendance configuration
    let activeAttendance = {
        className: "",
        sectionName: "",
        date: "",
        studentList: [] // Array of { roll, name, status: 'present'|'absent'|'late'|'' }
    };

    let draftStore = {}; // Key: class-section-date, Value: studentList

    // --- Elements ---
    const screens = document.querySelectorAll('.screen');
    const bottomNav = document.getElementById('bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const statusTime = document.getElementById('status-time');
    const sysBackBtn = document.getElementById('sys-back-btn');
    const sysHomeBtn = document.getElementById('sys-home-btn');

    // --- Status Bar Time ---
    function updateStatusBarTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        statusTime.textContent = `${hours}:${minutes}`;
    }
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);

    // --- Navigation System ---
    function navigateTo(screenId, addToStack = true) {
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) return;

        // Manage bottom navigation visibility
        const showBottomNavScreens = ['screen-dashboard', 'screen-history', 'screen-profile'];
        if (showBottomNavScreens.includes(screenId)) {
            bottomNav.classList.remove('hidden');
            // Update active state in bottom nav
            navItems.forEach(item => {
                if (item.getAttribute('data-screen') === screenId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        } else {
            bottomNav.classList.add('hidden');
        }

        // Hide current screen
        const currentActive = document.querySelector('.screen.active');
        if (currentActive) {
            currentActive.classList.remove('active');
            if (addToStack && currentActive.id !== screenId) {
                // Prevent duplicate consecutive entries in stack
                if (screenStack.length === 0 || screenStack[screenStack.length - 1] !== currentActive.id) {
                    screenStack.push(currentActive.id);
                }
            }
        }

        // Show target screen
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }

    function navigateBack() {
        if (screenStack.length > 0) {
            const prevScreen = screenStack.pop();
            navigateTo(prevScreen, false);
        } else if (isLoggedIn && currentScreen !== 'screen-dashboard') {
            navigateTo('screen-dashboard');
        }
    }

    // System Back & Home buttons
    sysBackBtn.addEventListener('click', navigateBack);
    sysHomeBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            screenStack = [];
            navigateTo('screen-dashboard');
        }
    });

    // Native screen back headers
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', navigateBack);
    });

    // Bottom navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetScreen = item.getAttribute('data-screen');
            if (currentScreen !== targetScreen) {
                // Clear stack when navigating via bottom bar to prevent weird cycles
                screenStack = [];
                navigateTo(targetScreen);
            }
        });
    });

    // --- Toast Handler ---
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast-notification');
        const toastMsg = document.getElementById('toast-message');
        const toastIcon = document.getElementById('toast-icon');
        
        toastMsg.textContent = message;
        
        // Define icons based on type/message
        if (message.includes('Success') || message.includes('Submit')) {
            toastIcon.textContent = 'check_circle';
            toast.style.borderLeft = '4px solid var(--present-color)';
        } else if (message.includes('Draft')) {
            toastIcon.textContent = 'save';
            toast.style.borderLeft = '4px solid var(--primary-color)';
        } else {
            toastIcon.textContent = 'info';
            toast.style.borderLeft = 'none';
        }

        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }

    // --- Splash Screen Transition ---
    setTimeout(() => {
        navigateTo('screen-login', false);
    }, 2500);

    // --- Theme Management ---
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.querySelector('span').textContent = isDark ? 'light_mode' : 'dark_mode';
        showToast(isDark ? 'Dark theme enabled' : 'Light theme enabled');
    });

    // --- Screen 2: Login Logic ---
    const loginBtn = document.getElementById('btn-login');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');
    const togglePassBtn = document.getElementById('toggle-password');

    togglePassBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        document.getElementById('pass-visibility-icon').textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });

    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === 'teacher@school.edu' && password === 'password') {
            isLoggedIn = true;
            loginError.classList.add('hidden');
            
            // Setup dashboard details
            document.getElementById('dash-teacher-name').textContent = currentUser.name;
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('dash-today-date').textContent = now.toLocaleDateString('en-US', options);

            updateDashboardStats();

            showToast("Logged in successfully");
            navigateTo('screen-dashboard', false);
        } else {
            loginError.classList.remove('hidden');
            if (username === "" || password === "") {
                document.getElementById('error-message').textContent = "Please fill in all fields.";
            } else {
                document.getElementById('error-message').textContent = "Invalid Email or Password. (Use teacher@school.edu / password)";
            }
        }
    });

    document.getElementById('forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        showToast("Password reset link sent to your registered email");
    });

    // --- Screen 3: Dashboard Actions ---
    document.getElementById('dash-action-mark').addEventListener('click', () => {
        // Set default date in selection input to today
        const dateInput = document.getElementById('select-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        
        navigateTo('screen-class-select');
    });

    document.getElementById('dash-action-view').addEventListener('click', () => {
        renderHistoryList();
        navigateTo('screen-history');
    });

    function updateDashboardStats() {
        const todayStr = new Date().toISOString().split('T')[0];
        const todaysLogs = attendanceHistory.filter(log => log.date === todayStr);
        document.getElementById('stat-completed-classes').textContent = todaysLogs.length;

        if (attendanceHistory.length > 0) {
            let totalP = 0;
            let totalStudentsCount = 0;
            attendanceHistory.forEach(log => {
                totalP += log.present;
                totalStudentsCount += log.totalCount;
            });
            const avg = Math.round((totalP / totalStudentsCount) * 100);
            document.getElementById('stat-avg-attendance').textContent = `${avg}%`;
        } else {
            document.getElementById('stat-avg-attendance').textContent = `--`;
        }
    }

    // --- Screen 4: Class & Date Selection ---
    const classSelect = document.getElementById('select-class');
    const sectionSelect = document.getElementById('select-section');
    const dateSelect = document.getElementById('select-date');
    const classSelectError = document.getElementById('class-select-error');
    const continueBtn = document.getElementById('btn-class-continue');

    continueBtn.addEventListener('click', () => {
        const cls = classSelect.value;
        const sec = sectionSelect.value;
        const dt = dateSelect.value;

        if (!cls || !sec || !dt) {
            classSelectError.classList.remove('hidden');
            return;
        }

        classSelectError.classList.add('hidden');
        
        // Setup Active Attendance State
        activeAttendance.className = cls;
        activeAttendance.sectionName = sec;
        activeAttendance.date = dt;

        // Check if there is a draft saved for this combination
        const draftKey = `${cls}-${sec}-${dt}`;
        if (draftStore[draftKey]) {
            activeAttendance.studentList = JSON.parse(JSON.stringify(draftStore[draftKey]));
            showToast("Restored saved draft");
        } else {
            // Create fresh list
            activeAttendance.studentList = SAMPLE_STUDENTS.map(student => ({
                ...student,
                status: '' // Unmarked initially
            }));
        }

        // Setup student list header UI
        document.getElementById('list-header-class').textContent = `${cls} - ${sec}`;
        
        const dateObj = new Date(dt);
        const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        document.getElementById('list-header-date').textContent = dateObj.toLocaleDateString('en-US', dateOptions);

        // Render screen 5
        renderStudentList();
        updateStudentListStats();
        navigateTo('screen-attendance-list');
    });

    // --- Screen 5: Student List & Marking ---
    const searchInput = document.getElementById('student-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length > 0) {
            clearSearchBtn.classList.remove('hidden');
        } else {
            clearSearchBtn.classList.add('hidden');
        }
        renderStudentList(query);
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        renderStudentList();
    });

    function renderStudentList(searchFilter = '') {
        const container = document.getElementById('student-list-container');
        container.innerHTML = '';

        const filteredList = activeAttendance.studentList.filter(student => {
            const matchesName = student.name.toLowerCase().includes(searchFilter);
            const matchesRoll = student.roll.includes(searchFilter);
            return matchesName || matchesRoll;
        });

        if (filteredList.length === 0) {
            container.innerHTML = `
                <div class="empty-list">
                    <span class="material-symbols-rounded">search_off</span>
                    <p>No students found matching "${searchFilter}"</p>
                </div>
            `;
            return;
        }

        filteredList.forEach(student => {
            const card = document.createElement('div');
            card.className = 'student-card';
            if (student.status) {
                card.classList.add(`marked-${student.status}`);
            }

            card.innerHTML = `
                <div class="student-info-row">
                    <div class="student-bio">
                        <span class="roll-badge">${student.roll}</span>
                        <span class="student-name">${student.name}</span>
                    </div>
                    <span class="status-indicator-badge ${student.status ? 'badge-' + student.status : 'hidden'}" id="badge-${student.roll}">
                        ${student.status}
                    </span>
                </div>
                <div class="attendance-segment-control">
                    <button class="segment-btn ${student.status === 'present' ? 'active-present' : ''}" data-roll="${student.roll}" data-status="present">
                        <span class="material-symbols-rounded">check</span>P
                    </button>
                    <button class="segment-btn ${student.status === 'absent' ? 'active-absent' : ''}" data-roll="${student.roll}" data-status="absent">
                        <span class="material-symbols-rounded">close</span>A
                    </button>
                    <button class="segment-btn ${student.status === 'late' ? 'active-late' : ''}" data-roll="${student.roll}" data-status="late">
                        <span class="material-symbols-rounded">schedule</span>L
                    </button>
                </div>
            `;

            // Add click handlers for the segment buttons
            card.querySelectorAll('.segment-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const roll = btn.getAttribute('data-roll');
                    const status = btn.getAttribute('data-status');
                    updateStudentStatus(roll, status);
                });
            });

            container.appendChild(card);
        });
    }

    function updateStudentStatus(roll, status) {
        // Find student in active state and update status
        const studentIndex = activeAttendance.studentList.findIndex(s => s.roll === roll);
        if (studentIndex !== -1) {
            // Toggle if clicked again? Or keep marked.
            activeAttendance.studentList[studentIndex].status = status;
        }

        // Re-render only list with search filter if exists
        const query = searchInput.value.toLowerCase().trim();
        renderStudentList(query);
        updateStudentListStats();
    }

    function updateStudentListStats() {
        let present = 0;
        let absent = 0;
        let late = 0;
        let unmarked = 0;

        activeAttendance.studentList.forEach(s => {
            if (s.status === 'present') present++;
            else if (s.status === 'absent') absent++;
            else if (s.status === 'late') late++;
            else unmarked++;
        });

        document.getElementById('list-stat-present').textContent = present;
        document.getElementById('list-stat-absent').textContent = absent;
        document.getElementById('list-stat-late').textContent = late;
        document.getElementById('list-stat-unmarked').textContent = unmarked;
    }

    // Save Draft click handler
    const saveDraftHandler = () => {
        const cls = activeAttendance.className;
        const sec = activeAttendance.sectionName;
        const dt = activeAttendance.date;
        const key = `${cls}-${sec}-${dt}`;
        
        draftStore[key] = JSON.parse(JSON.stringify(activeAttendance.studentList));
        showToast("Draft saved successfully");
    };

    document.getElementById('list-save-draft').addEventListener('click', saveDraftHandler);
    document.getElementById('btn-save-draft').addEventListener('click', saveDraftHandler);

    // Submit Attendance button click handler (goes to Review Screen)
    document.getElementById('btn-submit-list').addEventListener('click', () => {
        // Validation: Verify all students are marked
        const unmarkedCount = activeAttendance.studentList.filter(s => s.status === '').length;
        
        if (unmarkedCount > 0) {
            showToast(`Unmarked: Please mark status for all 10 students first.`);
            return;
        }

        // Populate Review Screen
        document.getElementById('review-class-val').textContent = `${activeAttendance.className} - ${activeAttendance.sectionName}`;
        
        const dateObj = new Date(activeAttendance.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('review-date-val').textContent = dateObj.toLocaleDateString('en-US', options);

        let pCount = 0, aCount = 0, lCount = 0;
        activeAttendance.studentList.forEach(s => {
            if (s.status === 'present') pCount++;
            else if (s.status === 'absent') aCount++;
            else if (s.status === 'late') lCount++;
        });

        document.getElementById('review-total-val').textContent = activeAttendance.studentList.length;
        document.getElementById('review-present-count').textContent = pCount;
        document.getElementById('review-absent-count').textContent = aCount;
        document.getElementById('review-late-count').textContent = lCount;

        // Exception List (Absentees & Lates)
        const exceptionContainer = document.getElementById('review-exception-list');
        exceptionContainer.innerHTML = '';

        const exceptions = activeAttendance.studentList.filter(s => s.status === 'absent' || s.status === 'late');
        
        if (exceptions.length === 0) {
            exceptionContainer.innerHTML = `
                <div class="empty-state-small green-bg" style="padding: 10px; border-radius: 8px; font-size:12px; text-align:center;">
                    🎉 100% Present! No absentees or late arrivals today.
                </div>
            `;
        } else {
            exceptions.forEach(s => {
                const item = document.createElement('div');
                item.className = 'exception-item';
                item.innerHTML = `
                    <span>Roll ${s.roll} - ${s.name}</span>
                    <span class="status-indicator-badge badge-${s.status}">${s.status}</span>
                `;
                exceptionContainer.appendChild(item);
            });
        }

        navigateTo('screen-attendance-review');
    });

    // --- Screen 6: Review Screen Actions ---
    document.getElementById('btn-review-back').addEventListener('click', navigateBack);

    document.getElementById('btn-confirm-submit').addEventListener('click', () => {
        // Build log item
        let p = 0, a = 0, l = 0;
        const exceptions = [];
        activeAttendance.studentList.forEach(s => {
            if (s.status === 'present') p++;
            else if (s.status === 'absent') {
                a++;
                exceptions.push({ name: s.name, status: 'absent' });
            }
            else if (s.status === 'late') {
                l++;
                exceptions.push({ name: s.name, status: 'late' });
            }
        });

        const newLog = {
            id: "LOG-" + Math.floor(1000 + Math.random() * 9000),
            className: `${activeAttendance.className}-${activeAttendance.sectionName}`,
            date: activeAttendance.date,
            present: p,
            absent: a,
            late: l,
            totalCount: activeAttendance.studentList.length,
            exceptions: exceptions
        };

        // Prepend to history logs
        attendanceHistory.unshift(newLog);

        // Delete draft since it is successfully submitted
        const draftKey = `${activeAttendance.className}-${activeAttendance.sectionName}-${activeAttendance.date}`;
        delete draftStore[draftKey];

        // Populate Success Screen details
        document.getElementById('success-class-val').textContent = `${activeAttendance.className} - ${activeAttendance.sectionName}`;
        
        const dateObj = new Date(activeAttendance.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('success-date-val').textContent = dateObj.toLocaleDateString('en-US', options);

        document.getElementById('success-p-val').textContent = p;
        document.getElementById('success-a-val').textContent = a;
        document.getElementById('success-l-val').textContent = l;

        // Reset inputs in Select Screen
        classSelect.value = '';
        sectionSelect.value = '';
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');

        updateDashboardStats();
        navigateTo('screen-success', false);
    });

    // --- Screen 7: Success Action ---
    document.getElementById('btn-success-dashboard').addEventListener('click', () => {
        screenStack = []; // Reset stack
        navigateTo('screen-dashboard');
    });

    // --- Screen 8: Historical Logs Filters & Search ---
    const filterToggleBtn = document.getElementById('history-filter-toggle');
    const filterPanel = document.getElementById('history-filter-panel');
    const filterClassSelect = document.getElementById('filter-class');
    const filterDateInput = document.getElementById('filter-date');
    const applyFiltersBtn = document.getElementById('btn-apply-filters');
    const clearFiltersBtn = document.getElementById('btn-clear-filters');

    filterToggleBtn.addEventListener('click', () => {
        filterPanel.classList.toggle('open');
    });

    applyFiltersBtn.addEventListener('click', () => {
        filterPanel.classList.remove('open');
        renderHistoryList();
    });

    clearFiltersBtn.addEventListener('click', () => {
        filterClassSelect.value = 'all';
        filterDateInput.value = '';
        filterPanel.classList.remove('open');
        renderHistoryList();
    });

    function renderHistoryList() {
        const container = document.getElementById('history-list-container');
        container.innerHTML = '';

        const classFilter = filterClassSelect.value;
        const dateFilter = filterDateInput.value;

        const filteredLogs = attendanceHistory.filter(log => {
            const matchesClass = classFilter === 'all' || log.className === classFilter;
            const matchesDate = !dateFilter || log.date === dateFilter;
            return matchesClass && matchesDate;
        });

        if (filteredLogs.length === 0) {
            container.innerHTML = `
                <div class="empty-list" style="margin-top: 40px; text-align: center; color: var(--text-muted)">
                    <span class="material-symbols-rounded" style="font-size: 48px;">history_toggle_off</span>
                    <p style="margin-top: 8px; font-size:14px;">No submitted attendance logs found.</p>
                </div>
            `;
            return;
        }

        filteredLogs.forEach(log => {
            const card = document.createElement('div');
            card.className = 'history-card-item';

            const logDate = new Date(log.date);
            const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

            let exceptionsText = '';
            if (log.exceptions && log.exceptions.length > 0) {
                const absNames = log.exceptions.map(e => `${e.name} (${e.status[0].toUpperCase()})`).join(', ');
                exceptionsText = `<div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;"><strong>Issues:</strong> ${absNames}</div>`;
            }

            card.innerHTML = `
                <div class="history-card-header">
                    <h4>Class ${log.className}</h4>
                    <span class="submitted-badge">
                        <span class="material-symbols-rounded">cloud_done</span>Submitted
                    </span>
                </div>
                <div class="history-card-details">
                    <span>${logDate.toLocaleDateString('en-US', dateOptions)}</span>
                    <span>Total Students: ${log.totalCount}</span>
                </div>
                <div class="history-stats-pill-row">
                    <span class="stat-pill stat-pill-p">${log.present} Present</span>
                    <span class="stat-pill stat-pill-a">${log.absent} Absent</span>
                    <span class="stat-pill stat-pill-l">${log.late} Late</span>
                </div>
                ${exceptionsText}
            `;
            container.appendChild(card);
        });
    }

    // --- Screen 9: Profile Actions ---
    document.getElementById('btn-logout').addEventListener('click', () => {
        isLoggedIn = false;
        screenStack = [];
        
        // Reset inputs
        usernameInput.value = 'teacher@school.edu';
        passwordInput.value = 'password';
        
        showToast("Logged out successfully");
        navigateTo('screen-login', false);
    });

    // Populate static profile details
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-role').textContent = currentUser.role;
    document.getElementById('profile-email').textContent = currentUser.email;

});
