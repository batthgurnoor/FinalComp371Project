/**
 * Strategy Pattern Implementation for Difficulty Levels
 * 
 * Encapsulates difficulty-specific behavior, allowing easy addition
 * of new difficulty levels without modifying existing code.
 * 
 * @author Danish - Controller & Patterns
 */

export interface DifficultyStrategy {
  getBoardSize(): number
  getTotalPairs(): number
  getDescription(): string
  getFlipDelay(): number // milliseconds to show cards before flipping back
}

/**
 * Easy difficulty: 4x4 grid with 8 pairs
 */
export class EasyDifficultyStrategy implements DifficultyStrategy {
  getBoardSize(): number {
    return 4
  }

  getTotalPairs(): number {
    return 8
  }

  getDescription(): string {
    return 'Easy (4x4)'
  }

  getFlipDelay(): number {
    return 1000 // 1 second
  }
}

/**
 * Medium difficulty: 6x6 grid with 18 pairs
 */
export class MediumDifficultyStrategy implements DifficultyStrategy {
  getBoardSize(): number {
    return 6
  }

  getTotalPairs(): number {
    return 18
  }

  getDescription(): string {
    return 'Medium (6x6)'
  }

  getFlipDelay(): number {
    return 900 // 0.9 seconds
  }
}

/**
 * Hard difficulty: 8x8 grid with 32 pairs
 */
export class HardDifficultyStrategy implements DifficultyStrategy {
  getBoardSize(): number {
    return 8
  }

  getTotalPairs(): number {
    return 32
  }

  getDescription(): string {
    return 'Hard (8x8)'
  }

  getFlipDelay(): number {
    return 800 // 0.8 seconds - faster flip back for harder difficulty
  }
}

/**
 * Factory to create difficulty strategies
 */
export class DifficultyStrategyFactory {
  static createStrategy(difficulty: 'easy' | 'medium' | 'hard'): DifficultyStrategy {
    switch (difficulty) {
      case 'easy':
        return new EasyDifficultyStrategy()
      case 'medium':
        return new MediumDifficultyStrategy()
      case 'hard':
        return new HardDifficultyStrategy()
      default:
        return new EasyDifficultyStrategy()
    }
  }
}

