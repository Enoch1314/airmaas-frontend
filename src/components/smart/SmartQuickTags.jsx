import { smartQuickTags } from '../../data/smartPlanData'

export default function SmartQuickTags({ selected, onToggle }) {
  return (
    <section className="sp-quick" aria-label="快捷需求标签">
      <div className="sp-quick__scroller">
        {smartQuickTags.map((tag) => {
          const active = selected.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              className={`sp-quick__tag${active ? ' is-active' : ''}`}
              onClick={() => onToggle?.(tag)}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </section>
  )
}
