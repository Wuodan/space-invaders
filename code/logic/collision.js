//Collision.js - Collision Detection System for Space Invaders

class CollisionDetector {
  constructor() {
    // No initialization needed
  }

  // Check collision between two axis-aligned bounding boxes
  checkAABB(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  // Check collision between entities
  checkEntities(entity1, entity2) {
    return this.checkAABB(entity1, entity2);
  }

  // Check if entity is out of bounds
  checkOutOfBounds(entity, bounds) {
    return entity.x < 0 ||
           entity.x > bounds.width ||
           entity.y < 0 ||
           entity.y > bounds.height;
  }

  // Check player bullet vs enemy collision
  checkBulletEnemyCollisions(bullets, enemies) {
    const collisions = [];

    bullets.forEach(bullet => {
      if (bullet.isEnemy) return; // Only check player bullets

      enemies.forEach(enemy => {
        if (enemy.active && this.checkEntities(bullet, enemy)) {
          collisions.push({
            bullet: bullet,
            enemy: enemy,
            type: 'bullet-enemy'
          });
        }
      });
    });

    return collisions;
  }

  // Check enemy bullet vs player collision
  checkBulletPlayerCollisions(bullets, player) {
    const collisions = [];

    bullets.forEach(bullet => {
      if (!bullet.isEnemy) return; // Only check enemy bullets

      if (player.active && this.checkEntities(bullet, player)) {
        collisions.push({
          bullet: bullet,
          player: player,
          type: 'bullet-player'
        });
      }
    });

    return collisions;
  }

  // Check enemy vs player collision
  checkEnemyPlayerCollisions(enemies, player) {
    const collisions = [];

    enemies.forEach(enemy => {
      if (enemy.active && this.checkEntities(enemy, player)) {
        collisions.push({
          enemy: enemy,
          player: player,
          type: 'enemy-player'
        });
      }
    });

    return collisions;
  }

  // Check bullet vs bunker collision
  checkBulletBunkerCollisions(bullets, bunkers) {
    const collisions = [];

    bullets.forEach(bullet => {
      bunkers.forEach(bunker => {
        if (bunker.active && this.checkEntities(bullet, bunker)) {
          collisions.push({
            bullet: bullet,
            bunker: bunker,
            type: 'bullet-bunker'
          });
        }
      });
    });

    return collisions;
  }

  // Comprehensive collision check for all game entities
  checkAllCollisions(gameState) {
    const collisions = [];

    if (!gameState.entities) return collisions;

    const bullets = gameState.entities.getByType('bullet');
    const enemies = gameState.entities.getByType('enemy');
    const bunkers = gameState.entities.getByType('bunker');
    const player = gameState.entities.getByType('player')[0]; // Usually only one player

    // Bullet vs Enemy
    collisions.push(...this.checkBulletEnemyCollisions(bullets, enemies));

    // Bullet vs Player
    if (player) {
      collisions.push(...this.checkBulletPlayerCollisions(bullets, player));
    }

    // Enemy vs Player
    if (player) {
      collisions.push(...this.checkEnemyPlayerCollisions(enemies, player));
    }

    // Bullet vs Bunker
    collisions.push(...this.checkBulletBunkerCollisions(bullets, bunkers));

    return collisions;
  }

  // Get collision bounds for entity
  getBounds(entity) {
    return {
      x: entity.x,
      y: entity.y,
      width: entity.width,
      height: entity.height
    };
  }

  // Check if point is inside entity
  containsPoint(entity, point) {
    return point.x >= entity.x &&
           point.x <= entity.x + entity.width &&
           point.y >= entity.y &&
           point.y <= entity.y + entity.height;
  }

  // Debug collision (draw bounding boxes - for debugging only)
  drawBounds(renderer, entity) {
    const bounds = this.getBounds(entity);
    renderer.drawRect(bounds.x, bounds.y, bounds.width, bounds.height, '#00ff00', 1);
  }
}

// Utility function for collision responses
class CollisionResolver {
  static handleBulletEnemy(bullet, enemy) {
    // Remove both entities
    bullet.active = false;
    enemy.active = false;

    return {
      score: enemy.points || 10,
      explosion: { x: enemy.x, y: enemy.y, type: 'enemy' }
    };
  }

  static handleBulletPlayer(bullet, player) {
    // Remove bullet, damage player
    bullet.active = false;
    player.lives--;

    return {
      damage: 1,
      explosion: { x: bullet.x, y: bullet.y, type: 'player-hit' }
    };
  }

  static handleEnemyPlayer(enemy, player) {
    // Player loses a life, enemy dies
    player.lives--;
    enemy.active = false;

    return {
      damage: 1,
      gameOver: player.lives <= 0,
      explosion: { x: player.x, y: player.y, type: 'player-hit' }
    };
  }

  static handleBulletBunker(bullet, bunker) {
    // Damage bunker, remove bullet
    bullet.active = false;
    bunker.health -= 25; // Arbitrary damage

    return {
      bunkerDamage: 25,
      explosion: { x: bullet.x, y: bullet.y, type: 'bunker-hit' }
    };
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CollisionDetector, CollisionResolver };
} else {
  window.CollisionDetector = CollisionDetector;
  window.CollisionResolver = CollisionResolver;
}
