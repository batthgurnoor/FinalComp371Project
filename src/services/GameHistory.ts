/**
 * GameHistory Service
 * 
 * Tracks game history and statistics across multiple sessions.
 * Stores best times and moves for each difficulty level.
 * 
 * @author Harmitha - UI & Player Interaction
 */

import type { Difficulty } from '../controllers/GameController'

export interface GameRecord {
  difficulty: Difficulty
  timeSeconds: number
  moves: number
  date: Date
  playerName: string
}

export interface DifficultyStats {
  bestTimeSeconds: number | null
  bestMoves: number | null
  gamesPlayed: number
  lastPlayed: Date | null
}

export class GameHistory {
  private static readonly STORAGE_KEY = 'memory_game_history'
  private history: GameRecord[] = []
  private stats: Record<Difficulty, DifficultyStats> = {
    easy: {
      bestTimeSeconds: null,
      bestMoves: null,
      gamesPlayed: 0,
      lastPlayed: null,
    },
    medium: {
      bestTimeSeconds: null,
      bestMoves: null,
      gamesPlayed: 0,
      lastPlayed: null,
    },
    hard: {
      bestTimeSeconds: null,
      bestMoves: null,
      gamesPlayed: 0,
      lastPlayed: null,
    },
  }

  constructor() {
    this.loadFromStorage()
  }

  /**
   * Records a completed game
   */
  recordGame(record: GameRecord): void {
    this.history.push(record)
    this.updateStats(record)
    this.saveToStorage()
  }

  /**
   * Updates statistics for a difficulty level
   */
  private updateStats(record: GameRecord): void {
    const current = this.stats[record.difficulty]

    // Update best time
    if (
      current.bestTimeSeconds === null ||
      record.timeSeconds < current.bestTimeSeconds
    ) {
      current.bestTimeSeconds = record.timeSeconds
    }

    // Update best moves
    if (current.bestMoves === null || record.moves < current.bestMoves) {
      current.bestMoves = record.moves
    }

    current.gamesPlayed++
    current.lastPlayed = record.date
  }

  /**
   * Gets statistics for a specific difficulty
   */
  getStats(difficulty: Difficulty): DifficultyStats {
    return { ...this.stats[difficulty] }
  }

  /**
   * Gets all game records
   */
  getHistory(): GameRecord[] {
    return [...this.history]
  }

  /**
   * Gets recent games (last N games)
   */
  getRecentGames(count: number = 10): GameRecord[] {
    return this.history
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count)
  }

  /**
   * Clears all history
   */
  clearHistory(): void {
    this.history = []
    this.stats = {
      easy: {
        bestTimeSeconds: null,
        bestMoves: null,
        gamesPlayed: 0,
        lastPlayed: null,
      },
      medium: {
        bestTimeSeconds: null,
        bestMoves: null,
        gamesPlayed: 0,
        lastPlayed: null,
      },
      hard: {
        bestTimeSeconds: null,
        bestMoves: null,
        gamesPlayed: 0,
        lastPlayed: null,
      },
    }
    this.saveToStorage()
  }

  /**
   * Saves history to localStorage
   */
  private saveToStorage(): void {
    try {
      const data = {
        history: this.history.map((r) => ({
          ...r,
          date: r.date.toISOString(),
        })),
        stats: this.stats,
      }
      localStorage.setItem(GameHistory.STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to save game history to storage:', error)
    }
  }

  /**
   * Loads history from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(GameHistory.STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        this.history =
          data.history?.map((r: any) => ({
            ...r,
            date: new Date(r.date),
          })) || []
        if (data.stats) {
          this.stats = data.stats
        }
      }
    } catch (error) {
      console.warn('Failed to load game history from storage:', error)
    }
  }
}

