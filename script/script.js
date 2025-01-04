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

// Capture Player's Name
const playerNameInput = document.getElementById('player-name');
let playerName = ''; // Store the player's name

// Handle "Play" Button Click
startBtn.addEventListener('click', () => {
    console.log('Play button clicked.');
    homeSection.style.display = 'none'; // Hide the home section
    setupSection.style.display = 'block'; // Show the setup section
    console.log('Navigated to setup section.');
});

// Handle "How to Play" Button Click
howToPlayBtn.addEventListener('click', () => {
    console.log('How to Play button clicked.');
    landingContent.style.display = 'none'; // Hide Play and How to Play buttons
    instructions.style.display = 'block'; // Show the instructions overlay
    console.log('Instructions displayed.');
});

// Handle "Back" Button Click
backBtn.addEventListener('click', () => {
    console.log('Back button clicked.');
    instructions.style.display = 'none'; // Hide instructions
    landingContent.style.display = 'flex'; // Show Play and How to Play buttons
    console.log('Returned to landing page content.');
});

// Car Selection
carOptions.forEach((car) => {
    car.addEventListener('click', () => {
        // Remove 'selected' class from all cars
        carOptions.forEach((c) => c.classList.remove('selected'));

        // Add 'selected' class to the clicked car
        car.classList.add('selected');

        // Update selectedCar with the car's data-car value
        selectedCar = car.dataset.car;
        console.log(`Car selected: ${selectedCar}`); // Debugging output
    });
});

// Start Game
startGameBtn.addEventListener('click', () => {
    playerName = document.getElementById('player-name').value.trim(); // Get and trim player's name input

    if (!playerName) {
        console.log('Player name is missing.');
        alert('Please enter your name!');
        return;
    }

    if (!selectedCar) {
        console.log('No car selected. Prompting user to select a car.');
        alert('Please select a car!');
        return;
    }

    console.log(`Starting game with player: ${playerName} and car: ${selectedCar}`);
    setupSection.style.display = 'none'; // Hide the setup section
    gameSection.style.display = 'block'; // Show the game section

    // Assign selected car to player
    playerCar.style.backgroundImage = `url('images/vehicles/${selectedCar}.svg')`;

    // Assign random car to AI
    const randomCarIndex = Math.floor(Math.random() * carOptions.length) + 1;
    aiCar.style.backgroundImage = `url('images/vehicles/car-${randomCarIndex}.svg')`;
    console.log(`AI assigned car: car-${randomCarIndex}`);
    
    // Display Player and AI Names
    displayNames();
});


// Display Player and AI Names
function displayNames() {
    const playerNameDisplay = document.createElement('div');
    playerNameDisplay.id = 'player-name-display';
    playerNameDisplay.textContent = `${playerName}`;
    playerCar.appendChild(playerNameDisplay);

    const aiNameDisplay = document.createElement('div');
    aiNameDisplay.id = 'ai-name-display';
    aiNameDisplay.textContent = 'Computer';
    aiCar.appendChild(aiNameDisplay);
}

// Rock Paper Scissors Logic
document.querySelectorAll('.rps-option').forEach((option) => {
    option.addEventListener('click', () => {
        const playerChoice = option.dataset.choice;
        console.log(`Player chose: ${playerChoice}`);

        // AI makes a random choice
        const aiChoices = ['rock', 'paper', 'scissor'];
        const aiChoice = aiChoices[Math.floor(Math.random() * aiChoices.length)];
        console.log(`AI chose: ${aiChoice}`);

        // Determine Winner
        const result = determineWinner(playerChoice, aiChoice);
        if (result === 'player') {
            playerWins++;
            console.log('Player wins this round!');
            moveCar(playerCar, playerWins);
        } else if (result === 'ai') {
            aiWins++;
            console.log('AI wins this round!');
            moveCar(aiCar, aiWins);
        } else {
            console.log('This round is a tie.');
        }

        // Check if there's a winner
        checkForWinner();
    });
});

// Determine Winner Function
function determineWinner(player, ai) {
    if (player === ai) {
        console.log('It\'s a tie!');
        return 'tie';
    }
    if (
        (player === 'rock' && ai === 'scissor') ||
        (player === 'paper' && ai === 'rock') ||
        (player === 'scissor' && ai === 'paper')
    ) {
        console.log('Player wins the comparison.');
        return 'player';
    }
    console.log('AI wins the comparison.');
    return 'ai';
}

// Move Car Forward
function moveCar(car, wins) {
    car.style.left = `${10 + wins * 8}%`; // Move car forward based on wins
    console.log(`${car.id} moved forward to ${10 + wins * 8}%.`);
}

// Check for Winner
function checkForWinner() {
    if (playerWins === 10) {
        console.log('Player has reached 10 wins!');
        alert('Congratulations! You win the race!');
        resetGame();
    } else if (aiWins === 10) {
        console.log('AI has reached 10 wins!');
        alert('AI wins the race. Better luck next time!');
        resetGame();
    }
}

// Reset Game
function resetGame() {
    console.log('Game is resetting.');
    location.reload(); // Reload the page to reset the game
}