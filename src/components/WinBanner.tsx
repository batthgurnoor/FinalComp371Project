interface WinBannerProps {
  totalPairs: number
  totalMoves: number
  formattedTime: string
  onPlayAgain: () => void
}

export const WinBanner: React.FC<WinBannerProps> = ({
  totalPairs,
  totalMoves,
  formattedTime,
  onPlayAgain,
}) => {
  return (
    <div className="win-banner">
      <h2>Congratulations!</h2>
      <p>
        You matched all {totalPairs} pairs in {totalMoves} moves and{' '}
        {formattedTime}.
      </p>
      <button className="new-game-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}


