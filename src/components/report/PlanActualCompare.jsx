export default function PlanActualCompare({ compare, lifeLabel }) {
  return (
    <section className="wr-compare">
      <h3>原计划与实际周末</h3>
      <div className="wr-compare__block">
        <span>原计划</span>
        <strong>{compare.planned.join(' + ')}</strong>
      </div>
      <div className="wr-compare__arrow" aria-hidden="true">
        ↓
      </div>
      <div className="wr-compare__block is-actual">
        <span>实际发生</span>
        <ul>
          {compare.actualSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
      <p className="wr-compare__result">
        最后结果：<b>{lifeLabel}</b>真正留给生活
      </p>
      <em>计划发生变化，但周末没有被打乱。</em>
    </section>
  )
}
