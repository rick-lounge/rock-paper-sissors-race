// Buttons and Sections
const startBtn = document.getElementById('start-btn');
const howToPlayBtn = document.getElementById('how-to-play-btn');
const backBtn = document.getElementById('back-btn');
const landingContent = document.getElementById('landing-content');
const instructions = document.getElementById('instructions');
const homeSection = document.getElementById('home');
const setupSection = document.getElementById('setup');
const gameSection = document.getElementById('game');

// Car Selection and Game State
const carOptions = document.querySelectorAll('.car-option');
const startGameBtn = document.getElementById('start-game');
const playerCar = document.getElementById('player-car');
const aiCar = document.getElementById('ai-car');
let selectedCar = null; 
let playerWins = 0;
let aiWins = 0;

// Total sets for the game
const totalSets = 10;

// Capture Player's Name
const playerNameInput = document.getElementById('player-name');
let playerName = ''; 

// RPS Options and State
const rpsOptions = document.querySelectorAll('.rps-option');
let playerChoice = null; 
let aiChoice = null;

// Hands Display
const playerHandDisplay = document.createElement('img');
const aiHandDisplay = document.createElement('img');
playerHandDisplay.id = 'player-hand-display';
aiHandDisplay.id = 'ai-hand-display';

// Sound Effects
const clickSound = new Audio('sounds/click.mp3');
const homeBgSound = new Audio('sounds/home-bg.mp3');
const victorySound = new Audio('sounds/victory.mp3');
const gameOverSound = new Audio('sounds/game-over.mp3');

// Set home background sound to loop
homeBgSound.loop = true;

// Play background sound on homepage load
homeBgSound.play();

// Handle "Play" Button Click
startBtn.addEventListener('click', () => {
    clickSound.play();
    homeBgSound.pause(); 
    homeSection.style.display = 'none'; 
    setupSection.style.display = 'block';
});

// Handle "How to Play" Button Click
howToPlayBtn.addEventListener('click', () => {
    clickSound.play();
    landingContent.style.display = 'none'; 
    instructions.style.display = 'block'; 
});

// Handle "Back" Button Click
backBtn.addEventListener('click', () => {
    clickSound.play();
    instructions.style.display = 'none'; 
    landingContent.style.display = 'flex';
});

// Car Selection
carOptions.forEach((car) => {
    car.addEventListener('click', () => {
        clickSound.play();
        carOptions.forEach((c) => c.classList.remove('selected'));
        car.classList.add('selected');
        selectedCar = car.dataset.car; 
    });
});

// Start Game
startGameBtn.addEventListener('click', () => {
    clickSound.play();
    playerName = playerNameInput.value.trim();

    if (!playerName) {
        showSetupMessage('Please enter your name!', setupSection);
        return;
    }
    if (!selectedCar) {
        showSetupMessage('Please select a car!', setupSection);
        return;
    }

    setupSection.style.display = 'none'; 
    gameSection.style.display = 'block'; 

    // Assign selected car to player
    playerCar.style.backgroundImage = `url('images/vehicles/${selectedCar}.svg')`;

    // Assign random car to AI
    let randomCarIndex;
    do {
        randomCarIndex = Math.floor(Math.random() * carOptions.length) + 1;
    } while (`car-${randomCarIndex}` === selectedCar);
    
    aiCar.style.backgroundImage = `url('images/vehicles/car-${randomCarIndex}.svg')`;

    displayNames();
});

// Show Setup Message
function showSetupMessage(message, container) {
    if (document.getElementById('setup-message')) return;

    const messageDiv = document.createElement('div');
    messageDiv.id = 'setup-message';
    messageDiv.textContent = message;
    container.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Display Player and AI Names
function displayNames() {
    const playerNameDisplay = document.createElement('div');
    playerNameDisplay.id = 'player-name-display';
    playerNameDisplay.textContent = playerName;
    playerCar.appendChild(playerNameDisplay);

    const aiNameDisplay = document.createElement('div');
    aiNameDisplay.id = 'ai-name-display';
    aiNameDisplay.textContent = 'Computer';
    aiCar.appendChild(aiNameDisplay);
}

// RPS Choice Handling
rpsOptions.forEach((option) => {
    option.addEventListener('click', () => {
        clickSound.play();
        rpsOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');
        playerChoice = option.dataset.choice;

        processRPSRound();
    });
});

// Process RPS Round
function processRPSRound() {
    const aiChoices = ['rock', 'paper', 'scissor'];
    aiChoice = aiChoices[Math.floor(Math.random() * aiChoices.length)];

    displayChosenHands();

    const result = determineWinner(playerChoice, aiChoice);
    if (result === 'player') {
        playerWins++;
        moveCar(playerCar, playerWins);
    } else if (result === 'ai') {
        aiWins++;
        moveCar(aiCar, aiWins);
    }

    checkForWinner();

    setTimeout(() => {
        resetHandsDisplay();
        rpsOptions.forEach((opt) => opt.classList.remove('selected'));
        playerChoice = null;
        aiChoice = null;
    }, 2000);
}

// Display Chosen Hands
function displayChosenHands() {
    const chosenHandsContainer = document.getElementById('race-track');
    playerHandDisplay.src = `images/choices/${playerChoice}-left.png`;
    aiHandDisplay.src = `images/choices/${aiChoice}-right.png`;
    playerHandDisplay.className = 'big-hand';
    aiHandDisplay.className = 'big-hand';
    chosenHandsContainer.appendChild(playerHandDisplay);
    chosenHandsContainer.appendChild(aiHandDisplay);
}

// Reset Hands Display
function resetHandsDisplay() {
    playerHandDisplay.remove();
    aiHandDisplay.remove();
}

// Determine Winner Function
function determineWinner(player, ai) {
    if (player === ai) return 'tie';
    if (
        (player === 'rock' && ai === 'scissor') ||
        (player === 'paper' && ai === 'rock') ||
        (player === 'scissor' && ai === 'paper')
    ) {
        return 'player';
    }
    return 'ai';
}

// Move Car Forward
function moveCar(car, wins) {
    const percentage = 10 + wins * 8;
    car.style.left = `${percentage}%`;
}

// Check for Winner
function checkForWinner() {
    if (playerWins === totalSets) {
        victorySound.play();
        setTimeout(() => {
            moveCar(playerCar, totalSets + 1);
            displayWinnerMessage(`${playerName} has won the race!`);
        }, 1000);
    } else if (aiWins === totalSets) {
        gameOverSound.play();
        setTimeout(() => {
            moveCar(aiCar, totalSets + 1);
            displayWinnerMessage('Computer has won the race!');
        }, 1000);
    }
}

// Display Winner Message
function displayWinnerMessage(message) {
    resetHandsDisplay();

    const gameSection = document.getElementById('game');
    const winnerMessage = document.createElement('div');
    winnerMessage.id = 'winner-message';
    winnerMessage.textContent = message;
    gameSection.appendChild(winnerMessage);

    setTimeout(() => {
        resetGame();
    }, 5000);
}

// Reset Game
function resetGame() {
    location.reload();
}