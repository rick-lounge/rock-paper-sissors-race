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
let selectedCar = null; // Stores the player's selected car
let playerWins = 0;
let aiWins = 0;

// Total sets for the game
const totalSets = 10;

// Capture Player's Name
const playerNameInput = document.getElementById('player-name');
let playerName = ''; // Store the player's name

// RPS Options and State
const rpsOptions = document.querySelectorAll('.rps-option');
let playerChoice = null; // Stores the player's choice
let aiChoice = null; // Stores the AI's choice

// Hands Display
const playerHandDisplay = document.createElement('img');
const aiHandDisplay = document.createElement('img');
playerHandDisplay.id = 'player-hand-display';
aiHandDisplay.id = 'ai-hand-display';

// Handle "Play" Button Click
startBtn.addEventListener('click', () => {
    homeSection.style.display = 'none'; // Hide the home section
    setupSection.style.display = 'block'; // Show the setup section
});

// Handle "How to Play" Button Click
howToPlayBtn.addEventListener('click', () => {
    landingContent.style.display = 'none'; // Hide Play and How to Play buttons
    instructions.style.display = 'block'; // Show the instructions overlay
});

// Handle "Back" Button Click
backBtn.addEventListener('click', () => {
    instructions.style.display = 'none'; // Hide instructions
    landingContent.style.display = 'flex'; // Show Play and How to Play buttons
});

// Car Selection
carOptions.forEach((car) => {
    car.addEventListener('click', () => {
        carOptions.forEach((c) => c.classList.remove('selected'));
        car.classList.add('selected');
        selectedCar = car.dataset.car; // Update selectedCar
    });
});

// Start Game
startGameBtn.addEventListener('click', () => {
    playerName = playerNameInput.value.trim(); // Get and trim player's name input

    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    if (!selectedCar) {
        alert('Please select a car!');
        return;
    }

    setupSection.style.display = 'none'; // Hide the setup section
    gameSection.style.display = 'block'; // Show the game section

    // Assign selected car to player
    playerCar.style.backgroundImage = `url('images/vehicles/${selectedCar}.svg')`;

    // Assign random car to AI
    const randomCarIndex = Math.floor(Math.random() * carOptions.length) + 1;
    aiCar.style.backgroundImage = `url('images/vehicles/car-${randomCarIndex}.svg')`;

    displayNames();
});

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
        rpsOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');
        playerChoice = option.dataset.choice; // Store the player's choice

        processRPSRound();
    });
});

// Process RPS Round
function processRPSRound() {
    // AI makes a random choice
    const aiChoices = ['rock', 'paper', 'scissor'];
    aiChoice = aiChoices[Math.floor(Math.random() * aiChoices.length)];

    displayChosenHands();

    // Determine Winner
    const result = determineWinner(playerChoice, aiChoice);
    if (result === 'player') {
        playerWins++;
        moveCar(playerCar, playerWins);
    } else if (result === 'ai') {
        aiWins++;
        moveCar(aiCar, aiWins);
    }

    checkForWinner();

    // Reset choices for the next round
    setTimeout(() => {
        resetHandsDisplay();
        rpsOptions.forEach((opt) => opt.classList.remove('selected'));
        playerChoice = null;
        aiChoice = null;
    }, 2000); // Add a delay before resetting for better visual feedback
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
    const percentage = 10 + wins * 8; // Cap movement at 100%
    car.style.left = `${percentage}%`; // Move car forward
}

// Check for Winner
function checkForWinner() {
    if (playerWins === totalSets) {
        setTimeout(() => {
            moveCar(playerCar, totalSets + 1); // Move one step past the finish line
            displayWinnerMessage(`${playerName} has won the race!`);
        }, 1000);
    } else if (aiWins === totalSets) {
        setTimeout(() => {
            moveCar(aiCar, totalSets + 1); // Move one step past the finish line
            displayWinnerMessage('Computer has won the race!');
        }, 1000);
    }
}

// Display Winner Message
function displayWinnerMessage(message) {
    // Remove chosen hands
    resetHandsDisplay();

    // Create and display the winner message
    const gameSection = document.getElementById('game');
    const winnerMessage = document.createElement('div');
    winnerMessage.id = 'winner-message';
    winnerMessage.textContent = message;
    
    gameSection.appendChild(winnerMessage);

    // Restart game after a delay
    setTimeout(() => {
        resetGame();
    }, 5000); // 5-second delay before resetting
}

// Reset Game
function resetGame() {
    location.reload(); // Reload the page to reset the game
}