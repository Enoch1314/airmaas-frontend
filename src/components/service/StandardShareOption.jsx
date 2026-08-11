import { Check } from 'lucide-react'

export default function StandardShareOption({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`ss-standard${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
    >
      <div>
        <span className="ss-standard__label">{option.subtitle}</span>
        <h3>{option.title}</h3>
        <p>{option.oneLiner}</p>
      </div>
      <span className={`ss-radio${selected ? ' is-on' : ''}`} aria-hidden="true">
        {selected ? <Check size={12} strokeWidth={3} /> : null}
      </span>
    </button>
  )
}
