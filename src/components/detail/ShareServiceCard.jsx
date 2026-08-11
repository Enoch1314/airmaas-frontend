export default function ShareServiceCard({ plan }) {
  return (
    <section className="pd-service">
      <h3>本次共享服务</h3>
      <div className="pd-service__grid">
        <div>
          <span>服务方式</span>
          <strong>{plan.cabin}</strong>
        </div>
        <div>
          <span>航线</span>
          <strong>{plan.routeType}</strong>
        </div>
        <div>
          <span>共享状态</span>
          <strong>{plan.shareStatus}</strong>
        </div>
        <div>
          <span>预计成班</span>
          <strong>{plan.formStatus}</strong>
        </div>
      </div>

      <div className="pd-service__features">
        {plan.features.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <p>{plan.serviceNote}</p>
    </section>
  )
}
