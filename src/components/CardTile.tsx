import type { Card } from '../models/Card'

interface CardTileProps {
  card: Card
  disabled: boolean
  onClick: () => void
}

export const CardTile: React.FC<CardTileProps> = ({
  card,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`card-tile card-${card.state}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="card-content">
        {card.state === 'faceDown' ? '?' : card.value}
      </span>
    </button>
  )
}


