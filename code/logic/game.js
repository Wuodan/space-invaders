//Game.js - Main Game Orchestrator for Space Invaders

class GameEngine {
  constructor() {
    this.entities = new EntityManager();
    this.collisionDetector = new CollisionDetector();
    this.collisionResolver = CollisionResolver;
    this.playerController = new PlayerController(this.entities);

    // Game state
    this.gameState = {
      phase: 'menu', // menu, playing, paused, gameover
      level: 1,
      canvas: null
    };

    // Frame timing
    this.lastTime = 0;
    this.deltaTime = 0;
  }

  // Initialize the game
  init(canvas) {
    this.gameState.canvas = canvas;
    this.playerController.init(canvas.width, canvas.height);

    // Initialize game objects (enemies, bunkers)
    this.initializeLevel(1);

    console.log('Game Engine initialized');
  }

  // Initialize level enemies and bunkers
  initializeLevel(level) {
    this.gameState.level = level;
    const enemyRows = 5;
    const enemyCols = 11;
    const enemySpacing = 40;
    const enemyStartY = 80;

    // Create enemies in grid
    for (let row = 0; row < enemyRows; row++) {
      for (let col = 0; col < enemyCols; col++) {
        const x = 50 + col * enemySpacing;
        const y = enemyStartY + row * 30;

        let enemyType = 'octopi';
        if (row === 0) enemyType = 'squids';
        else if (row <= 2) enemyType = 'crabs';

        const enemyEntity = EntityBuilder.enemy(x, y, enemyType);
        this.entities.create('enemy', x, y, enemyEntity);
      }
    }

    // Create bunkers
    const bunkerSpacing = 160;
    for (let i = 0; i < 4; i++) {
      const x = 60 + i * bunkerSpacing;
      const y = this.gameState.canvas.height - 150;

      const bunkerEntity = EntityBuilder.bunker(x, y);
      this.entities.create('bunker', x, y, bunkerEntity);
    }
  }

  // Update game loop
  update(currentTime) {
    if (!this.lastTime) {
      this.lastTime = currentTime;
      return;
    }

    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Limit delta time to prevent large jumps (60 FPS minimum)
    if (this.deltaTime > 16.67) {
      this.deltaTime = 16.67;
    }

    switch (this.gameState.phase) {
      case 'menu':
        this.updateMenu();
        break;
      case 'playing':
        this.updatePlaying(this.deltaTime);
        break;
      case 'paused':
        this.updatePaused();
        break;
      case 'gameover':
        this.updateGameOver();
        break;
    }
  }

  // Update for menu phase
  updateMenu() {
    // Waiting for user input to start game
  }

  // Update for playing phase
  updatePlaying(deltaTime) {
    // Update player
    const input = UI ? UI.getInputState() : {};
    this.playerController.update(input, deltaTime);

    // Update all entities
    this.entities.updateAll(deltaTime);

    // Check collisions
    this.checkCollisions();

    // Update game logic (enemy movement, shooting, etc. - will be handled by behavior system)

    // Check win/lose conditions
    this.checkGameConditions();
  }

  // Update for paused phase
  updatePaused() {
    // Game is paused
  }

  // Update for game over phase
  updateGameOver() {
    // Game over state
  }

  // Check all collisions
  checkCollisions() {
    const collisions = this.collisionDetector.checkAllCollisions({
      ...this.gameState,
      entities: this.entities
    });

    // Process collisions
    collisions.forEach(collision => {
      let result = {};

      switch (collision.type) {
        case 'bullet-enemy':
          result = this.collisionResolver.handleBulletEnemy(collision.bullet, collision.enemy);
          this.playerController.addScore(result.score, this.gameState);
          break;
        case 'bullet-player':
          result = this.collisionResolver.handleBulletPlayer(collision.bullet, collision.player);
          break;
        case 'enemy-player':
          result = this.collisionResolver.handleEnemyPlayer(collision.enemy, collision.player);
          break;
        case 'bullet-bunker':
          result = this.collisionResolver.handleBulletBunker(collision.bullet, collision.bunker);
          break;
      }

      // Apply game over if needed
      if (result.gameOver) {
        this.gameState.phase = 'gameover';
      }
    });
  }

  // Check win/lose conditions
  checkGameConditions() {
    // Check if all enemies are dead (win condition)
    const enemiesLeft = this.entities.countByType('enemy');
    if (enemiesLeft === 0) {
      this.nextLevel();
    }

    // Check if player died (lose condition)
    const player = this.entities.getByType('player')[0];
    if (player && player.lives <= 0) {
      this.gameState.phase = 'gameover';
    }
  }

  // Advance to next level
  nextLevel() {
    this.gameState.level++;
    this.initializeLevel(this.gameState.level);
  }

  // Start game
  startGame() {
    this.gameState.phase = 'playing';
  }

  // Pause/resume game
  pauseGame() {
    if (this.gameState.phase === 'playing') {
      this.gameState.phase = 'paused';
    } else if (this.gameState.phase === 'paused') {
      this.gameState.phase = 'playing';
    }
  }

  // Reset game
  resetGame() {
    this.entities.clear();
    this.gameState.level = 1;
    this.gameState.phase = 'menu';
    this.playerController = new PlayerController(this.entities);
    this.init(this.gameState.canvas);
  }

  // Get current game state for UI rendering
  getRenderState() {
    const player = this.entities.getByType('player')[0];
    return {
      gamePhase: this.gameState.phase,
      level: this.gameState.level,
      player: player,
      enemies: this.entities.getByType('enemy'),
      bullets: this.entities.getByType('bullet'),
      bunkers: this.entities.getByType('bunker'),
      score: player ? player.score : 0,
      lives: player ? player.lives : 3
    };
  }

  // Debug utilities
  debugInfo() {
    return {
      phase: this.gameState.phase,
      level: this.gameState.level,
      entityCount: this.entities.getCount(),
      playerAlive: this.entities.countByType('player') > 0,
      enemiesLeft: this.entities.countByType('enemy'),
      bulletsCount: this.entities.countByType('bullet')
    };
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
} else {
  window.GameEngine = GameEngine;
}
