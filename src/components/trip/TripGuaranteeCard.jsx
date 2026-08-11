export default function TripGuaranteeCard({ activityTarget }) {
  return (
    <section className="ta-guarantee">
      <h3>我们会优先守住这些时间</h3>
      <ul>
        <li>
          <strong>✓ 活动时长保障</strong>
          <span>{activityTarget.target}</span>
        </li>
        <li>
          <strong>✓ 返程保障</strong>
          <span>21:00 前回家</span>
        </li>
      </ul>
      <div className="ta-guarantee__status">
        <span>当前状态</span>
        <em>需要重新安排</em>
      </div>
      <p>平台接下来优先寻找仍能满足以上时间要求的方案。</p>
    </section>
  )
}
