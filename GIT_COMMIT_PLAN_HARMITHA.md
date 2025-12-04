# Git Commit Plan - Memory Match Game

This document outlines a realistic commit history that shows gradual development by three team members over time.

## Commit Sequence


**Harmitha: Basic UI structure**
```bash
git add src/index.css src/main.tsx
git commit -m "feat: add basic app structure and styling"
```

**Harmitha: TimeFormatter utility**
```bash
git add src/utils/TimeFormatter.ts
git commit -m "added TimeFormatter utility class"
```


**Harmitha: ScoreManager service**
```bash
git add src/services/ScoreManager.ts
git commit -m "added ScoreManager for player scoring. Implemented incrementScore and incrementMoves. Added resetScores and getTotalMoves methods. Added getWinner and isNewRecord utilities"

```

**Harmitha: Enhance Player model**
```bash
git add src/models/Player.ts
git commit -m "added PlayerHelper utility class. Added create and reset helper method. Improved player management"
```

**Harmitha: GameHeader component**
```bash
git add src/components/GameHeader.tsx
git commit -m "add GameHeader component with title and subtitle"
```

**Harmitha: InfoBar component**
```bash
git add src/components/InfoBar.tsx
git commit -m "added InfoBar component for game statistics. Displays current player, moves, and time. Added difficulty selector dropdow. Added two-player mode toggle. Shows best time and moves"
```

**Harmitha: CardTile component**
```bash
git add src/components/CardTile.tsx
git commit -m "added CardTile component for individual cards. Handles card state visualization."
```

**Harmitha: Board component**
```bash
git add src/components/Board.tsx
git commit -m "added Board component for card grid display"
```

**Harmitha: WinBanner component**
```bash
git add src/components/WinBanner.tsx
git commit -m "added WinBanner component for game completion. Added play again button"
```



**Harmitha: GameHistory service**
```bash
git add src/services/GameHistory.ts
git commit -m "added GameHistory for statistics. Tracks best times and moves per difficulty. Stores game records and statistics"
```



**Commit 30 - Harmitha: Integrate GameHistory into App**
```bash
git add src/App.tsx
git commit -m "integrated all components into main App. Connected useGame hook with components. Added game flow and state management. Implemented complete game loop. integrated GameHistory component into main App"
```

**Commit 31 - Harmitha: Update useGame to use GameHistory**
```bash
git add src/hooks/useGame.ts
git commit -m "integrated GameHistory service. used TimeFormatter utility for time formatting. integrate ScoreManager service"
```

**Harmitha: Polish UI styling**
```bash
git add src/App.css
git commit -m "enhanced game styling and responsiveness. Improveed card tile animations. Added hover and active states"
```
