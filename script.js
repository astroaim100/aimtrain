const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const difficultySelect = document.getElementById("difficulty");

let score = 0;
let timeLeft = 15;
let countdownInterval, disappearTime = 2000;
let gameRunning = false;

function spawnTarget() {
    if (!gameRunning) return;

    disappearTime = parseInt(difficultySelect.value);

    const target = document.createElement("div");
    target.classList.add("target");

    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    gameArea.appendChild(target);

    let disappearTimeout = setTimeout(() => {
        if (gameRunning && gameArea.contains(target)) {
            target.remove();
            spawnTarget();
        }
    }, disappearTime);

    target.addEventListener("click", () => {
        if (gameRunning) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            clearTimeout(disappearTimeout);
            target.remove();
            spawnTarget();
        }
    });
}

function startGame() {
    score = 0;
    timeLeft = 15;
    scoreDisplay.innerText = `Score: 0`;
    timeDisplay.innerText = `Time Left: ${timeLeft}s`;
    gameArea.innerHTML = "";
    gameRunning = true;

    startBtn.disabled = true;
    stopBtn.disabled = false;

    spawnTarget();

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        if (gameRunning) {
            timeLeft--;
            timeDisplay.innerText = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                stopGame();
            }
        }
    }, 1000);
}

function stopGame() {
    clearInterval(countdownInterval);
    gameRunning = false;
    alert(`Game Over! Your score: ${score}`);
    gameArea.innerHTML = "";

    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
