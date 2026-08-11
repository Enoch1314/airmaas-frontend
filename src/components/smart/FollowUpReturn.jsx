import { returnTimeOptions } from '../../data/smartPlanData'

export default function FollowUpReturn({ answered, onSelect }) {
  if (answered) return null

  return (
    <section className="sp-followup">
      <p className="sp-followup__q">你最晚希望几点回到家？</p>
      <div className="sp-followup__options">
        {returnTimeOptions.map((option) => (
          <button
            key={option}
            type="button"
            className="sp-followup__btn"
            onClick={() => onSelect?.(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="sp-followup__note">本次只追问这一项，确认后就能生成周末方案。</p>
    </section>
  )
}
