let studies = [];
let tasks = [];
let savedNotes = "";
let timerRunning = false;

$(document).ready(function() {
    $("#brand-title").mouseenter(function() {
        document.getElementById("brand-title").innerHTML = "✦ Stay Focused!";
    });

    $("#brand-title").mouseleave(function() {
        document.getElementById("brand-title").innerHTML = "✦ StudyPlanner";
    });

    $("#contact-message").keydown(function() {
        $("#typing-message").show();
    });

    $("#contact-message").keyup(function() {
        let message = document.getElementById("contact-message").value;
        document.getElementById("character-count").innerHTML =
            message.length + " / 200";
    });
});

function getLanguage() {
    return document.getElementById("language").value;
}

function setText(id, english, greek) {
    if (getLanguage() == "gr") {
        document.getElementById(id).innerHTML = greek;
    }
    else {
        document.getElementById(id).innerHTML = english;
    }
}

function changeLanguage() {
    let language = getLanguage();

    if (language == "") {
        return;
    }

    setText("welcome", "Your semester, organized.", "Οργάνωσε το εξάμηνό σου.");
    setText("description", "Plan smarter, track your progress and keep everything in one place.", "Οργάνωσε τη μελέτη σου και παρακολούθησε την πρόοδό σου.");
    setText("signup-title", "Create Your Account", "Δημιουργία Λογαριασμού");
    setText("signup-description", "Your university journey starts here.", "Το πανεπιστημιακό σου ταξίδι ξεκινά εδώ.");
    setText("name-label", "First Name", "Όνομα");
    setText("surname-label", "Surname", "Επώνυμο");
    setText("university-label", "University", "Πανεπιστήμιο");
    setText("birthday-label", "Date of Birth", "Ημερομηνία Γέννησης");
    setText("email-label", "Email", "Email");
    setText("signup-button", "Enter My Workspace", "Είσοδος στον Χώρο μου");

    setText("dashboard-menu", "Dashboard", "Αρχική");
    setText("planner-menu", "My Planner", "Το Πρόγραμμά μου");
    setText("task-menu", "To-Do List", "Λίστα Εργασιών");
    setText("notes-menu", "Study Notes", "Σημειώσεις Μελέτης");
    setText("timer-menu", "Study Timer", "Χρονόμετρο Μελέτης");
    setText("contact-menu", "Contact Us", "Επικοινωνία");

    setText("hero-title", "Make today count.", "Αξιοποίησε τη σημερινή μέρα.");
    setText("hero-description", "Small steps, big progress. Your semester starts here.", "Μικρά βήματα, μεγάλη πρόοδος.");
    setText("hero-button", "Plan a Study Session →", "Προγραμμάτισε Μελέτη →");
    setText("overview-title", "My Dashboard", "Ο Πίνακάς μου");
    setText("task-stat-title", "To-Do Tasks", "Εργασίες");
    setText("study-stat-title", "Study Sessions", "Συνεδρίες Μελέτης");
    setText("completed-stat-title", "Completed Tasks", "Ολοκληρωμένες Εργασίες");
    setText("dashboard-upcoming-title", "Upcoming Sessions", "Προγραμματισμένες Μελέτες");

    setText("tips-title", "Study Tips", "Συμβουλές Μελέτης");
    setText("tip-heading", "Tip", "Συμβουλή");
    setText("description-heading", "Description", "Περιγραφή");
    setText("tip-one", "Planning", "Πρόγραμμα");
    setText("tip-one-description", "Organize your study time.", "Οργάνωσε τον χρόνο μελέτης σου.");
    setText("tip-two", "Breaks", "Διαλείμματα");
    setText("tip-two-description", "Take regular short breaks.", "Κάνε τακτικά μικρά διαλείμματα.");

    setText("planner-title", "My Planner", "Το Πρόγραμμά μου");
    setText("planner-description", "Organize your study sessions.", "Οργάνωσε τις συνεδρίες μελέτης σου.");
    setText("new-study-title", "New Study Session", "Νέα Συνεδρία Μελέτης");
    setText("subject-label", "Subject", "Μάθημα");
    setText("study-date-label", "Date", "Ημερομηνία");
    setText("study-time-label", "Time", "Ώρα");
    setText("add-study-button", "Add Study Session", "Προσθήκη Μελέτης");
    setText("upcoming-title", "Upcoming Sessions", "Προγραμματισμένες Μελέτες");

    setText("tasks-title", "To-Do List", "Λίστα Εργασιών");
    setText("tasks-description", "Stay on top of your assignments.", "Οργάνωσε τις εργασίες σου.");
    setText("new-task-title", "Add a Task", "Προσθήκη Εργασίας");
    setText("task-label", "New Task", "Νέα Εργασία");
    setText("add-task-button", "Add Task", "Προσθήκη Εργασίας");
    setText("my-tasks-title", "My Tasks", "Οι Εργασίες μου");

    setText("notes-title", "Study Notes", "Σημειώσεις Μελέτης");
    setText("notes-description", "Write and organize your notes.", "Γράψε και οργάνωσε τις σημειώσεις σου.");
    setText("notebook-title", "My Notebook", "Το Σημειωματάριό μου");
    setText("save-notes-button", "Save Notes", "Αποθήκευση Σημειώσεων");

    setText("timer-title", "Study Timer", "Χρονόμετρο Μελέτης");
    setText("timer-description", "Focus on your study goals.", "Συγκεντρώσου στους στόχους σου.");
    setText("focus-title", "Focus Session", "Ώρα Μελέτης");
    setText("minutes-label", "Study Minutes", "Λεπτά Μελέτης");
    setText("start-button", "Start", "Έναρξη");

    setText("contact-title", "Contact Us", "Επικοινωνία");
    setText("contact-description", "Have a question or suggestion? Contact us.", "Έχεις κάποια ερώτηση ή πρόταση; Επικοινώνησε μαζί μας.");
    setText("contact-name-label", "Name", "Όνομα");
    setText("contact-email-label", "Email", "Email");
    setText("contact-phone-label", "Telephone Number", "Αριθμός Τηλεφώνου");
    setText("contact-message-label", "Message", "Μήνυμα");
    setText("send-button", "Send Message", "Αποστολή Μηνύματος");

    if (language == "gr") {
        document.getElementById("new-task").placeholder = "Πρόσθεσε μια εργασία";
        document.getElementById("study-notes").placeholder = "Γράψε τις σημειώσεις σου...";
        document.getElementById("university").options[0].text = "Επίλεξε πανεπιστήμιο";
    }
    else {
        document.getElementById("new-task").placeholder = "Enter a task";
        document.getElementById("study-notes").placeholder = "Write your notes here...";
        document.getElementById("university").options[0].text = "Select your university";
    }

    document.getElementById("language-box").style.display = "none";

    renderStudies();
    renderTasks();
}

