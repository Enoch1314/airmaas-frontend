import { Minus, Plus, Users } from 'lucide-react'

export default function CompanionCounter({ value, onChange, min = 1, max = 8 }) {
  return (
    <div className="dp-row">
      <div className="dp-row__left">
        <Users size={16} strokeWidth={2.2} />
        <span>同行人数</span>
      </div>
      <div className="dp-counter">
        <button
          type="button"
          className="dp-counter__btn"
          aria-label="减少人数"
          disabled={value <= min}
          onClick={() => onChange?.(Math.max(min, value - 1))}
        >
          <Minus size={14} strokeWidth={2.4} />
        </button>
        <span className="dp-counter__value">{value}人</span>
        <button
          type="button"
          className="dp-counter__btn"
          aria-label="增加人数"
          disabled={value >= max}
          onClick={() => onChange?.(Math.min(max, value + 1))}
        >
          <Plus size={14} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  )
}
