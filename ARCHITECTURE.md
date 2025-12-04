# Memory Match Game - Architecture Documentation

## Project Overview

This is a Memory Match Game (also known as Concentration or Card Match) built with React and TypeScript. The project demonstrates Object-Oriented Analysis and Design (OOA/D) principles, design patterns, and clean architecture.

## Team Members & Responsibilities

### Noor - Game Logic & Classes
- **Domain Models**: Card, GameBoard, CardManager
- **Game Logic**: Card operations, matching logic, board management
- **Files**:
  - `src/models/Card.ts` - Card model and utilities
  - `src/models/GameBoard.ts` - GameBoard model and helper methods
  - `src/services/CardManager.ts` - Card manipulation service
  - `src/services/MatchChecker.ts` - Match detection logic

### Danish - Controller & Patterns
- **Controller**: GameController (Singleton pattern)
- **Design Patterns**: Observer pattern, Strategy pattern
- **Game Rules**: Turn sequence, game flow, difficulty management
- **Files**:
  - `src/controllers/GameController.ts` - Main game controller
  - `src/patterns/Observer.ts` - Observer pattern implementation
  - `src/strategies/DifficultyStrategy.ts` - Strategy pattern for difficulties
  - `src/hooks/useGame.ts` - Game state management hook

### Harmitha - UI & Player Interaction
- **UI Components**: All React components
- **Player Management**: Player model, scoring, statistics
- **User Experience**: Timer, win messages, game history
- **Files**:
  - `src/models/Player.ts` - Player model and utilities
  - `src/services/ScoreManager.ts` - Score and move tracking
  - `src/services/GameHistory.ts` - Game history and statistics
  - `src/utils/TimeFormatter.ts` - Time formatting utilities
  - `src/components/*` - All UI components
  - `src/App.css` - Styling

## Architecture & Design Patterns

### 1. Singleton Pattern
**Location**: `src/controllers/GameController.ts`

The `GameController` class implements the Singleton pattern to ensure only one instance exists throughout the application lifecycle. This centralizes game rule management and board creation.

```typescript
static getInstance(): GameController {
  if (!GameController.instance) {
    GameController.instance = new GameController()
  }
  return GameController.instance
}
```

### 2. Observer Pattern
**Location**: `src/patterns/Observer.ts`

The Observer pattern is implemented to allow UI components to observe game state changes. The `GameController` extends `GameSubject` and notifies observers when significant events occur (card flipped, match found, game won, etc.).

**Usage**: The React components act as observers through the `useGame` hook, which subscribes to game state changes.

### 3. Strategy Pattern
**Location**: `src/strategies/DifficultyStrategy.ts`

The Strategy pattern encapsulates difficulty-specific behavior. Each difficulty level (Easy, Medium, Hard) has its own strategy class that defines:
- Board size
- Total pairs
- Flip delay timing
- Description

This makes it easy to add new difficulty levels without modifying existing code.

### 4. Service Layer Pattern
**Location**: `src/services/`

Services encapsulate specific business logic:
- **CardManager**: Card operations (flip, match, reset)
- **MatchChecker**: Match detection and validation
- **ScoreManager**: Score and move tracking
- **GameHistory**: Persistent game statistics

## Project Structure

```
src/
├── models/           # Domain models (Card, Player, GameBoard)
├── controllers/      # GameController (Singleton)
├── services/         # Business logic services
├── patterns/         # Design pattern implementations
├── strategies/       # Strategy pattern implementations
├── hooks/            # React hooks (useGame)
├── components/       # React UI components
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## Key Features

### Difficulty Levels
- **Easy**: 4x4 grid (16 cards, 8 pairs)
- **Medium**: 6x6 grid (36 cards, 18 pairs)
- **Hard**: 8x8 grid (64 cards, 32 pairs)

### Game Modes
- **Single Player**: One player tracks their own score
- **Two Player**: Turn-based gameplay, alternates on mismatches

### Statistics & History
- Best time per difficulty level
- Best moves per difficulty level
- Game history tracking (localStorage)
- Recent games display

### Game Mechanics
- Timer starts on first card flip
- Cards flip back after 0.8-1.0 seconds if no match
- Score increments on successful matches
- Moves tracked per player
- Win condition: All pairs matched

## Data Flow

1. **User Action** → Component (e.g., CardTile)
2. **Component** → useGame hook (handleCardClick)
3. **useGame Hook** → Services (CardManager, MatchChecker, ScoreManager)
4. **Services** → GameController (if needed)
5. **State Update** → React re-renders components
6. **GameController** → Notifies observers (Observer pattern)

## State Management

Game state is managed in the `useGame` hook using React's `useState`:
- Board state (cards, size)
- Player state (scores, moves)
- Game state (timer, win condition, busy state)
- Settings (difficulty, two-player mode)
- Statistics (best times, best moves)

## Persistence

Game history is persisted to `localStorage` using the `GameHistory` service. This includes:
- Best times per difficulty
- Best moves per difficulty
- Games played count
- Last played date

## Testing Considerations

The architecture supports easy testing:
- Services are pure classes with no React dependencies
- Models are simple interfaces/classes
- Controller can be tested independently
- Components can be tested with mocked hooks

## Future Enhancements

Potential additions that align with the current architecture:
- Sound effects (Observer pattern can notify audio service)
- Animations (Card flip animations)
- Themes (Strategy pattern for different card themes)
- Online multiplayer (extend GameController)
- Achievement system (extend GameHistory)



