export default function WeekendSummary({ summary }) {
  return (
    <section className="tr-summary">
      <h3>你的这次周末</h3>
      <div className="tr-summary__row">
        <span>活动</span>
        <strong>{summary.activityName}</strong>
      </div>
      <div className="tr-summary__route">
        {summary.routeNodes.map((node, index) => (
          <span key={`${node}-${index}`}>
            {index > 0 ? <i>→</i> : null}
            {node}
          </span>
        ))}
      </div>
      <div className="tr-summary__grid">
        <div>
          <span>最终到家</span>
          <strong>{summary.homeTime}</strong>
        </div>
        <div>
          <span>同行</span>
          <strong>{summary.companions}</strong>
        </div>
      </div>
      <div className="tr-summary__plan">
        <div>
          <span>原计划</span>
          <strong>{summary.plannedService}</strong>
        </div>
        <div>
          <span>实际执行</span>
          <strong>{summary.actualExecution}</strong>
        </div>
      </div>
    </section>
  )
}
