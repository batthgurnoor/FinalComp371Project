/**
 * GameController - Central Controller for Memory Match Game
 * 
 * Implements Singleton pattern to ensure only one controller exists.
 * Uses Strategy pattern for difficulty levels and Observer pattern
 * for state change notifications.
 * 
 * Responsibilities:
 * - Board creation and initialization
 * - Game rule enforcement
 * - Coordinating between services
 * 
 * @author Danish - Controller & Patterns
 */

import type { Card } from '../models/Card'
import type { GameBoard } from '../models/GameBoard'
import { GameSubject } from '../patterns/Observer'
import {
  DifficultyStrategyFactory,
  type DifficultyStrategy,
} from '../strategies/DifficultyStrategy'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameConfig {
  difficulty: Difficulty
}

export interface GameStateChange {
  type: 'card_flipped' | 'match_found' | 'match_failed' | 'game_won' | 'game_reset'
  data?: unknown
}

// Central place for game rules and board creation.
// Implemented as a Singleton to align with the design proposal.
export class GameController extends GameSubject {
  private static instance: GameController

  private readonly symbols = [
    '🍎',
    '🍌',
    '🍒',
    '🍇',
    '🍉',
    '🍍',
    '🥝',
    '🍑',
    '🍋',
    '🥥',
    '🍐',
    '🍊',
    '🍓',
    '🥭',
    '🍈',
    '🍏',
    '🥑',
    '🍅',
    '🌶️',
    '🌽',
    '🥒',
    '🥕',
    '🌶',
    '🥔',
    '🍠',
    '🥜',
    '🌰',
    '🥨',
    '🧀',
    '🍗',
    '🍖',
    '🥩',
    '🍕',
    '🌮',
    '🌯',
    '🥙',
  ]

  private constructor() {
    super()
  }

  static getInstance(): GameController {
    if (!GameController.instance) {
      GameController.instance = new GameController()
    }
    return GameController.instance
  }

  /**
   * Gets board size for a difficulty level using Strategy pattern
   * @deprecated Use getDifficultyStrategy instead
   */
  getBoardSizeForDifficulty(difficulty: Difficulty): number {
    const strategy = DifficultyStrategyFactory.createStrategy(difficulty)
    return strategy.getBoardSize()
  }

  /**
   * Gets the strategy for a specific difficulty level
   */
  getDifficultyStrategy(difficulty: Difficulty): DifficultyStrategy {
    return DifficultyStrategyFactory.createStrategy(difficulty)
  }

  /**
   * Creates a new shuffled board based on difficulty
   * Notifies observers when board is created
   */
  createNewBoard(config: GameConfig): GameBoard {
    const strategy = this.getDifficultyStrategy(config.difficulty)
    const size = strategy.getBoardSize()
    const totalPairs = strategy.getTotalPairs()

    const availableSymbols = this.symbols.slice(0, totalPairs)

    const baseCards: Card[] = []
    let idCounter = 1
    for (const symbol of availableSymbols) {
      baseCards.push(
        { id: idCounter++, value: symbol, state: 'faceDown' },
        { id: idCounter++, value: symbol, state: 'faceDown' },
      )
    }

    // Fisher–Yates shuffle algorithm
    for (let i = baseCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[baseCards[i], baseCards[j]] = [baseCards[j], baseCards[i]]
    }

    const board: GameBoard = {
      size,
      cards: baseCards,
    }

    // Notify observers of game reset
    this.notify({
      type: 'game_reset',
      data: { board },
    } as GameStateChange)

    return board
  }

  /**
   * Notifies observers of a game state change
   */
  notifyStateChange(change: GameStateChange): void {
    this.notify(change)
  }
}

export const gameController = GameController.getInstance()


