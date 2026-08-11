export default function ServiceBriefCard({ plan, guaranteeLabels }) {
  return (
    <section className="ss-brief">
      <div className="ss-brief__head">
        <span>{plan.planType}方案</span>
      </div>
      <div className="ss-brief__life">
        <strong>{plan.activityTime}</strong>
        <span>真正留给活动</span>
      </div>
      <div className="ss-brief__meta">
        <p>21:00 前回家</p>
        <div>
          <span>已选择保障</span>
          <strong>
            {guaranteeLabels.length ? guaranteeLabels.join('、') : '暂不添加保障'}
          </strong>
        </div>
      </div>
    </section>
  )
}
