/**
 * ScoreManager Service
 * 
 * Manages player scoring, move tracking, and statistics.
 * Handles score calculations and best record tracking.
 * 
 * @author Harmitha - UI & Player Interaction
 */

import type { Player } from '../models/Player'

export interface ScoreUpdate {
  playerId: number
  score: number
  moves: number
}

export class ScoreManager {
  /**
   * Increments the score for a specific player
   * @param players - Array of all players
   * @param playerId - ID of the player to update
   * @returns Updated array of players
   */
  incrementScore(players: Player[], playerId: number): Player[] {
    return players.map((player) =>
      player.id === playerId
        ? { ...player, score: player.score + 1 }
        : player,
    )
  }

  /**
   * Increments the move count for a specific player
   * @param players - Array of all players
   * @param playerId - ID of the player to update
   * @returns Updated array of players
   */
  incrementMoves(players: Player[], playerId: number): Player[] {
    return players.map((player) =>
      player.id === playerId
        ? { ...player, moves: player.moves + 1 }
        : player,
    )
  }

  /**
   * Resets all player scores and moves
   * @param players - Array of all players
   * @returns Updated array of players with reset values
   */
  resetScores(players: Player[]): Player[] {
    return players.map((player) => ({
      ...player,
      score: 0,
      moves: 0,
    }))
  }

  /**
   * Gets the total moves across all players
   * @param players - Array of all players
   * @returns Total number of moves
   */
  getTotalMoves(players: Player[]): number {
    return players.reduce((total, player) => total + player.moves, 0)
  }

  /**
   * Gets the player with the highest score
   * @param players - Array of all players
   * @returns Player with highest score, or null if no players
   */
  getWinner(players: Player[]): Player | null {
    if (players.length === 0) return null
    return players.reduce((winner, player) =>
      player.score > winner.score ? player : winner,
    )
  }

  /**
   * Checks if a new record is better than the existing best
   * @param currentBest - Current best value (time in seconds or moves)
   * @param newValue - New value to compare
   * @returns True if new value is better (lower is better)
   */
  isNewRecord(currentBest: number | null, newValue: number): boolean {
    return currentBest === null || newValue < currentBest
  }
}

