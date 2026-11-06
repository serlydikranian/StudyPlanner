let studies = [];
let tasks = [];
let savedNotes = "";

let studentRegistered = false;
let studentProfile = null;

let currentStage = "explore";
let currentSection = "dashboard-section";

let timerInterval = null;
let timerRunning = false;

let totalSeconds = 25 * 60;
let secondsLeft = totalSeconds;




document.addEventListener("DOMContentLoaded", function () {

    loadSavedData();

    let savedLanguage = localStorage.getItem("studyLanguage");

    if (savedLanguage === "gr") {
        document.getElementById("language").value = "gr";
    }

    changeLanguage();

    showStage("explore");

    showSection("dashboard-section");

    renderStudies();
    renderTasks();
    updateDashboard();

    resetTimer();

    /* Prevent sidebar links from scrolling
       to hidden sections */

    document.querySelectorAll("#menu a").forEach(function (link) {

        link.addEventListener("click", function (event) {
            event.preventDefault();
        });

    });

    /* Contact message character counter */

    let messageBox = document.getElementById("contact-message");

    messageBox.addEventListener("input", function () {

        let length = messageBox.value.length;

        document.getElementById("character-count").textContent =
            length + " / 200";

        let typingMessage = document.getElementById("typing-message");

        if (length > 0) {

            typingMessage.textContent =
                getLanguage() === "gr"
                ? "Γράφεις ένα μήνυμα..."
                : "You are writing a message...";

        } else {

            typingMessage.textContent = "";

        }

    });

});



function saveData() {

    localStorage.setItem(
        "studyPlannerStudies",
        JSON.stringify(studies)
    );

    localStorage.setItem(
        "studyPlannerTasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "studyPlannerNotes",
        savedNotes
    );

    if (studentProfile !== null) {

        localStorage.setItem(
            "studyPlannerProfile",
            JSON.stringify(studentProfile)
        );

    }

}


function loadSavedData() {

    try {

        let savedStudies = localStorage.getItem("studyPlannerStudies");
        let savedTasks = localStorage.getItem("studyPlannerTasks");
        let savedProfile = localStorage.getItem("studyPlannerProfile");

        if (savedStudies !== null) {

            let result = JSON.parse(savedStudies);

            if (Array.isArray(result)) {
                studies = result;
            }

        }

        if (savedTasks !== null) {

            let result = JSON.parse(savedTasks);

            if (Array.isArray(result)) {
                tasks = result;
            }

        }

        savedNotes = localStorage.getItem("studyPlannerNotes") || "";

        document.getElementById("study-notes").value = savedNotes;

        if (savedProfile !== null) {

            studentProfile = JSON.parse(savedProfile);

            if (studentProfile && studentProfile.firstName) {

                studentRegistered = true;

                updateStudentProfile();

            }

        }

    } catch (error) {

        console.log("Could not load saved data.");

    }

}



function showStage(stage) {

    let validStages = [
        "explore",
        "features",
        "signup",
        "workspace"
    ];

    if (!validStages.includes(stage)) {
        return false;
    }

    /* Students must register before
       accessing the workspace */

    if (stage === "workspace" && !studentRegistered) {
        stage = "signup";
    }

    currentStage = stage;

    let sections = {
        explore: "explore-section",
        features: "features-tour",
        signup: "welcome-section",
        workspace: "student-page"
    };

    /* Hide all stages */

    for (let name in sections) {

        document.getElementById(sections[name]).style.display = "none";

    }

    /* Display selected stage */

    let selected = document.getElementById(sections[stage]);

    if (stage === "signup") {

        selected.style.display = "flex";

    } else {

        selected.style.display = "block";

    }

    /* Update navigation */

    document.querySelectorAll(".stage-link").forEach(function (link) {

        link.classList.remove("active");

    });

    document.getElementById("stage-" + stage).classList.add("active");

    /* Update progress bar */

    let progress = {
        explore: "25%",
        features: "50%",
        signup: "75%",
        workspace: "100%"
    };

    document.getElementById("stage-progress-fill").style.width =
        progress[stage];

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return false;

}



function getLanguage() {

    return document.getElementById("language").value;

}


function setText(id, english, greek) {

    let element = document.getElementById(id);

    if (element !== null) {

        element.textContent =
            getLanguage() === "gr" ? greek : english;

    }

}


