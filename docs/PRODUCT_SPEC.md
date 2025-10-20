# Space Invaders Product Specification

## Game Mechanics

### Objective
The objective of Space Invaders is to eliminate all the descending alien invaders by shooting them with a laser cannon. The player must defend against the aliens as they move horizontally across the screen and descend towards the bottom. The game ends if the aliens reach the bottom of the screen.

### Gameplay
- **Player Controls**: The player controls a laser cannon that can move horizontally across the bottom of the screen. The player can fire projectiles at the aliens.
- **Alien Movement**: The aliens move in a synchronized pattern, shifting left and right as a group and advancing downward when they reach the screen edges.
- **Alien Types**: For the initial version, only the simplest form of aliens will be included. Additional types of aliens will be added in later phases.
- **Bunkers**: Bunkers will be introduced in a later phase. For now, the player will not have any protection.
- **Mystery Ship**: The mystery ship will be introduced very late in the development process. For now, it will not be included.

### Scoring
- Points are awarded for destroying aliens, with different point values for each type.

### Game Over
The game ends if the aliens reach the bottom of the screen or if the player runs out of lives.

## User Interface

### Start Screen
- The game begins with a start screen where the player can choose when to start the game.

### Game Screen
- The game screen displays the player's laser cannon at the bottom and the aliens descending from the top.
- The player's score and remaining lives are displayed at the top of the screen.

### Game Over Screen
- When the game ends, a game over screen is displayed showing the player's final score.

## Requirements

### Functional Requirements
- The game must allow the player to control the laser cannon and fire projectiles at the aliens.
- The game must display the aliens moving in a synchronized pattern and advancing downward.
- The game must keep track of the player's score and remaining lives.
- The game must display a start screen and a game over screen.

### Non-Functional Requirements
- The game must be responsive and provide a smooth gameplay experience.
- The game must be visually appealing and engaging.

## Constraints
- The game must be developed using object-oriented programming principles.
- The game must be compatible with modern web browsers.

## Acceptance Criteria
- The game must meet all the functional and non-functional requirements.
- The game must pass all the test cases.

## UX Notes
- The game should have an intuitive and user-friendly interface.
- The game should provide clear and concise instructions for the player.

## Research Notes
- The game mechanics and UI are based on the original Space Invaders arcade game.
- The game uses a similar layout to that of Breakout but with different game mechanics.
- The game keeps a constant reload rate that determines how fast the aliens can fire.
- The game ends if the aliens reach the bottom of the screen or if the player runs out of lives.