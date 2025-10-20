//Player.js - Player Control Logic for Space Invaders

class PlayerController {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.playerId = null;
    this.lastShotTime = 0;
    this.shootCooldown = 200; // ms between shots
  }

  // Initialize player
  init(canvasWidth, canvasHeight) {
    const startX = canvasWidth / 2;
    const startY = canvasHeight - 50;

    const playerEntity = EntityBuilder.player(startX, startY);
    this.playerId = this.entityManager.create('player', startX, startY, playerEntity);

    return this.playerId;
  }

  // Update player based on input
  update(inputState, deltaTime) {
    const player = this.entityManager.get(this.playerId);
    if (!player || !player.active) return;

    // Handle movement
    this.updateMovement(player, inputState, deltaTime);

    // Handle shooting
    this.updateShooting(player, inputState);

    // Update player entity
    this.entityManager.update(this.playerId, player);
  }

  // Handle player movement
  updateMovement(player, inputState, deltaTime) {
    const speed = player.speed; // pixels per second
    let deltaX = 0;

    if (inputState.left) {
      deltaX -= speed * deltaTime / 1000;
    }
    if (inputState.right) {
      deltaX += speed * deltaTime / 1000;
    }

    // Apply movement
    player.x += deltaX;

    // Clamp to screen bounds (assuming 640px wide game area)
    const margin = 10;
    player.x = Math.max(margin, Math.min(640 - margin - player.width, player.x));
  }

  // Handle player shooting
  updateShooting(player, inputState) {
    const now = Date.now();

    if (inputState.fire && (now - this.lastShotTime) > this.shootCooldown) {
      this.shoot(player);
      this.lastShotTime = now;
    }
  }

  // Shoot bullet
  shoot(player) {
    const bulletX = player.x + player.width / 2 - 1; // Center the bullet
    const bulletY = player.y - 5; // Start above player

    const bulletEntity = EntityBuilder.bullet(bulletX, bulletY, false); // false = not enemy bullet
    this.entityManager.create('bullet', bulletX, bulletY, bulletEntity);
  }

  // Get player entity
  getPlayer() {
    return this.entityManager.get(this.playerId);
  }

  // Reset player position (after death)
  reset(canvasWidth, canvasHeight) {
    const player = this.entityManager.get(this.playerId);
    if (player) {
      player.x = canvasWidth / 2;
      player.y = canvasHeight - 50;
      this.entityManager.update(this.playerId, player);
    }
  }

  // Check if player can shoot
  canShoot() {
    return (Date.now() - this.lastShotTime) > this.shootCooldown;
  }

  // Set player position (for initialization)
  setPosition(x, y) {
    const player = this.entityManager.get(this.playerId);
    if (player) {
      player.x = x;
      player.y = y;
      this.entityManager.update(this.playerId, player);
    }
  }

  // Handle player death
  die(gameState) {
    const player = this.entityManager.get(this.playerId);
    if (player) {
      player.lives--;
      gameState.gamePhase = player.lives > 0 ? 'playing' : 'gameover';
      this.reset(gameState.canvas.width, gameState.canvas.height);
    }
  }

  // Handle score increase
  addScore(points, gameState) {
    const player = this.entityManager.get(this.playerId);
    if (player) {
      player.score += points;
      this.entityManager.update(this.playerId, player);
    }
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlayerController;
} else {
  window.PlayerController = PlayerController;
}
