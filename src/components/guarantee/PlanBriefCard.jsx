export default function PlanBriefCard({ plan }) {
  return (
    <section className="tg-brief">
      <div className="tg-brief__head">
        <span>{plan.planType}方案</span>
        {plan.recommended ? <em>推荐</em> : null}
      </div>
      <h3>西岸美术馆看展</h3>
      <div className="tg-brief__life">
        <strong>{plan.activityTime}</strong>
        <span>真正留给活动</span>
      </div>
      <div className="tg-brief__meta">
        <div>
          <span>预计到家</span>
          <strong>{plan.arrivalHome}</strong>
        </div>
        <div>
          <span>比纯地面</span>
          <strong className="is-warm">多留{plan.recoveredTime}分钟</strong>
        </div>
        <div>
          <span>方案费用</span>
          <strong>¥{plan.price}</strong>
        </div>
      </div>
    </section>
  )
}
