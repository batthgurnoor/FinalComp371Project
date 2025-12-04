import type { Difficulty } from '../controllers/GameController'
import type { Player } from '../models/Player'
import type { GameSettings } from '../hooks/useGame'

interface InfoBarProps {
  activePlayer: Player
  players: Player[]
  settings: GameSettings
  formattedTime: string
  bestTimeLabel: string
  bestMovesLabel: string
  onNewGame: () => void
  onChangeDifficulty: (difficulty: Difficulty) => void
  onToggleTwoPlayer: () => void
}

export const InfoBar: React.FC<InfoBarProps> = ({
  activePlayer,
  players,
  settings,
  formattedTime,
  bestTimeLabel,
  bestMovesLabel,
  onNewGame,
  onChangeDifficulty,
  onToggleTwoPlayer,
}) => {
  const totalMoves = players.reduce((sum, p) => sum + p.moves, 0)

  return (
    <section className="info-bar">
      <div className="info-item">
        <span className="label">Current Player:</span>
        <span>
          {activePlayer.name} (Score: {activePlayer.score})
        </span>
      </div>
      <div className="info-item">
        <span className="label">Total Moves:</span>
        <span>{totalMoves}</span>
      </div>
      <div className="info-item">
        <span className="label">Time:</span>
        <span>{formattedTime}</span>
      </div>
      <div className="info-item">
        <span className="label">Difficulty:</span>
        <select
          value={settings.difficulty}
          onChange={(e) => onChangeDifficulty(e.target.value as Difficulty)}
        >
          <option value="easy">Easy (4x4)</option>
          <option value="medium">Medium (6x6)</option>
          <option value="hard">Hard (8x8)</option>
        </select>
      </div>
      <div className="info-item">
        <span className="label">Mode:</span>
        <button
          type="button"
          className="toggle-mode-button"
          onClick={onToggleTwoPlayer}
        >
          {settings.twoPlayer ? 'Two Players' : 'Single Player'}
        </button>
      </div>
      <button className="new-game-button" onClick={onNewGame}>
        New Game
      </button>
      <div className="info-item stats">
        <span className="label">Best Time:</span>
        <span>{bestTimeLabel}</span>
      </div>
      <div className="info-item stats">
        <span className="label">Best Moves:</span>
        <span>{bestMovesLabel}</span>
      </div>
    </section>
  )
}


