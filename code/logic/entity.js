//Entity.js - Game Entity Manager for Space Invaders

class EntityManager {
  constructor() {
    this.entities = [];
    this.nextId = 1;
  }

  // Create a new entity
  create(type, x, y, properties = {}) {
    const entity = {
      id: this.nextId++,
      type: type,
      x: x,
      y: y,
      active: true,
      created: Date.now(),
      ...properties
    };

    this.entities.push(entity);
    return entity.id;
  }

  // Get entity by id
  get(id) {
    return this.entities.find(entity => entity.id === id);
  }

  // Get entities by type
  getByType(type) {
    return this.entities.filter(entity => entity.type === type && entity.active);
  }

  // Update entity
  update(id, updates) {
    const index = this.entities.findIndex(entity => entity.id === id);
    if (index >= 0) {
      this.entities[index] = { ...this.entities[index], ...updates };
      return true;
    }
    return false;
  }

  // Remove entity (deactivate, not actually remove for performance)
  remove(id) {
    const entity = this.get(id);
    if (entity) {
      entity.active = false;
      return true;
    }
    return false;
  }

  // Get all active entities
  getActive() {
    return this.entities.filter(entity => entity.active);
  }

  // Count entities by type
  countByType(type) {
    return this.entities.filter(entity => entity.type === type && entity.active).length;
  }

  // Clear all entities
  clear() {
    this.entities = [];
    this.nextId = 1;
  }

  // Update all entities (called each frame)
  updateAll(deltaTime) {
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update(deltaTime);
      }
    });

    // Remove old inactive entities to prevent memory leaks
    this.entities = this.entities.filter(entity =>
      entity.active || (Date.now() - entity.created) < 10000
    );
  }

  // Debug: get entity count
  getCount() {
    return this.entities.length;
  }
}

// Specific entity builders
class EntityBuilder {
  static player(x, y) {
    return {
      type: 'player',
      x: x,
      y: y,
      speed: 200,
      width: 16,
      height: 12,
      lives: 3,
      score: 0,
      update: function() {
        // Player logic handled separately
      }
    };
  }

  static enemy(x, y, enemyType) {
    let speed = 50;
    let points = 10;
    let width = 10;
    let height = 8;

    switch (enemyType) {
      case 'squids':
        points = 30;
        break;
      case 'crabs':
        points = 20;
        break;
      case 'octopi':
        points = 10;
        break;
    }

    return {
      type: 'enemy',
      x: x,
      y: y,
      speed: speed,
      width: width,
      height: height,
      points: points,
      enemyType: enemyType,
      update: function() {
        // Movement handled by behavior system
      }
    };
  }

  static bullet(x, y, isEnemy = false) {
    return {
      type: 'bullet',
      x: x,
      y: y,
      speed: isEnemy ? 100 : 300,
      width: 2,
      height: 6,
      isEnemy: isEnemy,
      update: function(deltaTime) {
        this.y += (this.isEnemy ? 1 : -1) * this.speed * deltaTime / 1000;
      }
    };
  }

  static bunker(x, y) {
    return {
      type: 'bunker',
      x: x,
      y: y,
      width: 40,
      height: 20,
      health: 100,
      update: function() {
        if (this.health <= 0) {
          this.active = false;
        }
      }
    };
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EntityManager, EntityBuilder };
} else {
  window.EntityManager = EntityManager;
  window.EntityBuilder = EntityBuilder;
}
