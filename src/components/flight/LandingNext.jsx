export default function LandingNext({ landing, onContinue }) {
  return (
    <section className="fe-landing">
      <h3>落地后</h3>
      <div className="fe-landing__flow">
        {landing.flow.map((item, index) => (
          <span key={item}>
            {item}
            {index < landing.flow.length - 1 ? <i>→</i> : null}
          </span>
        ))}
      </div>
      <p>预计：{landing.eta}</p>
      <button type="button" className="fe-primary" onClick={onContinue}>
        模拟落地并继续
      </button>
    </section>
  )
}
