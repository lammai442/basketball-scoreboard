let homePoints = 0;
let guestPoints = 0;
let seconds = 60;
let minutes = 12;
let timer = null;

const timeSecondsRef = document.querySelector('#timeSeconds');

const timeMinutes = document.querySelector('#timeMinutes');

const homePointsRef = document.querySelector('#homePoints');

const guestPointsRef = document.querySelector('#guestPoints');

const incramentOneRef = document.querySelectorAll('[data-id = "incramentOne"]');

const incramentTwoRef = document.querySelectorAll('[data-id = "incramentTwo"]');

const incramentThreeRef = document.querySelectorAll('[data-id = "incramentThree"]');

const newGameBtnRef = document.querySelector('#newGameBtn');

const pauseGameBtnRef = document.querySelector('#pauseGameBtn');

init();

function init() {
    incramentOne();
    incramentTwo();
    incramentThree();
    newGame();
    startGame();
    pauseGame();
}
function startGame() {
    const startBtnRef = document.querySelector('#startBtn');

    startBtnRef.addEventListener('click', () => {
        if (!timer) {
            seconds = 59;
            timeSecondsRef.textContent = seconds;
            minutes--;
            timeMinutes.textContent = minutes.toString().padStart(2, '0');
            timeCount();
        }
    });
}

function timeCount() {
    timer = setInterval(() => {
        seconds--;
        timeSecondsRef.textContent = seconds.toString().padStart(2, '0');
        if (seconds === 0) {
            seconds = 60;
            minutes--;
            timeMinutes.textContent = minutes.toString().padStart(2, '0');
            if (minutes === 0) {
                clearInterval(timer);
                minutes = 12;
                seconds = 60;
                timeMinutes.textContent = '12';
                timeSecondsRef.textContent = '00';
            }
        }
    }, 1000);
}

function pauseGame() {
    pauseGameBtnRef.addEventListener('click', () => {
        if (timer) {
            if (pauseGameBtnRef.textContent === 'Pause game') {
                clearInterval(timer);
                pauseGameBtnRef.textContent = 'Resume game';
                pauseGameBtnRef.classList.toggle('resume-btn');
            } else if (pauseGameBtnRef.textContent === 'Resume game') {
                pauseGameBtnRef.textContent = 'Pause game';
                pauseGameBtnRef.classList.toggle('resume-btn');
                timeCount();
            }
        }
    });
}

function incramentOne() {
    // A loop because there are two buttons in the array
    incramentOneRef.forEach((button) => {
        // Find the parent element of the button
        const parentScoreSection = button.closest('.score');
        // Find the element which hold title of Home/Guest
        const subtitle = parentScoreSection.querySelector('.score__subtitle').textContent;

        button.addEventListener('click', () => {
            if (subtitle.includes('HOME')) {
                homePoints++;
                homePointsRef.textContent = homePoints;
            } else if (subtitle.includes('GUEST')) {
                guestPoints++;
                guestPointsRef.textContent = guestPoints;
            }
            highlightLeader();
        });
    });
}

function incramentTwo() {
    // A loop because there are two buttons in the array
    incramentTwoRef.forEach((button) => {
        // Find the parent element of the button
        const parentScoreSection = button.closest('.score');
        // Find the element which hold title of Home/Guest
        const subtitle = parentScoreSection.querySelector('.score__subtitle').textContent;

        button.addEventListener('click', () => {
            if (subtitle.includes('HOME')) {
                homePoints += 2;
                homePointsRef.textContent = homePoints;
            } else if (subtitle.includes('GUEST')) {
                guestPoints += 2;
                guestPointsRef.textContent = guestPoints;
            }
            highlightLeader();
        });
    });
}

function incramentThree() {
    // A loop because there are two buttons in the array
    incramentThreeRef.forEach((button) => {
        // Find the parent element of the button
        const parentScoreSection = button.closest('.score');
        // Find the element which hold title of Home/Guest
        const subtitle = parentScoreSection.querySelector('.score__subtitle').textContent;

        button.addEventListener('click', () => {
            if (subtitle.includes('HOME')) {
                homePoints += 3;
                homePointsRef.textContent = homePoints;
            } else if (subtitle.includes('GUEST')) {
                guestPoints += 3;
                guestPointsRef.textContent = guestPoints;
            }
            highlightLeader();
        });
    });
}

function newGame() {
    newGameBtnRef.addEventListener('click', () => {
        homePoints = 0;
        guestPoints = 0;

        homePointsRef.textContent = 0;
        guestPointsRef.textContent = 0;

        highlightLeader();
        stopInterval();
        timer = null;
        seconds = 60;

        if (pauseGameBtnRef.classList.contains('resume-btn')) {
            pauseGameBtnRef.classList.remove('resume-btn');
            pauseGameBtnRef.textContent = 'Pause game';
        }
    });
}

function highlightLeader() {
    const homeBoxRef = document.querySelector('#homeBox');
    const guestBoxRef = document.querySelector('#guestBox');

    if (homePoints > guestPoints) {
        guestBoxRef.style.border = '';
        guestBoxRef.style.boxSizing = '';
        homeBoxRef.style.border = '2px solid #f3b202';
        homeBoxRef.style.boxSizing = 'border-box';
    } else if (homePoints < guestPoints) {
        homeBoxRef.style.border = '';
        homeBoxRef.style.boxSizing = '';
        guestBoxRef.style.border = '2px solid #f3b202';
        guestBoxRef.style.boxSizing = 'border-box';
    } else if (homePoints === guestPoints) {
        homeBoxRef.style.border = '';
        homeBoxRef.style.boxSizing = '';
        guestBoxRef.style.border = '';
        guestBoxRef.style.boxSizing = '';
    }
}

function stopInterval() {
    clearInterval(timer);
    seconds = 0;
    minutes = 12;
    timeSecondsRef.textContent = seconds.toString().padStart(2, '0');
    timeMinutes.textContent = minutes.toString().padStart(2, '0');
}
