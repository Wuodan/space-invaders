document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', startGame);

let score, lives;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('game-over-screen').style.display = 'none';

    // canvas variable is removed as it is not used

    // player object is removed as it is not used

    // aliens and bullets arrays are removed as they are not used
    score = 0;
    lives = 3;

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('lives').textContent = `Lives: ${lives}`;

    // Add alien logic here

    // Add bullet logic here

    // Add game loop here
}

// gameLoop function is removed as it is not used

// Add event listeners for player movement and shooting here