import './App.css'
import { GameHeader } from './components/GameHeader'
import { InfoBar } from './components/InfoBar'
import { Board } from './components/Board'
import { WinBanner } from './components/WinBanner'
import { GameHistory } from './components/GameHistory'
import { useGame } from './hooks/useGame'

function App() {
  const {
    board,
    settings,
    players,
    activePlayer,
    totalPairs,
    isBusy,
    isGameWon,
    formattedTime,
    bestTimeLabel,
    bestMovesLabel,
    startNewGame,
    handleCardClick,
  } = useGame()

  const totalMoves = players.reduce((sum, p) => sum + p.moves, 0)

  return (
    <div className="app">
      <GameHeader />

      <InfoBar
        activePlayer={activePlayer}
        players={players}
        settings={settings}
        formattedTime={formattedTime}
        bestTimeLabel={bestTimeLabel}
        bestMovesLabel={bestMovesLabel}
        onNewGame={() => startNewGame()}
        onChangeDifficulty={(difficulty) =>
          startNewGame({ difficulty })
        }
        onToggleTwoPlayer={() =>
          startNewGame({ twoPlayer: !settings.twoPlayer })
        }
      />

      <main>
        <Board
          size={board.size}
          cards={board.cards}
          isBusy={isBusy}
          onCardClick={handleCardClick}
        />

        {isGameWon && (
          <WinBanner
            totalPairs={totalPairs}
            totalMoves={totalMoves}
            formattedTime={formattedTime}
            onPlayAgain={() => startNewGame()}
          />
        )}

        <GameHistory difficulty={settings.difficulty} />
      </main>
    </div>
  )
}

export default App
