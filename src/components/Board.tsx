import type { Card } from '../models/Card'
import { CardTile } from './CardTile'

interface BoardProps {
  size: number
  cards: Card[]
  isBusy: boolean
  onCardClick: (id: number) => void
}

export const Board: React.FC<BoardProps> = ({
  size,
  cards,
  isBusy,
  onCardClick,
}) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(70px, 80px))`,
      }}
    >
      {cards.map((card) => (
        <CardTile
          key={card.id}
          card={card}
          disabled={card.state === 'matched' || isBusy}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  )
}


