export default function FactCard({ scene }) {
  return (
    <section className="ta-fact">
      <div className="ta-fact__badge">{scene.label}</div>
      <h2>{scene.factTitle}</h2>
      <div className="ta-fact__block">
        <span>原因</span>
        <p>{scene.reason}</p>
      </div>
      <div className="ta-fact__block">
        <span>影响</span>
        <p>{scene.impact}</p>
      </div>
      <div className="ta-fact__block is-safe">
        <span>安全说明</span>
        <p>{scene.safety}</p>
      </div>
    </section>
  )
}
