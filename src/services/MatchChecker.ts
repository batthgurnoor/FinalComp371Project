/**
 * MatchChecker Service
 * 
 * Handles match detection logic between cards.
 * Separates match validation from game flow logic.
 * 
 * @author Noor - Game Logic & Classes
 */

import type { Card } from '../models/Card'

export class MatchChecker {
  /**
   * Checks if two cards match based on their values
   * @param card1 - First card to compare
   * @param card2 - Second card to compare
   * @returns True if cards match, false otherwise
   */
  checkMatch(card1: Card, card2: Card): boolean {
    if (!card1 || !card2) {
      return false
    }
    return card1.value === card2.value && card1.id !== card2.id
  }

  /**
   * Validates if two cards can be compared for matching
   * @param card1 - First card to validate
   * @param card2 - Second card to validate
   * @returns True if both cards are valid and can be compared
   */
  canCompare(card1: Card | undefined, card2: Card | undefined): boolean {
    return (
      card1 !== undefined &&
      card2 !== undefined &&
      card1.state === 'faceUp' &&
      card2.state === 'faceUp'
    )
  }

  /**
   * Checks if all pairs on the board are matched
   * @param cards - Array of all cards
   * @param totalPairs - Total number of pairs expected
   * @returns True if all pairs are matched
   */
  areAllPairsMatched(cards: Card[], totalPairs: number): boolean {
    const matchedCount = cards.filter((card) => card.state === 'matched').length
    return matchedCount === totalPairs * 2
  }
}

