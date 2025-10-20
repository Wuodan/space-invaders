# System Architecture

## High-Level Design

### Architecture Pattern
This Space Invaders clone follows a modular subsystem architecture where each component is developed independently by specialized agents and connected through well-defined APIs.

### Subsystems Overview

#### UI Subsystem (`code/ui/`)
- **Technology**: HTML5 Canvas 2D API
- **Responsibilities**:
  - Game canvas rendering
  - Sprite drawing (player, enemies, bullets, particles)
  - UI controls (keyboard input handling)
  - Game screens (menu, gameplay, game over)
  - Text rendering (scores, lives, instructions)
- **API**: UI exposes drawing functions and input events

#### Core Logic Subsystem (`code/logic/`)
- **Technology**: Vanilla JavaScript
- **Responsibilities**:
  - Game state management
  - Collision detection algorithms
  - Physics simulation
  - Entity position updates
  - Game loop orchestration
- **API**: Core logic manages game entities and state

#### Behavior & AI Subsystem (`code/ai/`)
- **Technology**: JavaScript algorithms
- **Responsibilities**:
  - Enemy movement patterns (zigzag, descent)
  - Difficulty scaling over time
  - Bullet firing patterns from enemies
  - Wave progression logic
  - Adaptive AI behavior
- **API**: Behavior module provides movement functions and AI decisions

#### Scoring Subsystem (`code/scoring/`)
- **Technology**: JavaScript with localStorage
- **Responsibilities**:
  - Points calculation
  - Lives management
  - Level progression
  - Score persistence
  - Game over conditions
- **API**: Scoring provides state updates and game statistics

### Integration Layer (`main game file`)
- Orchestrates subsystem updates
- Manages game loop
- Routes data between subsystems
- Handles level loading and transitions

### Data Flow
```
User Input → UI → Core Logic → Behavior AI → UI Rendering
                    ↓
              Scoring & Lives
```

### File Structure
See PROJECT_PLAN.md for detailed code organization.

### Dependencies
- **Hard**: None (vanilla JS/HTML5)
- **Soft**: Browser APIs (Canvas, Audio, Storage)
- **Soft**: GitHub MCP for PR workflow

### Constraints
- Browser-compatible ES5+ JavaScript
- Single-threaded execution (no web workers)
- Canvas API limitations (pixel perfect rendering)
- Event-driven input handling

### Extension Points
- Audio system (Web Audio API)
- Advanced visuals (particle systems)
- Multiplayer (WebSocket integration)
- Cloud saves (external API)

This architecture enables autonomous development where each agent can work within their subsystem boundaries without tight coupling.
