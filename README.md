# Memory Match Game

A Memory Match Game (Concentration) built with React, TypeScript, and modern design patterns.
In this game, the player flips two cards at a time to find a matching pair. The game ends when all pairs are matched.

## Features

- 🎮 Three difficulty levels (Easy 4x4, Medium 6x6, Hard 8x8)
- 👥 Single-player and two-player modes
- ⏱️ Timer and move tracking
- 📊 Statistics and game history
- 🎨 Modern, responsive UI
- 🏗️ Clean architecture with design patterns

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Architecture

This project demonstrates:
- **Singleton Pattern**: GameController ensures single instance
- **Observer Pattern**: UI observes game state changes
- **Strategy Pattern**: Difficulty levels as strategies
- **Service Layer**: Separated business logic
- **Clean Architecture**: Models, Controllers, Services, Components

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## Team Contributions

- **Noor**: Game Logic & Classes (Card, GameBoard, CardManager, MatchChecker)
- **Danish**: Controller & Patterns (GameController, Observer, Strategy patterns)
- **Harmitha**: UI & Player Interaction (Components, Player, ScoreManager, GameHistory)

## Project Structure

```
src/
├── models/           # Domain models
├── controllers/      # GameController (Singleton)
├── services/         # Business logic services
├── patterns/         # Design patterns
├── strategies/       # Strategy implementations
├── hooks/            # React hooks
├── components/       # UI components
└── utils/            # Utilities
```

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 (Custom styling)
- LocalStorage (for game history)
