/**
 * Card Model
 * 
 * Represents a single card in the memory match game.
 * Cards have three states: faceDown, faceUp, or matched.
 * 
 * @author Noor - Game Logic & Classes
 */

export type CardState = 'faceDown' | 'faceUp' | 'matched'

export interface Card {
  /** Unique identifier for the card */
  id: number
  /** Symbol/value displayed when card is face up */
  value: string
  /** Current state of the card */
  state: CardState
}

/**
 * Card utility methods
 */
export class CardHelper {
  /**
   * Checks if a card can be flipped
   */
  static canFlip(card: Card): boolean {
    return card.state === 'faceDown'
  }

  /**
   * Checks if a card is matched
   */
  static isMatched(card: Card): boolean {
    return card.state === 'matched'
  }

  /**
   * Checks if a card is face up
   */
  static isFaceUp(card: Card): boolean {
    return card.state === 'faceUp'
  }

  /**
   * Checks if two cards have the same value (potential match)
   */
  static hasSameValue(card1: Card, card2: Card): boolean {
    return card1.value === card2.value
  }
}


