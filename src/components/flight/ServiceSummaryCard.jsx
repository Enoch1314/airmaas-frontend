export default function ServiceSummaryCard({ ctx }) {
  return (
    <section className={`fe-service fe-service--${ctx.serviceMeta.tone}`}>
      <h3>当前共享服务</h3>
      <div className="fe-service__pair">
        <strong>{ctx.serviceTitle}</strong>
        <span>＋</span>
        <strong>{ctx.routeTitle}</strong>
      </div>
      <ul>
        {ctx.serviceMeta.features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
