import { Check, HeartHandshake, Timer, Users } from 'lucide-react'

const icons = {
  sameInterest: Users,
  companion: HeartHandshake,
  rush: Timer,
}

export default function ServiceOptionCard({ option, selected, onSelect }) {
  const Icon = icons[option.id] || Users

  return (
    <button
      type="button"
      className={`ss-service ss-service--${option.tone}${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
    >
      <div className="ss-service__top">
        <div className="ss-service__icon">
          <Icon size={18} strokeWidth={2.2} />
        </div>
        <div className="ss-service__title">
          <h3>{option.title}</h3>
          <p>{option.oneLiner}</p>
        </div>
        <span className={`ss-radio${selected ? ' is-on' : ''}`} aria-hidden="true">
          {selected ? <Check size={12} strokeWidth={3} /> : null}
        </span>
      </div>

      <p className="ss-service__match">{option.matchNote}</p>

      <div className="ss-chips">
        {option.features.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="ss-suits">
        <em>适合</em>
        {option.suits.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </button>
  )
}
