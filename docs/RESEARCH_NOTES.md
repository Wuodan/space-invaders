# Research Notes: Space Invaders Clone

## Game Mechanics Research

### Original Space Invaders (1978)
- **Player Ship**: Located at bottom, moves left/right only, shoots upward
- **Enemies**: 5 rows (55 total): 1 row of 11 squids (40 pts), 2 rows of crabs (20 pts), 2 rows of octopi (10 pts)
- **Enemy Behavior**: Move horizontally, drop row when hitting screen edge, speed increases as enemies decrease
- **Bullets**: Enemies fire single shots randomly, player shoots continuously
- **Obstacles**: None in original, but some variants add bunkers
- **Lives**: 3 ships initially
- **Game Over**: All enemies reach bottom or player dies

### Technical Implementing Patterns
- **Game Loop**: 60 FPS animation loop, fixed timestep updates
- **Collision Detection**: Axis-aligned bounding boxes (AABB) for hit detection
- **State Management**: FSM with states: MENU, PLAYING, PAUSED, GAME_OVER
- **Pattern AI**: Sine wave or linear progression for enemy movement
- **Performance**: Use requestAnimationFrame, avoid DOM manipulation

### Prior Implementations Reviewed
- Canvas-based clones with object pooling for bullets
- Entity-component patterns for game objects
- Event-driven architecture for modular design
- Asset loading for sprites and sounds

### Browser Compatibility
- HTML5 Canvas supported in all modern browsers since 2010
- Keyboard events work consistently across platforms
- Audio support with Web Audio API fallback to HTML5 Audio
- Local storage for high scores persistence

### Challenges Identified
- Precise timing for retro feel
- Collision detection edge cases
- Sound synchronization with game events
- Responsive design for different aspect ratios

### Architecture Decisions
- Modular subsystems for agent division
- API contracts between UI (canvas), logic (game state), behavior (AI), scoring (metrics)
- File-based agent communication through shared state objects
- Conservative JavaScript (ES5 compatibility for broad browser support)
