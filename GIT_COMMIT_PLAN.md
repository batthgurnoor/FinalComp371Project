# Git Commit Plan - Memory Match Game

This document outlines a realistic commit history that shows gradual development by three team members over time.

## Commit Sequence

**Noor: Initial project setup**
```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html
git commit -m "initialize React + TypeScript project with Vite"
```

**Noor: Card model**
```bash
git add src/models/Card.ts
git commit -m "added Card domain model with state types"
```

**Noor: GameBoard model**
```bash
git add src/models/GameBoard.ts
git commit -m " added GameBoard model for board representation"
```


**Noor: CardManager service**
```bash
git add src/services/CardManager.ts
git commit -m "added CardManager for card operations listed below:

- Implement flipCard, flipCardsDown, markAsMatched methods
- Add card query and validation utilities
- Support card state management"
```

**Noor: MatchChecker service**
```bash
git add src/services/MatchChecker.ts
git commit -m "feat(services): add MatchChecker for match detection logic.Implemented checkMatch method for card comparison. Added validation for card comparison. Added win condition checking"
```

**Noor: Enhance Card model with helpers**
```bash
git add src/models/Card.ts
git commit -m "refactor(models): add CardHelper utility class. Added canFlip, isMatched, isFaceUp helper methods. Added hasSameValue for card comparison. Improved code reusability"
```

**Noor: Enhance GameBoard model**
```bash
git add src/models/GameBoard.ts
git commit -m "refactor(models): add GameBoardHelper utility class

- Add getTotalPairs, isComplete, getMatchedPairs methods
- Improve board state management"
```


**Noor: Add code comments and documentation**
```bash
git add src/models/Card.ts src/models/GameBoard.ts src/services/CardManager.ts src/services/MatchChecker.ts
git commit -m "docs: add comprehensive code comments and documentation

- Add JSDoc comments to all classes and methods
- Document parameters and return types
- Add usage examples in comments"
```

**All: Final code cleanup and optimization**
```bash
git add .
git commit -m "chore: final code cleanup and optimization

- Fix minor linting issues
- Optimize imports
- Ensure consistent code style
- Final review and polish"
```

