/**
 * useGame Hook
 * 
 * Main game state management hook that coordinates between services.
 * Uses CardManager, MatchChecker, ScoreManager, and GameHistory services.
 * 
 * @author Danish - Controller & Patterns (with integration of services)
 */

import { useEffect, useMemo, useState } from 'react'
import type { Card } from '../models/Card'
import type { Player } from '../models/Player'
import type { GameBoard } from '../models/GameBoard'
import {
  gameController,
  type Difficulty,
} from '../controllers/GameController'
import { CardManager } from '../services/CardManager'
import { MatchChecker } from '../services/MatchChecker'
import { ScoreManager } from '../services/ScoreManager'
import { GameHistory } from '../services/GameHistory'
import { TimeFormatter } from '../utils/TimeFormatter'
import { GameBoardHelper } from '../models/GameBoard'
import { DifficultyStrategyFactory } from '../strategies/DifficultyStrategy'

// Initialize services
const cardManager = new CardManager()
const matchChecker = new MatchChecker()
const scoreManager = new ScoreManager()
const gameHistory = new GameHistory()

export interface GameSettings {
  difficulty: Difficulty
  twoPlayer: boolean
}

export interface GameStats {
  bestTimeSeconds: number | null
  bestMoves: number | null
}

export const useGame = () => {
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'easy',
    twoPlayer: false,
  })

  const [board, setBoard] = useState<GameBoard>(() =>
    gameController.createNewBoard({ difficulty: 'easy' }),
  )

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', score: 0, moves: 0 },
  ])
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)

  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [isBusy, setIsBusy] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [stats, setStats] = useState<Record<Difficulty, GameStats>>({
    easy: { bestTimeSeconds: null, bestMoves: null },
    medium: { bestTimeSeconds: null, bestMoves: null },
    hard: { bestTimeSeconds: null, bestMoves: null },
  })

  const totalPairs = useMemo(() => {
    return GameBoardHelper.getTotalPairs(board)
  }, [board.size])

  const activePlayer = players[activePlayerIndex]

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return

    const id = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [isTimerRunning])

  const formattedTime = useMemo(() => {
    return TimeFormatter.formatTime(elapsedSeconds)
  }, [elapsedSeconds])

  const resetPlayersForSettings = (twoPlayer: boolean) => {
    if (twoPlayer) {
      setPlayers([
        { id: 1, name: 'Player 1', score: 0, moves: 0 },
        { id: 2, name: 'Player 2', score: 0, moves: 0 },
      ])
    } else {
      setPlayers([{ id: 1, name: 'Player 1', score: 0, moves: 0 }])
    }
    setActivePlayerIndex(0)
  }

  const startNewGame = (nextSettings?: Partial<GameSettings>) => {
    const mergedSettings = { ...settings, ...nextSettings }
    setSettings(mergedSettings)

    const newBoard = gameController.createNewBoard({
      difficulty: mergedSettings.difficulty,
    })
    setBoard(newBoard)

    resetPlayersForSettings(mergedSettings.twoPlayer)
    setFlippedIds([])
    setIsBusy(false)
    setElapsedSeconds(0)
    setIsTimerRunning(false)
    setIsGameWon(false)
  }

  const handleCardClick = (cardId: number) => {
    if (isBusy || isGameWon) return

    const clickedCard = board.cards.find((c) => c.id === cardId)
    if (!clickedCard || clickedCard.state !== 'faceDown') return

    if (!isTimerRunning) {
      setIsTimerRunning(true)
    }

    // Use CardManager to flip the card
    const newCards = cardManager.flipCard(board.cards, cardId)
    const newFlipped = [...flippedIds, cardId]
    setBoard({ ...board, cards: newCards })
    setFlippedIds(newFlipped)

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped
      const firstCard = cardManager.getCardById(newCards, firstId)
      const secondCard = cardManager.getCardById(newCards, secondId)

      if (!matchChecker.canCompare(firstCard, secondCard)) return

      // Use ScoreManager to increment moves
      setPlayers((prev) =>
        scoreManager.incrementMoves(prev, activePlayer.id),
      )

      // Use MatchChecker to check for match
      if (matchChecker.checkMatch(firstCard!, secondCard!)) {
        // Match found - use CardManager to mark as matched
        const updatedCards = cardManager.markAsMatched(newCards, newFlipped)
        setBoard({ ...board, cards: updatedCards })
        setFlippedIds([])

        // Use ScoreManager to increment score
        setPlayers((prev) =>
          scoreManager.incrementScore(prev, activePlayer.id),
        )

        // Check if game is won
        if (matchChecker.areAllPairsMatched(updatedCards, totalPairs)) {
          setIsGameWon(true)
          setIsTimerRunning(false)

          // Record game in history
          const totalMoves = scoreManager.getTotalMoves(players)
          gameHistory.recordGame({
            difficulty: settings.difficulty,
            timeSeconds: elapsedSeconds,
            moves: totalMoves,
            date: new Date(),
            playerName: activePlayer.name,
          })

          // Update stats
          const historyStats = gameHistory.getStats(settings.difficulty)
          setStats((prev) => ({
            ...prev,
            [settings.difficulty]: {
              bestTimeSeconds: historyStats.bestTimeSeconds,
              bestMoves: historyStats.bestMoves,
            },
          }))
        }
      } else {
        // No match - flip cards back after delay
        setIsBusy(true)
        const strategy = DifficultyStrategyFactory.createStrategy(
          settings.difficulty,
        )
        setTimeout(() => {
          setBoard((prevBoard) => ({
            ...prevBoard,
            cards: cardManager.flipCardsDown(prevBoard.cards, newFlipped),
          }))
          setFlippedIds([])
          setIsBusy(false)

          // Switch active player if two-player mode
          setActivePlayerIndex((prevIdx) =>
            settings.twoPlayer && players.length === 2 ? 1 - prevIdx : prevIdx,
          )
        }, strategy.getFlipDelay())
      }
    }
  }

  const bestTimeLabel = useMemo(() => {
    const v = stats[settings.difficulty].bestTimeSeconds
    if (v == null) return '—'
    return TimeFormatter.formatTime(v)
  }, [stats, settings.difficulty])

  const bestMovesLabel = useMemo(() => {
    const v = stats[settings.difficulty].bestMoves
    return v == null ? '—' : v.toString()
  }, [stats, settings.difficulty])

  return {
    // state
    board,
    settings,
    players,
    activePlayer,
    activePlayerIndex,
    totalPairs,
    isBusy,
    isGameWon,
    elapsedSeconds,
    formattedTime,
    stats,
    bestTimeLabel,
    bestMovesLabel,
    // actions
    startNewGame,
    handleCardClick,
    setSettings, // direct access if needed in UI
  }
}


