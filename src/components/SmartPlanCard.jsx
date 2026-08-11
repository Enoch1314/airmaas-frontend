import { ChevronRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { smartPlanPlaceholder } from '../data/mockData'
import { setPlanningMode } from '../data/planningModeData'

function RobotMark() {
  return (
    <svg className="smart-robot" viewBox="0 0 64 56" aria-hidden="true">
      <rect x="16" y="14" width="32" height="28" rx="10" fill="#FFFFFF" stroke="#F0D0B8" />
      <circle cx="26" cy="28" r="4" fill="#5B9FE8" />
      <circle cx="38" cy="28" r="4" fill="#5B9FE8" />
      <circle cx="26" cy="28" r="1.6" fill="#FFFFFF" />
      <circle cx="38" cy="28" r="1.6" fill="#FFFFFF" />
      <rect x="27" y="35" width="10" height="3" rx="1.5" fill="#FFB08A" />
      <rect x="29" y="6" width="6" height="8" rx="3" fill="#FF9B63" />
      <circle cx="32" cy="5" r="2.5" fill="#FFB08A" />
      <path d="M12 30h6M46 30h6" stroke="#FFB08A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function SmartPlanCard() {
  const navigate = useNavigate()

  return (
    <article className="entry-card entry-card--orange">
      <div className="entry-card__title-row">
        <Sparkles size={15} strokeWidth={2.3} className="entry-card__icon-orange" />
        <h3 className="entry-card__title">帮我设计周末</h3>
      </div>
      <p className="entry-card__subtitle">AI 帮你规划理想周末</p>

      <div className="smart-bubble">
        <p>{smartPlanPlaceholder}</p>
      </div>

      <div className="smart-mascot">
        <RobotMark />
      </div>

      <button
        type="button"
        className="btn btn--orange"
        onClick={() => {
          setPlanningMode('ai')
          navigate('/smart-plan', { state: { planningMode: 'ai' } })
        }}
      >
        让AI帮我规划
        <ChevronRight size={16} strokeWidth={2.4} />
      </button>
    </article>
  )
}
