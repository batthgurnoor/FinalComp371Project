/**
 * CardManager Service
 * 
 * Manages card operations including flipping, matching, and state management.
 * Encapsulates card-related business logic separate from the controller.
 * 
 * @author Noor - Game Logic & Classes
 */

import type { Card, CardState } from '../models/Card'

export class CardManager {
  /**
   * Flips a card from faceDown to faceUp state
   * @param cards - Array of all cards
   * @param cardId - ID of the card to flip
   * @returns Updated array of cards
   */
  flipCard(cards: Card[], cardId: number): Card[] {
    return cards.map((card) =>
      card.id === cardId && card.state === 'faceDown'
        ? { ...card, state: 'faceUp' }
        : card,
    )
  }

  /**
   * Flips multiple cards back to faceDown state
   * @param cards - Array of all cards
   * @param cardIds - Array of card IDs to flip back
   * @returns Updated array of cards
   */
  flipCardsDown(cards: Card[], cardIds: number[]): Card[] {
    return cards.map((card) =>
      cardIds.includes(card.id) && card.state === 'faceUp'
        ? { ...card, state: 'faceDown' }
        : card,
    )
  }

  /**
   * Marks cards as matched
   * @param cards - Array of all cards
   * @param cardIds - Array of card IDs to mark as matched
   * @returns Updated array of cards
   */
  markAsMatched(cards: Card[], cardIds: number[]): Card[] {
    return cards.map((card) =>
      cardIds.includes(card.id)
        ? { ...card, state: 'matched' }
        : card,
    )
  }

  /**
   * Gets a card by its ID
   * @param cards - Array of all cards
   * @param cardId - ID of the card to retrieve
   * @returns The card or undefined if not found
   */
  getCardById(cards: Card[], cardId: number): Card | undefined {
    return cards.find((card) => card.id === cardId)
  }

  /**
   * Checks if a card can be flipped (not already matched or face up)
   * @param card - The card to check
   * @returns True if the card can be flipped
   */
  canFlipCard(card: Card): boolean {
    return card.state === 'faceDown'
  }

  /**
   * Counts the number of matched pairs
   * @param cards - Array of all cards
   * @returns Number of matched pairs
   */
  countMatchedPairs(cards: Card[]): number {
    return cards.filter((card) => card.state === 'matched').length / 2
  }

  /**
   * Resets all cards to faceDown state
   * @param cards - Array of all cards
   * @returns Updated array of cards
   */
  resetCards(cards: Card[]): Card[] {
    return cards.map((card) => ({ ...card, state: 'faceDown' }))
  }
}

