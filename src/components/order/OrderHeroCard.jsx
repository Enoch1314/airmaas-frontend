export default function OrderHeroCard({ ctx }) {
  const { plan, serviceTitle, routeTitle } = ctx

  return (
    <section className="oc-hero-card">
      <div className="oc-hero-card__tags">
        <span>{plan.planType}方案</span>
        <em>西岸美术馆看展</em>
      </div>
      <p className="oc-hero-card__date">周六 06-24</p>
      <div className="oc-hero-card__life">
        <strong>{plan.activityTime}</strong>
        <span>真正留给活动</span>
      </div>
      <div className="oc-hero-card__meta">
        <div>
          <span>比纯地面</span>
          <strong className="is-warm">多留{plan.recoveredTime}分钟给生活</strong>
        </div>
        <div>
          <span>预计到家</span>
          <strong>{plan.arrivalHome}</strong>
        </div>
      </div>
      <p className="oc-hero-card__combo">
        当前组合：{serviceTitle} + {routeTitle}
      </p>
    </section>
  )
}
