// Game Variables
let score = 0;
let totalBalance = 0;
let gameTime = 30;
let gameInterval;
let lotusCount = 0; // Track number of spawned lotuses
const maxLotusCount = 400; // Maximum lotuses to spawn
const spawnInterval = 75; // Milliseconds between each lotus spawn
const distanceBetweenLotuses = 70; // Minimum distance between lotuses

// Initialize Game Elements
const playButton = document.getElementById('playButton');
const timer = document.getElementById('timer');
const scoreDisplay = document.getElementById('scoreDisplay');
const balanceDisplay = document.getElementById('totalBalance');
const loadingScreen = document.getElementById('loadingScreen');
const dashboard = document.getElementById('dashboard');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const collectedLotuses = document.getElementById('collectedLotuses');
const backToDashboardButton = document.getElementById('backToDashboard');

// Load Dashboard after Loading
window.onload = function () {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }, 2000);
};

// Start Game
playButton.addEventListener('click', startGame);

function startGame() {
    dashboard.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    score = 0;
    scoreDisplay.innerText = 'Score: ' + score;
    gameTime = 30;
    timer.innerText = gameTime;
    lotusCount = 0; // Reset lotus count
    gameInterval = setInterval(gameLoop, 1000);
}

// Game Loop (Updates timer and spawns lotuses)
function gameLoop() {
    gameTime--;
    timer.innerText = gameTime;

    // Spawn lotuses at intervals until we reach the max
    if (lotusCount < maxLotusCount) {
        for (let i = 0; i < 5; i++) { // Spawn 5 lotuses in each interval
            spawnLotus();
        }
    }

    if (gameTime <= 0) {
        endGame();
    }
}

// End Game
function endGame() {
    clearInterval(gameInterval);
    totalBalance += score; // Add score to total balance
    balanceDisplay.innerText = totalBalance; // Update the dashboard balance
    collectedLotuses.innerText = score;

    // Show results screen
    resultsScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}

// Back to Dashboard
backToDashboardButton.addEventListener('click', function () {
    resultsScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
});

// Spawn Lotus
function spawnLotus() {
    const lotus = document.createElement('img');
    lotus.src = 'images/lotus.png';
    lotus.className = 'lotus';
    lotus.style.position = 'absolute';
    lotus.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    lotus.style.top = '-50px';
    lotus.style.transition = "transform 3s linear"; // Time for falling

    // Assign random value to the lotus (2, 3, 4, or 5)
    const lotusValue = Math.floor(Math.random() * 4) + 2; // Random value between 2 and 5
    lotus.dataset.value = lotusValue; // Store the value in a data attribute

    // Ensure minimum distance between lotuses
    const existingLotuses = document.querySelectorAll('.lotus');
    for (const existingLotus of existingLotuses) {
        const existingLeft = parseFloat(existingLotus.style.left);
        if (Math.abs(parseFloat(lotus.style.left) - existingLeft) < distanceBetweenLotuses) {
            lotus.style.left = Math.random() * (window.innerWidth - 50) + 'px'; // Reposition if too close
        }
    }

    // Lotus falls with animation
    setTimeout(() => {
        lotus.style.transform = `translateY(${window.innerHeight}px)`; // Move down
    }, 10);

    // Add to game screen
    gameScreen.appendChild(lotus);
    lotusCount++; // Increment the count of spawned lotuses

    // Increment score on click
    lotus.addEventListener('click', () => {
        const points = parseInt(lotus.dataset.value); // Get the value of the clicked lotus
        score += points; // Update score
        scoreDisplay.innerText = 'Score: ' + score; // Display the updated score

        // Remove lotus from the screen after clicked
        lotus.remove();
        lotusCount--; // Decrement the count of spawned lotuses
    });

    // Remove after animation completes (after falling down)
    setTimeout(() => lotus.remove(), 3000); // Adjust to the fall time
}
