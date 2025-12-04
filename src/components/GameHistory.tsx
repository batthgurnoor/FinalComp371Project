/**
 * GameHistory Component
 * 
 * Displays game history and statistics for each difficulty level.
 * Shows best times, best moves, and recent games.
 * 
 * @author Harmitha - UI & Player Interaction
 */

import { useState } from 'react'
import type { Difficulty } from '../controllers/GameController'
import { GameHistory as GameHistoryService } from '../services/GameHistory'
import { TimeFormatter } from '../utils/TimeFormatter'

const gameHistory = new GameHistoryService()

interface GameHistoryProps {
  difficulty: Difficulty
}

export const GameHistory: React.FC<GameHistoryProps> = ({ difficulty }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const stats = gameHistory.getStats(difficulty)
  const recentGames = gameHistory.getRecentGames(5)

  return (
    <div className="game-history">
      <button
        className="history-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '▼' : '▶'} Game History
      </button>

      {isExpanded && (
        <div className="history-content">
          <div className="history-stats">
            <h3>Statistics for {difficulty}</h3>
            <div className="stat-item">
              <span className="stat-label">Games Played:</span>
              <span className="stat-value">{stats.gamesPlayed}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Time:</span>
              <span className="stat-value">
                {stats.bestTimeSeconds !== null
                  ? TimeFormatter.formatTime(stats.bestTimeSeconds)
                  : '—'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Moves:</span>
              <span className="stat-value">
                {stats.bestMoves !== null ? stats.bestMoves : '—'}
              </span>
            </div>
            {stats.lastPlayed && (
              <div className="stat-item">
                <span className="stat-label">Last Played:</span>
                <span className="stat-value">
                  {stats.lastPlayed.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {recentGames.length > 0 && (
            <div className="recent-games">
              <h4>Recent Games</h4>
              <ul>
                {recentGames
                  .filter((game) => game.difficulty === difficulty)
                  .map((game, index) => (
                    <li key={index}>
                      {TimeFormatter.formatTime(game.timeSeconds)} - {game.moves}{' '}
                      moves - {game.playerName}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

