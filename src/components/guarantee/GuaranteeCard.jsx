import { Clock3, House, MapPin } from 'lucide-react'

const icons = {
  arrival: MapPin,
  activityDuration: Clock3,
  returnHome: House,
}

export default function GuaranteeCard({ item, enabled, onToggle }) {
  const Icon = icons[item.id] || Clock3

  return (
    <article className={`tg-card tg-card--${item.tone}${enabled ? ' is-on' : ''}`}>
      <div className="tg-card__top">
        <div className="tg-card__icon">
          <Icon size={16} strokeWidth={2.2} />
        </div>
        <div className="tg-card__title">
          <h3>{item.title}</h3>
          <p>{item.target}</p>
        </div>
        <button
          type="button"
          className={`tg-switch${enabled ? ' is-on' : ''}`}
          aria-pressed={enabled}
          aria-label={`${enabled ? '关闭' : '开启'}${item.title}`}
          onClick={() => onToggle?.(item.id)}
        >
          <span />
        </button>
      </div>

      <p className="tg-card__desc">{item.desc}</p>

      {enabled ? (
        <div className="tg-card__detail">
          <div>
            <span>保障目标</span>
            <strong>{item.goalLabel}</strong>
          </div>
          <div>
            <span>预计额外费用</span>
            <strong>¥{item.fee}</strong>
          </div>
          <p>{item.failNote}</p>
          {item.id === 'arrival' ? (
            <button type="button" className="tg-edit">
              修改时间 {'>'}
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
