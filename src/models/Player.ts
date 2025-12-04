/**
 * Player Model
 * 
 * Represents a player in the memory match game.
 * Tracks individual player statistics including score and moves.
 * 
 * @author Harmitha - UI & Player Interaction
 */

export interface Player {
  /** Unique identifier for the player */
  id: number
  /** Player's display name */
  name: string
  /** Number of matched pairs (score) */
  score: number
  /** Number of move attempts made */
  moves: number
}

/**
 * Player utility methods
 */
export class PlayerHelper {
  /**
   * Creates a new player with default values
   */
  static create(id: number, name: string): Player {
    return {
      id,
      name,
      score: 0,
      moves: 0,
    }
  }

  /**
   * Resets a player's score and moves
   */
  static reset(player: Player): Player {
    return {
      ...player,
      score: 0,
      moves: 0,
    }
  }

  /**
   * Gets player's accuracy (score / moves) as a percentage
   */
  static getAccuracy(player: Player): number {
    if (player.moves === 0) return 0
    return Math.round((player.score / player.moves) * 100)
  }
}


