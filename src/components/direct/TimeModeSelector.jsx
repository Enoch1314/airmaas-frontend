import { Clock3, AlarmClock } from 'lucide-react'

const modes = [
  { id: 'depart', label: '几点出发', Icon: Clock3 },
  { id: 'arrive', label: '必须几点前到达', Icon: AlarmClock },
]

export default function TimeModeSelector({ value, onChange }) {
  return (
    <div className="dp-mode" role="tablist" aria-label="时间方式">
      {modes.map(({ id, label, Icon }) => {
        const active = value === id
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`dp-mode__btn${active ? ' is-active' : ''}`}
            onClick={() => onChange?.(id)}
          >
            <Icon size={14} strokeWidth={2.2} />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
