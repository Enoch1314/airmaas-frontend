export default function ReturnLifeCard({ ctx }) {
  const { pack } = ctx
  return (
    <section className="ra-life">
      <p>你现在还有</p>
      <strong>{pack.base.remainLabel}</strong>
      <span>可自由活动</span>
      <ul>
        <li>
          <em>{pack.base.end}</em>
          <span>结束活动</span>
        </li>
        <li>
          <em>{pack.base.returnStart}</em>
          <span>开始返程</span>
        </li>
        <li>
          <em>{pack.base.home}</em>
          <span>预计到家</span>
        </li>
      </ul>
      <div className="ra-life__guard">
        <span>关键要求：21:00 前回家</span>
        <b>正常</b>
      </div>
    </section>
  )
}
