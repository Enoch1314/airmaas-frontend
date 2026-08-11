export default function LifeStamps({ stamps }) {
  return (
    <section className="wr-stamps">
      <h3>本次周末印章</h3>
      <div className="wr-stamps__grid">
        {stamps.map((stamp) => (
          <span key={stamp.id}>{stamp.label}</span>
        ))}
      </div>
    </section>
  )
}