function signUp(event) {
    event.preventDefault();

    let name = document.getElementById("first-name").value;
    let surname = document.getElementById("surname").value;
    let university = document.getElementById("university").value;

    if (getLanguage() == "gr") {
        document.getElementById("student-welcome").innerHTML =
            "Καλώς ήρθες, " + name + "!";
    }
    else {
        document.getElementById("student-welcome").innerHTML =
            "Welcome, " + name + "!";
    }

    document.getElementById("profile-name").textContent =
        name + " " + surname;

    document.getElementById("profile-university").textContent =
        university;

    $("#welcome-section").hide();
    $("#student-page").show();
    $("#language-box").hide();

    showSection("dashboard-section");
}

function showSection(sectionId) {
    $(".feature-section").hide();
    $("#" + sectionId).show();

    document.getElementById("nav-dashboard").className = "nav-item";
    document.getElementById("nav-planner").className = "nav-item";
    document.getElementById("nav-task").className = "nav-item";
    document.getElementById("nav-notes").className = "nav-item";
    document.getElementById("nav-timer").className = "nav-item";
    document.getElementById("nav-contact").className = "nav-item";

    if (sectionId == "dashboard-section") {
        document.getElementById("nav-dashboard").className = "nav-item active";
    }
    else if (sectionId == "planner-section") {
        document.getElementById("nav-planner").className = "nav-item active";
    }
    else if (sectionId == "task-section") {
        document.getElementById("nav-task").className = "nav-item active";
    }
    else if (sectionId == "notes-section") {
        document.getElementById("nav-notes").className = "nav-item active";
    }
    else if (sectionId == "timer-section") {
        document.getElementById("nav-timer").className = "nav-item active";
    }
    else {
        document.getElementById("nav-contact").className = "nav-item active";
    }
}

function safeText(value) {
    let result = "";

    for (let i = 0; i < value.length; i++) {
        if (value[i] == "&") {
            result += "&amp;";
        }
        else if (value[i] == "<") {
            result += "&lt;";
        }
        else if (value[i] == ">") {
            result += "&gt;";
        }
        else if (value[i] == '"') {
            result += "&quot;";
        }
        else if (value[i] == "'") {
            result += "&#39;";
        }
        else {
            result += value[i];
        }
    }

    return result;
}

function addStudy(event) {
    event.preventDefault();

    let subject = document.getElementById("subject").value;
    let date = document.getElementById("study-date").value;
    let time = document.getElementById("study-time").value;

    studies.push({
        subject: subject,
        date: date,
        time: time
    });

    renderStudies();
    event.target.reset();
}

