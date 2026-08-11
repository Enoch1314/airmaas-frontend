import { Check, Clock3, MapPinned, Zap } from 'lucide-react'

export default function RouteOptionCard({ option, selected, onSelect }) {
  const Icon = option.id === 'fast' ? Zap : MapPinned

  return (
    <button
      type="button"
      className={`ss-route ss-route--${option.tone}${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
    >
      <div className="ss-route__top">
        <div className="ss-route__icon">
          <Icon size={18} strokeWidth={2.2} />
        </div>
        <div className="ss-route__title">
          <h3>{option.title}</h3>
          <p>{option.oneLiner}</p>
        </div>
        <span className={`ss-radio${selected ? ' is-on' : ''}`} aria-hidden="true">
          {selected ? <Check size={12} strokeWidth={3} /> : null}
        </span>
      </div>

      <div className="ss-chips">
        {option.features.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="ss-route__hint">
        <Clock3 size={13} strokeWidth={2.2} />
        <span>{option.flightHint}</span>
      </div>
      {option.note ? <p className="ss-route__note">{option.note}</p> : null}
    </button>
  )
}
