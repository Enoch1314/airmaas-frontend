export default function TimeCoreHint({ duration }) {
  const number = String(duration).replace(/[^\d]/g, '') || '6'

  return (
    <section className="nc-time-core">
      <p className="nc-time-core__label">你有</p>
      <p className="nc-time-core__metric">
        <em>{number}</em>
        <span>小时周末时间</span>
      </p>
      <p className="nc-time-core__desc">
        AirMaaS 接下来会比较不同交通和活动组合，看看怎样为你留下更多真正用于生活的时间。
      </p>
    </section>
  )
}