function renderStudies() {
    let html = "";
    let dashboardHtml = "";

    for (let i = 0; i < studies.length; i++) {
        let session = safeText(studies[i].subject) + " | " +
                      safeText(studies[i].date) + " | " +
                      safeText(studies[i].time);

        let deleteLabel = "Delete";

        if (getLanguage() == "gr") {
            deleteLabel = "Διαγραφή";
        }

        html += "<li>" + session +
                ' <button onclick="deleteStudy(' + i + ')">' +
                deleteLabel + "</button></li>";

        dashboardHtml += "<li>" + session + "</li>";
    }

    document.getElementById("study-list").innerHTML = html;
    document.getElementById("dashboard-study-list").innerHTML = dashboardHtml;
    document.getElementById("study-count").innerHTML = studies.length;
}

function deleteStudy(index) {
    let newStudies = [];

    for (let i = 0; i < studies.length; i++) {
        if (i != index) {
            newStudies.push(studies[i]);
        }
    }

    studies = newStudies;
    renderStudies();
}

function addTask(event) {
    event.preventDefault();

    let task = document.getElementById("new-task").value;

    tasks.push({
        text: task,
        completed: false
    });

    renderTasks();
    event.target.reset();
}

function renderTasks() {
    let html = "";
    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        let taskClass = "";
        let completeLabel = "Complete";
        let deleteLabel = "Delete";

        if (getLanguage() == "gr") {
            completeLabel = "Ολοκλήρωση";
            deleteLabel = "Διαγραφή";
        }

        if (tasks[i].completed == true) {
            taskClass = "completed";
            completed++;
        }

        html += '<li><span class="' + taskClass + '">' +
                safeText(tasks[i].text) + "</span>" +
                ' <button onclick="completeTask(' + i + ')">' +
                completeLabel + "</button>" +
                ' <button onclick="deleteTask(' + i + ')">' +
                deleteLabel + "</button></li>";
    }

    document.getElementById("task-list").innerHTML = html;
    document.getElementById("task-count").innerHTML = tasks.length;
    document.getElementById("completed-count").innerHTML = completed;
}

function completeTask(index) {
    if (tasks[index].completed == true) {
        tasks[index].completed = false;
    }
    else {
        tasks[index].completed = true;
    }

    renderTasks();
}

function deleteTask(index) {
    let newTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if (i != index) {
            newTasks.push(tasks[i]);
        }
    }

    tasks = newTasks;
    renderTasks();
}

function saveNotes() {
    savedNotes = document.getElementById("study-notes").value;

    if (getLanguage() == "gr") {
        document.getElementById("notes-message").innerHTML =
            "Οι σημειώσεις κρατήθηκαν για αυτή τη συνεδρία!";
    }
    else {
        document.getElementById("notes-message").innerHTML =
            "Notes kept for this session!";
    }
}



let timerInterval = null;
let secondsLeft = 25 * 60;
let totalSeconds = 25 * 60;

function updateTimerDisplay() {

    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById("timer-display").innerHTML =
        minutes + ":" + seconds;

    let progress = (secondsLeft / totalSeconds) * 100;

    document.getElementById("timer-circle").style.background =
        "conic-gradient(#6366f1 " + progress +
        "%, #e5e7eb " + progress + "%)";
}

function startTimer() {

    if (timerInterval != null) {
        return;
    }

    if (secondsLeft == 0) {
        resetTimer();
    }

    timerInterval = setInterval(function() {

        secondsLeft = secondsLeft - 1;
        updateTimerDisplay();

        if (secondsLeft <= 0) {
            pauseTimer();

            if (getLanguage() == "gr") {
                window.alert("Ο χρόνος μελέτης τελείωσε!");
            }
            else {
                window.alert("Study time is over!");
            }
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {

    pauseTimer();

    let minutes = Number(
        document.getElementById("timer-minutes").value
    );

    if (!Number.isInteger(minutes) ||
        minutes < 1 || minutes > 180) {

        if (getLanguage() == "gr") {
            window.alert("Επίλεξε από 1 έως 180 λεπτά.");
        }
        else {
            window.alert("Choose between 1 and 180 minutes.");
        }

        minutes = 25;
        document.getElementById("timer-minutes").value = 25;
    }

    totalSeconds = minutes * 60;
    secondsLeft = totalSeconds;

    updateTimerDisplay();
}


function sendContact(event) {
    event.preventDefault();

    if (getLanguage() == "gr") {
        window.alert("Το μήνυμα ελέγχθηκε! Δεν έχει συνδεθεί ακόμη υπηρεσία αποστολής.");
    }
    else {
        window.alert("Message validated! No sending service is connected yet.");
    }

    event.target.reset();

    document.getElementById("character-count").innerHTML = "0 / 200";
    document.getElementById("typing-message").innerHTML = "";
}
