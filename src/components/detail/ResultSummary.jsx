export default function ResultSummary({ plan }) {
  return (
    <section className="pd-result">
      {plan.recommended ? <span className="pd-recommend">推荐</span> : null}
      <div className="pd-result__life">
        <strong>{plan.activityTime}</strong>
        <span>真正留给活动</span>
      </div>
      <p className="pd-result__gain">
        比纯地面方案
        <br />
        多留 <em>{plan.recoveredTime} 分钟</em> 给生活
      </p>
      <div className="pd-result__meta">
        <div>
          <span>总费用</span>
          <strong>¥{plan.price}</strong>
        </div>
        <div>
          <span>预计到家</span>
          <strong>{plan.arrivalHome}</strong>
        </div>
        <div>
          <span>换乘</span>
          <strong>{plan.transfers}次</strong>
        </div>
      </div>
    </section>
  )
}
