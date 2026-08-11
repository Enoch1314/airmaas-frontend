export default function WhyLowAltitude({ plan }) {
  return (
    <section className="pd-why">
      <h3>{plan.whyTitle}</h3>
      <p>{plan.whyLead}</p>
      <p className="pd-why__metric">
        <em>{plan.recoveredTime}</em>
        <span>分钟</span>
      </p>
      <p className="pd-why__note">{plan.whyTail}</p>
    </section>
  )
}
