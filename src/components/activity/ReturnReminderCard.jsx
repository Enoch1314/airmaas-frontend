export default function ReturnReminderCard({
  meta,
  end,
  returnStart,
  home,
  onViewReturn,
}) {
  return (
    <section className="ac-return">
      <h3>返程提醒</h3>
      <p className="ac-return__count">
        距离建议返程准备还有
        <strong>{meta.returnPrepIn}</strong>
      </p>
      <ul>
        <li>
          <span>{end}</span>
          <em>结束活动</em>
        </li>
        <li>
          <span>{returnStart}</span>
          <em>开始返程</em>
        </li>
        <li>
          <span>{home}</span>
          <em>预计到家</em>
        </li>
      </ul>
      <button type="button" className="ac-primary" onClick={onViewReturn}>
        查看返程安排
      </button>
    </section>
  )
}
