export default function FlightStatusCard({ ctx, onOpenCompanions }) {
  return (
    <section className="it-flight">
      <div className="it-flight__head">
        <h3>共享班次</h3>
        <em>已确认</em>
      </div>
      <div className="it-flight__grid">
        <div className="is-wide">
          <span>集合</span>
          <strong>
            {ctx.flight.gatherTime} · {ctx.flight.place}
          </strong>
        </div>
        <div>
          <span>预计起飞</span>
          <strong>{ctx.flight.takeoff}</strong>
        </div>
        <div>
          <span>人数</span>
          <strong>{ctx.flight.seats}</strong>
        </div>
        <div>
          <span>服务</span>
          <strong>{ctx.serviceTitle}</strong>
        </div>
        <div>
          <span>航线</span>
          <strong>{ctx.routeTitle}</strong>
        </div>
      </div>
      <button type="button" className="it-text-btn" onClick={onOpenCompanions}>
        查看同行状态
      </button>
    </section>
  )
}