function changeLanguage() {

    let language = getLanguage();

    localStorage.setItem("studyLanguage", language);

    document.documentElement.lang =
        language === "gr" ? "el" : "en";



    document.querySelectorAll("[data-en][data-gr]").forEach(function (element) {

        if (language === "gr") {

            element.textContent = element.getAttribute("data-gr");

        } else {

            element.textContent = element.getAttribute("data-en");

        }

    });


    document.getElementById("new-task").placeholder =
        language === "gr"
        ? "Γράψε μια εργασία"
        : "Enter a task";

    document.getElementById("study-notes").placeholder =
        language === "gr"
        ? "Γράψε τις σημειώσεις σου εδώ..."
        : "Write your notes here...";

    /* Update personalized welcome */

    updateStudentProfile();

    /* Refresh lists in selected language */

    renderStudies();
    renderTasks();
    updateDashboard();

}



function signUp(event) {

    event.preventDefault();

    let firstName = document.getElementById("first-name").value.trim();

    let surname = document.getElementById("surname").value.trim();

    let university = document.getElementById("university").value;

    let birthday = document.getElementById("birthday").value;

    let email = document.getElementById("email").value.trim();

    if (
        firstName === "" ||
        surname === "" ||
        university === "" ||
        birthday === "" ||
        email === ""
    ) {

        alert(
            getLanguage() === "gr"
            ? "Παρακαλώ συμπλήρωσε όλα τα πεδία."
            : "Please complete all fields."
        );

        return;

    }

    studentProfile = {
        firstName: firstName,
        surname: surname,
        university: university,
        birthday: birthday,
        email: email
    };

    studentRegistered = true;

    saveData();

    updateStudentProfile();

    showStage("workspace");

    showSection("dashboard-section");

}


function updateStudentProfile() {

    if (studentProfile === null) {
        return;
    }

    let fullName =
        studentProfile.firstName + " " + studentProfile.surname;

    document.getElementById("profile-name").textContent = fullName;

    document.getElementById("profile-university").textContent =
        studentProfile.university;

    if (getLanguage() === "gr") {

        document.getElementById("student-welcome").textContent =
            "Καλώς ήρθες, " + studentProfile.firstName + "!";

    } else {

        document.getElementById("student-welcome").textContent =
            "Welcome, " + studentProfile.firstName + "!";

    }

}




