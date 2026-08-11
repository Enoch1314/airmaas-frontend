import {
  MapPin,
  Navigation,
  CalendarDays,
  Users,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { directPlanDefaults } from '../data/mockData'
import { setPlanningMode } from '../data/planningModeData'

const fields = [
  {
    key: 'from',
    label: '从哪里出发',
    value: directPlanDefaults.from,
    Icon: Navigation,
  },
  {
    key: 'to',
    label: '想去哪里',
    value: directPlanDefaults.to,
    Icon: MapPin,
  },
  {
    key: 'time',
    label: '出发时间',
    value: directPlanDefaults.departTime,
    Icon: CalendarDays,
  },
  {
    key: 'people',
    label: '同行人数',
    value: directPlanDefaults.companions,
    Icon: Users,
  },
]

export default function DirectPlanCard() {
  const navigate = useNavigate()

  return (
    <article className="entry-card entry-card--blue">
      <div className="entry-card__title-row">
        <MapPin size={16} strokeWidth={2.3} className="entry-card__icon-blue" />
        <h3 className="entry-card__title">我已经想好去哪</h3>
      </div>

      <div className="entry-fields">
        {fields.map(({ key, label, value, Icon }, index) => (
          <div
            key={key}
            className={`entry-field${index < fields.length - 1 ? ' has-line' : ''}`}
          >
            <div className="entry-field__left">
              <Icon size={13} strokeWidth={2.2} />
              <div>
                <span className="entry-field__label">{label}</span>
                <span className="entry-field__value">{value}</span>
              </div>
            </div>
            <ChevronRight size={14} strokeWidth={2.2} className="entry-field__chevron" />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn--blue"
        onClick={() => {
          setPlanningMode('direct')
          navigate('/direct-plan', { state: { planningMode: 'direct' } })
        }}
      >
        查看出行方案
        <ChevronRight size={16} strokeWidth={2.4} />
      </button>
    </article>
  )
}
