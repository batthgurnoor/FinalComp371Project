# Git Commit Plan - Memory Match Game

This document outlines a realistic commit history that shows gradual development by three team members over time.

## Commit Sequence




**Danish: Observer pattern implementation**
```bash
git add src/patterns/Observer.ts
git commit -m "implement Observer pattern for state notifications

- Create Observer and Subject interfaces
- Implement GameSubject class for managing observers
- Support for game state change notifications"
```


**Danish: Strategy pattern for difficulties**
```bash
git add src/strategies/DifficultyStrategy.ts
git commit -m "implement Strategy pattern for difficulty levels

- Create DifficultyStrategy interface
- Implement Easy, Medium, Hard strategy classes
- Add DifficultyStrategyFactory for strategy creation
- Encapsulate difficulty-specific behavior"
```

**Danish: Update GameController to use Strategy pattern**
```bash
git add src/controllers/GameController.ts
git commit -m "integrated Observer pattern into GameController. integrated Strategy pattern for difficulty management"
```


**Danish: Integrate services into useGame**
```bash
git add src/hooks/useGame.ts
git commit -m "created useGame hook for game state management. integrated CardManager and MatchChecker services. implemented two-player mode with turn switching"
```



**Danish: Add architecture documentation**
```bash
git add ARCHITECTURE.md
git commit -m "added comprehensive architecture documentation. Explained team member responsibilities. Added project structure and data flow. Included testing considerations"
```


**Danish: Add code comments to controller and patterns**
```bash
git add src/controllers/GameController.ts src/patterns/Observer.ts src/strategies/DifficultyStrategy.ts src/hooks/useGame.ts
git commit -m "added code comments to controller and pattern implementations

- Document GameController responsibilities
- Add Observer pattern usage examples
- Document Strategy pattern implementation
- Add hook usage documentation"
```