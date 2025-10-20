# Core Logic API Documentation

## Overview
The Core Logic module handles all game mechanics, physics, and state management for the Space Invaders game. It operates independently from rendering, providing a complete game engine that can interact with UI and behavior systems.

## Initialization

```javascript
const gameEngine = new GameEngine();

// Initialize with canvas (from UI module)
gameEngine.init(canvasElement);

// This creates:
// - Entity manager for all game objects
// - Collision detection system
// - Player controller
// - Initial level (enemies and bunkers)
```

## Main Methods

### GameEngine.update(currentTime)
Updates the game state each frame.

**Parameters:**
- `currentTime` (Number): Current timestamp from requestAnimationFrame

**Example:**
```javascript
function gameLoop(currentTime) {
  gameEngine.update(currentTime);

  // Get render state for UI
  const renderState = gameEngine.getRenderState();
  // ... render UI ...

  requestAnimationFrame(gameLoop);
}
```

### GameEngine.getRenderState()
Returns current game state for UI rendering.

**Returns:** Object with all renderable game entities and state.

**Return Object:**
```javascript
{
  gamePhase: 'playing', // 'menu' | 'playing' | 'paused' | 'gameover'
  level: 1,
  player: { x, y, lives, score, ... },
  enemies: [{ x, y, active, type, ... }],
  bullets: [{ x, y, isEnemy, active, ... }],
  bunkers: [{ x, y, health, active, ... }],
  score: 1500,
  lives: 2
}
```

### GameEngine.startGame()
Transitions from menu to playing state and starts gameplay.

### GameEngine.pauseGame()
Toggles game pause state.

### GameEngine.resetGame()
Resets the entire game to initial menu state.

## Submodules

### EntityManager
Manages all game entities (player, enemies, bullets, bunkers).

**Key Methods:**
- `create(type, x, y, properties)` - Create new entity
- `get(id)` - Get entity by ID
- `getByType(type)` - Get all entities of a type
- `update(id, properties)` - Update entity properties
- `remove(id)` - Deactivate entity

### CollisionDetector
Handles collision detection between all game objects.

**Key Methods:**
- `checkAllCollisions(gameState)` - Comprehensive collision check for all entity types
- Returns array of collision objects with type ('bullet-enemy', 'bullet-player', etc.)

### PlayerController
Manages player movement, shooting, and state.

**Key Methods:**
- `update(inputState, deltaTime)` - Update player based on input
- `addScore(points)` - Increase player score
- `die()` - Handle player death
- `canShoot()` - Check shooting cooldown

## Game State Machine

The game follows a finite state machine:

- **menu**: Waiting for player to start
- **playing**: Active gameplay
- **paused**: Game suspended
- **gameover**: Player lost all lives

## Entity System

### Player Entity
- **Position**: (x, y) on screen
- **Properties**: lives (3), score (0), speed (pixels/second)
- **Behavior**: Movement with arrow keys, shooting with space

### Enemy Entity
- **Types**: squids (40pts), crabs (20pts), octopi (10pts)
- **Position**: (x, y) in formation
- **Properties**: active (boolean), points (number), enemyType (string)

### Bullet Entity
- **Types**: player bullets (up), enemy bullets (down)
- **Properties**: isEnemy (boolean), speed (pixels/second)

### Bunker Entity
- **Properties**: health (0-100), active (boolean)

## Collision System

### Collision Types
- **Bullet-Enemy**: Player bullet hits enemy → enemy dies, score increases
- **Bullet-Player**: Enemy bullet hits player → player loses life
- **Enemy-Player**: Enemy touches player → player loses life
- **Bullet-Bunker**: Any bullet hits bunker → bunker damages, bullet dies

### Collision Resolution
Each collision type has specific logic handled in `CollisionResolver` class.

## Integration Points

### Game Loop Integration
```javascript
// Initialize modules
UI.init('game-canvas');
const gameEngine = new GameEngine();
gameEngine.init(UI.canvas);

// Game loop
function gameLoop(currentTime) {
  // Update game logic
  gameEngine.update(currentTime);

  // Get current state
  const renderState = gameEngine.getRenderState();

  // Update UI
  UI.render(renderState);

  // Input handling (integrate with behavior system later)
  const input = UI.getInputState();
  if (input.enter && gameEngine.gameState.phase === 'menu') {
    gameEngine.startGame();
  }

  requestAnimationFrame(gameLoop);
}

// Start game loop
requestAnimationFrame(gameLoop);
```

### Future Behavior Integration
The game engine has placeholders for behavior system integration:
- Enemy movement patterns
- AI shooting logic
- Difficulty scaling

## Performance Considerations
- Entity pooling for bullets (active/inactive system)
- Fixed timestep updates (60 FPS minimum)
- Delta time compensation for smooth movement
- Garbage collection management

## Error Handling
- Invalid entity operations return false/null gracefully
- Collision system handles missing entities without crashing
- Player state validates lives and bounds

## Debug Tools
Use `gameEngine.debugInfo()` for development:
```javascript
console.log(gameEngine.debugInfo());
// { phase: 'playing', level: 1, entityCount: 58, playerAlive: true, enemiesLeft: 53, bulletsCount: 2 }
```

## Dependencies
- EntityBuilder, CollisionDetector, CollisionResolver classes (imported)
- Canvas element exists and is initialized
- Time-based updates (provides deltaTime)

## Next Integration Steps
1. Connect with Behavior system for AI enemy movement
2. Connect with Scoring system for metrics tracking
3. Full integration (merge all systems into main game file)

This module provides the complete game logic core, ready for UI rendering and AI behavior integration.
