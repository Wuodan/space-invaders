document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', startGame);

let canvas, ctx, player, aliens, bullets, score, lives;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('game-over-screen').style.display = 'none';

    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 50,
        height: 20,
        speed: 5,
        draw: function() {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    aliens = [];
    bullets = [];
    score = 0;
    lives = 3;

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('lives').textContent = `Lives: ${lives}`;

    // Add alien logic here

    // Add bullet logic here

    // Add game loop here
}

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    player.draw();

    // Add alien movement and collision detection here

    // Add bullet movement and collision detection here

    // Check for game over conditions

    // Update score and lives

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Add event listeners for player movement and shooting here