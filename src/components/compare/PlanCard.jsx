import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function PlanCard({
  plan,
  recommended = false,
  planningMode = 'ai',
  onSelect,
  onDetail,
}) {
  return (
    <article
      className={`cp-card cp-card--${plan.tone}${recommended ? ' is-recommend' : ''}`}
    >
      <div className="cp-card__head">
        <div className="cp-card__tags">
          {plan.badge ? <span className="cp-badge">{plan.badge}</span> : null}
          <span className="cp-name">{plan.name}</span>
        </div>
        {recommended ? <span className="cp-best">最适合这 6 小时</span> : null}
      </div>

      {planningMode === 'direct' && plan.destination ? (
        <div className="cp-destination">
          <strong>{plan.destination}</strong>
          <span>{plan.activityLabel || `${plan.destination}看展`}</span>
        </div>
      ) : null}

      <div className="cp-life">
        <strong>{plan.lifeTime}</strong>
        <span>{plan.lifeLabel}</span>
      </div>

      {plan.gainMinutes ? (
        <p className="cp-gain">
          比纯地面方案
          <br />
          多留 <em>{plan.gainMinutes} 分钟</em> 给生活
        </p>
      ) : null}

      <ul className="cp-timeline">
        {plan.timeline.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="cp-transport">
        {plan.transport.map((item, index) => (
          <span key={`${plan.id}-${item}`}>
            {item}
            {index < plan.transport.length - 1 ? (
              <ArrowRight size={12} strokeWidth={2.2} />
            ) : null}
          </span>
        ))}
      </div>

      <div className="cp-meta">
        <div>
          <span>费用</span>
          <strong>{plan.price}</strong>
        </div>
        <div>
          <span>换乘</span>
          <strong>{plan.transfers}</strong>
        </div>
        <div>
          <span>准时性</span>
          <strong>{plan.punctuality}</strong>
        </div>
        {plan.experience ? (
          <div>
            <span>体验</span>
            <strong>{plan.experience}</strong>
          </div>
        ) : null}
      </div>

      {plan.service?.length ? (
        <div className="cp-service">
          {plan.service.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}

      {plan.fit ? <p className="cp-fit">适合：{plan.fit}</p> : null}

      <p className={`cp-status is-${plan.statusTone}`}>
        <CheckCircle2 size={13} strokeWidth={2.3} />
        {plan.status}
      </p>

      <div className="cp-actions">
        <button
          type="button"
          className="cp-select-btn"
          onClick={() => onSelect?.(plan)}
        >
          {plan.selectLabel}
        </button>
        <button
          type="button"
          className="cp-detail-btn"
          onClick={() => onDetail?.(plan)}
        >
          查看详情
        </button>
      </div>
    </article>
  )
}
