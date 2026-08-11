export default function ActionCard({ action, onPrimary }) {
  return (
    <section className={`it-action${action.lifeMode ? ' is-life' : ''}`}>
      <div className="it-action__phase">{action.phaseTitle}</div>
      <div className="it-action__count">
        <span>{action.countdownLabel}</span>
        <strong>
          {action.countdownValue}
          {action.countdownUnit ? (
            <em>{action.countdownUnit}</em>
          ) : null}
        </strong>
      </div>
      <h2>{action.title}</h2>
      <ul>
        {action.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
      <button type="button" className="it-primary" onClick={onPrimary}>
        {action.primaryLabel}
      </button>
    </section>
  )
}
