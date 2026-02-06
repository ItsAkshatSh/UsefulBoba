lucide.createIcons();

function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    if (hour < 5) greeting.textContent = "Night Owl";
    else if (hour < 12) greeting.textContent = "Good Morning";
    else if (hour < 17) greeting.textContent = "Good Afternoon";
    else greeting.textContent = "Good Evening";
}
updateGreeting();

let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let timerId = null;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const progressRing = document.getElementById('progress-ring');
const playBtn = document.getElementById('play-btn');
const body = document.body;

const radius = 180;
const circumference = 2 * Math.PI * radius;

progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = 0;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - Focus`;

    const percent = (timeLeft / totalTime) * 100;
    setProgress(percent);
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        playBtn.innerHTML = '<i data-lucide="play" width="16"></i> Resume';
        lucide.createIcons();
        isRunning = false;
        progressRing.style.opacity = "0.7";
    } else {
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                playBtn.innerHTML = 'Cycle Complete';
            }
        }, 1000);
        playBtn.innerHTML = '<i data-lucide="pause" width="16"></i> Pause';
        lucide.createIcons();
        isRunning = true;
        progressRing.style.opacity = "1";
    }
}

function resetTimer() {
    clearInterval(timerId);
    timeLeft = 25 * 60;
    isRunning = false;
    playBtn.innerHTML = '<i data-lucide="play" width="16"></i> Start Focus';
    lucide.createIcons();
    updateDisplay();
    document.title = "Focus Flow";
    progressRing.style.opacity = "1";
}

function addTask() {
    const list = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox">
        <span class="todo-text" contenteditable="true">New Task</span>
        <button class="delete-btn" onclick="this.parentElement.remove()"><i data-lucide="x" width="14"></i></button>
    `;
    list.appendChild(li);
    lucide.createIcons();

    const span = li.querySelector('.todo-text');
    span.focus();

    span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            span.blur();
        }
    });
}

const notepad = document.getElementById('notepad');
if (localStorage.getItem('dashboard_notes')) {
    notepad.value = localStorage.getItem('dashboard_notes');
}
notepad.addEventListener('input', (e) => {
    localStorage.setItem('dashboard_notes', e.target.value);
});
