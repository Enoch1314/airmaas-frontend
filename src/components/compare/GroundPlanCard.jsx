export default function GroundPlanCard({ plan, onSelect }) {
  return (
    <section className="cp-ground">
      <div className="cp-ground__head">
        <h3>{plan.name}</h3>
        <span>基准对照</span>
      </div>

      <div className="cp-ground__grid">
        <div>
          <span>真正留给活动</span>
          <strong>{plan.lifeTime}</strong>
        </div>
        <div>
          <span>总交通及等待</span>
          <strong>{plan.trafficTime}</strong>
        </div>
        <div>
          <span>费用</span>
          <strong>{plan.price}</strong>
        </div>
        <div>
          <span>换乘</span>
          <strong>{plan.transfers}</strong>
        </div>
      </div>

      <p>{plan.note}</p>

      <button type="button" className="cp-ground-btn" onClick={() => onSelect?.(plan)}>
        仅使用纯地面方案
      </button>
    </section>
  )
}
