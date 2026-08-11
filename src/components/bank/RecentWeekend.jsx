export default function RecentWeekend({ recent, onOpenReport }) {
  return (
    <section className="tb-recent">
      <h3>最近一次记录</h3>
      <strong>{recent.title}</strong>
      <div className="tb-recent__grid">
        <div>
          <span>本次回收</span>
          <em>{recent.recoveredLabel}</em>
        </div>
        <div>
          <span>关键时间保障</span>
          <em>{recent.guaranteeScore}</em>
        </div>
        <div>
          <span>时间币</span>
          <em>{recent.timeCoins}</em>
        </div>
        <div>
          <span>实际到家</span>
          <em>{recent.homeTime}</em>
        </div>
      </div>
      <button type="button" className="tb-secondary" onClick={onOpenReport}>
        查看本次周末报告
      </button>
    </section>
  )
}
