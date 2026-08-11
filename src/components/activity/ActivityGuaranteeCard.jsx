export default function ActivityGuaranteeCard({ ctx, homeEta }) {
  const items = ctx.selectedGuaranteeItems || []
  const hasActivity = items.some((item) => item.id === 'activityDuration')
  const hasReturn = items.some((item) => item.id === 'returnHome')

  return (
    <section className="ac-guarantee">
      <h3>关键时间保障</h3>
      {hasActivity ? (
        <div className="ac-guarantee__item">
          <strong>✓ 活动时长保障</strong>
          <span>{ctx.activityTarget.target}</span>
          <em>
            当前预计：{ctx.meta.estimatedActivity}
            <b>正常</b>
          </em>
        </div>
      ) : null}
      {hasReturn ? (
        <div className="ac-guarantee__item">
          <strong>✓ 返程保障</strong>
          <span>21:00 前到家</span>
          <em>
            当前预计：{homeEta} 到家
            <b>正常</b>
          </em>
        </div>
      ) : null}
      {!hasActivity && !hasReturn ? (
        <p className="ac-guarantee__empty">本次未添加关键时间保障</p>
      ) : null}
    </section>
  )
}