function showSection(sectionId) {

    let selectedSection = document.getElementById(sectionId);

    if (
        selectedSection === null ||
        !selectedSection.classList.contains("feature-section")
    ) {
        return;
    }

    currentSection = sectionId;

    /* Hide all workspace sections */

    document.querySelectorAll(".feature-section").forEach(function (section) {

        section.style.display = "none";

    });

    /* Show selected section */

    selectedSection.style.display = "block";

    /* Remove active sidebar styling */

    document.querySelectorAll(".nav-item").forEach(function (item) {

        item.classList.remove("active");

    });

    /* Find matching navigation link */

    let navigation = {
        "dashboard-section": "nav-dashboard",
        "planner-section": "nav-planner",
        "task-section": "nav-task",
        "notes-section": "nav-notes",
        "timer-section": "nav-timer",
        "contact-section": "nav-contact"
    };

    let activeLink = document.getElementById(navigation[sectionId]);

    if (activeLink !== null) {

        activeLink.classList.add("active");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}




function addStudy(event) {

    event.preventDefault();

    let subject = document.getElementById("subject").value.trim();

    let date = document.getElementById("study-date").value;

    let time = document.getElementById("study-time").value;

    if (subject === "" || date === "" || time === "") {

        alert(
            getLanguage() === "gr"
            ? "Συμπλήρωσε όλα τα πεδία."
            : "Please fill in all fields."
        );

        return;

    }

    let study = {
        id: Date.now() + Math.random(),
        subject: subject,
        date: date,
        time: time
    };

    studies.push(study);

    /* Sort sessions by date and time */

    studies.sort(function (a, b) {

        let first = a.date + " " + a.time;
        let second = b.date + " " + b.time;

        return first.localeCompare(second);

    });

    saveData();

    renderStudies();
    updateDashboard();

    document.getElementById("subject").value = "";
    document.getElementById("study-date").value = "";
    document.getElementById("study-time").value = "";

}


function formatStudyDate(date, time) {

    let studyDate = new Date(date + "T" + time);

    let language = getLanguage() === "gr" ? "el-GR" : "en-GB";

    if (isNaN(studyDate.getTime())) {

        return date + " " + time;

    }

    return studyDate.toLocaleString(language, {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}


function renderStudies() {

    let studyList = document.getElementById("study-list");

    studyList.innerHTML = "";

    if (studies.length === 0) {

        let empty = document.createElement("li");

        empty.textContent =
            getLanguage() === "gr"
            ? "Δεν υπάρχουν προγραμματισμένες μελέτες."
            : "No study sessions scheduled yet.";

        studyList.appendChild(empty);

        return;

    }

    studies.forEach(function (study) {

        let item = document.createElement("li");

        let title = document.createElement("strong");
        title.textContent = study.subject;

        let date = document.createElement("p");
        date.textContent = formatStudyDate(study.date, study.time);

        let button = document.createElement("button");

        button.textContent =
            getLanguage() === "gr" ? "Διαγραφή" : "Delete";

        button.onclick = function () {
            deleteStudy(study.id);
        };

        item.appendChild(title);
        item.appendChild(date);
        item.appendChild(button);

        studyList.appendChild(item);

    });

}


function deleteStudy(id) {

    studies = studies.filter(function (study) {

        return study.id !== id;

    });

    saveData();

    renderStudies();
    updateDashboard();

}



function addTask(event) {

    event.preventDefault();

    let taskInput = document.getElementById("new-task");

    let taskName = taskInput.value.trim();

    if (taskName === "") {

        alert(
            getLanguage() === "gr"
            ? "Γράψε μια εργασία."
            : "Please enter a task."
        );

        return;

    }

    let task = {
        id: Date.now() + Math.random(),
        name: taskName,
        completed: false
    };

    tasks.push(task);

    saveData();

    renderTasks();
    updateDashboard();

    taskInput.value = "";

}


function renderTasks() {

    let taskList = document.getElementById("task-list");

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        let empty = document.createElement("li");

        empty.textContent =
            getLanguage() === "gr"
            ? "Δεν υπάρχουν εργασίες ακόμα."
            : "No tasks added yet.";

        taskList.appendChild(empty);

        return;

    }

    tasks.forEach(function (task) {

        let item = document.createElement("li");

        let taskText = document.createElement("span");

        taskText.textContent = task.name;

        if (task.completed) {

            taskText.classList.add("completed");

        }

        let completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed
            ? (getLanguage() === "gr" ? "Αναίρεση" : "Undo")
            : (getLanguage() === "gr" ? "Ολοκλήρωση" : "Complete");

        completeButton.onclick = function () {

            completeTask(task.id);

        };

        let deleteButton = document.createElement("button");

        deleteButton.textContent =
            getLanguage() === "gr" ? "Διαγραφή" : "Delete";

        deleteButton.onclick = function () {

            deleteTask(task.id);

        };

        item.appendChild(taskText);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);

        taskList.appendChild(item);

    });

}


function completeTask(id) {

    tasks.forEach(function (task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

    });

    saveData();

    renderTasks();
    updateDashboard();

}


function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });

    saveData();

    renderTasks();
    updateDashboard();

}




function updateDashboard() {

    let completedTasks = tasks.filter(function (task) {

        return task.completed === true;

    });

    document.getElementById("task-count").textContent =
        tasks.filter(function (task) {
            return !task.completed;
        }).length;

    document.getElementById("study-count").textContent =
        studies.length;

    document.getElementById("completed-count").textContent =
        completedTasks.length;

    /* Show upcoming study sessions */

    let dashboardList =
        document.getElementById("dashboard-study-list");

    dashboardList.innerHTML = "";

    let now = new Date();

    let upcomingStudies = studies.filter(function (study) {

        let studyDate = new Date(study.date + "T" + study.time);

        return studyDate >= now;

    });

    upcomingStudies.sort(function (a, b) {

        return (a.date + a.time).localeCompare(b.date + b.time);

    });

    let nextStudies = upcomingStudies.slice(0, 3);

    if (nextStudies.length === 0) {

        let empty = document.createElement("li");

        empty.textContent =
            getLanguage() === "gr"
            ? "Δεν υπάρχουν επόμενες συνεδρίες μελέτης."
            : "No upcoming study sessions.";

        dashboardList.appendChild(empty);

        return;

    }

    nextStudies.forEach(function (study) {

        let item = document.createElement("li");

        let title = document.createElement("strong");
        title.textContent = study.subject;

        let date = document.createElement("p");
        date.textContent = formatStudyDate(study.date, study.time);

        item.appendChild(title);
        item.appendChild(date);

        dashboardList.appendChild(item);

    });

}




