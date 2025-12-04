/**
 * GameBoard Model
 * 
 * Represents the game board containing all cards.
 * Encapsulates board state and provides board-level operations.
 * 
 * @author Noor - Game Logic & Classes
 */

import type { Card } from './Card'

// Logical representation of the board.
// The UI is free to render this however it wants.

export interface GameBoard {
  /** Grid size (e.g., 4 means 4x4 grid) */
  size: number
  /** Array of all cards on the board */
  cards: Card[]
}

/**
 * GameBoard utility methods
 */
export class GameBoardHelper {
  /**
   * Gets total number of pairs on the board
   */
  static getTotalPairs(board: GameBoard): number {
    return (board.size * board.size) / 2
  }

  /**
   * Checks if board is complete (all pairs matched)
   */
  static isComplete(board: GameBoard): boolean {
    const matchedCount = board.cards.filter(
      (card) => card.state === 'matched',
    ).length
    return matchedCount === board.cards.length
  }

  /**
   * Gets number of matched pairs
   */
  static getMatchedPairs(board: GameBoard): number {
    return board.cards.filter((card) => card.state === 'matched').length / 2
  }
}