function saveNotes() {

    savedNotes = document.getElementById("study-notes").value;

    saveData();

    document.getElementById("notes-message").textContent =
        getLanguage() === "gr"
        ? "Οι σημειώσεις αποθηκεύτηκαν!"
        : "Your notes have been saved!";

}


function downloadNotes() {

    let notes = document.getElementById("study-notes").value;

    if (notes.trim() === "") {

        alert(
            getLanguage() === "gr"
            ? "Γράψε πρώτα κάποιες σημειώσεις."
            : "Please write some notes first."
        );

        return;

    }

    saveNotes();

   
    let file = new Blob([notes], {
        type: "text/plain;charset=utf-8"
    });

    let url = URL.createObjectURL(file);

    let link = document.createElement("a");

    link.href = url;
    link.download = "StudyPlanner-Notes.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(function () {

        URL.revokeObjectURL(url);

    }, 1000);

}



function updateTimerDisplay() {

    let minutes = Math.floor(secondsLeft / 60);

    let seconds = secondsLeft % 60;

    let displayMinutes = String(minutes).padStart(2, "0");

    let displaySeconds = String(seconds).padStart(2, "0");

    document.getElementById("timer-display").textContent =
        displayMinutes + ":" + displaySeconds;

    /* Update circular timer progress */

    let percentage = (secondsLeft / totalSeconds) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    document.getElementById("timer-circle").style.background =
        "conic-gradient(#7161e8 " +
        percentage +
        "%, #e8eaf2 " +
        percentage +
        "%)";

}


function startTimer() {

    if (timerRunning) {
        return;
    }

    if (secondsLeft <= 0) {

        resetTimer();

    }

    timerRunning = true;

    timerInterval = setInterval(function () {

        secondsLeft--;

        updateTimerDisplay();

        if (secondsLeft <= 0) {

            pauseTimer();

            alert(
                getLanguage() === "gr"
                ? "Ο χρόνος μελέτης ολοκληρώθηκε! Κάνε ένα διάλειμμα."
                : "Study session complete! Time for a break."
            );

        }

    }, 1000);

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerRunning = false;

}


function resetTimer() {

    pauseTimer();

    let minutesInput = document.getElementById("timer-minutes");

    let minutes = Number(minutesInput.value);

    if (!Number.isFinite(minutes) || minutes < 1) {
        minutes = 25;
    }

    if (minutes > 180) {
        minutes = 180;
    }
minutes = parseInt(minutes);

document.getElementById("timer-minutes").value = minutes;

totalSeconds = minutes * 60;
secondsLeft = totalSeconds;

updateTimerDisplay();

}




function sendContact(event) {

    event.preventDefault();

    let name = document.getElementById("contact-name").value.trim();

    let email = document.getElementById("contact-email").value.trim();

    let phone = document.getElementById("contact-phone").value.trim();

    let message = document.getElementById("contact-message").value.trim();

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {

        alert(
            getLanguage() === "gr"
            ? "Παρακαλώ συμπλήρωσε όλα τα πεδία."
            : "Please fill in all fields."
        );

        return;

    }



    let result = document.getElementById("contact-result");

    if (result === null) {

        result = document.createElement("p");

        result.id = "contact-result";

        result.style.color = "#16846d";

        document.querySelector("#contact-section form").appendChild(result);

    }

    result.textContent =
        getLanguage() === "gr"
        ? "Η φόρμα συμπληρώθηκε επιτυχώς. Αυτή είναι δοκιμαστική σελίδα και το μήνυμα δεν στάλθηκε."
        : "Your form was completed successfully. This is a demo website, so no message was sent.";

    document.querySelector("#contact-section form").reset();

    document.getElementById("character-count").textContent = "0 / 200";

    document.getElementById("typing-message").textContent = "";

}
