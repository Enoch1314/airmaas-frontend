export default function MonthlyTrend({ records, monthlyLabel }) {
  return (
    <section className="tb-month">
      <h3>这个月，你把多少时间还给了生活？</h3>
      <ul>
        {records.map((item) => (
          <li key={item.id}>
            <div className="tb-month__meta">
              <span>{item.date}</span>
              <strong>{item.title}</strong>
              <em>+{item.minutes}分钟</em>
            </div>
            <div className="tb-month__bar" aria-hidden="true">
              <i style={{ width: `${item.bar}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p>
        本月累计 <b>{monthlyLabel}</b>
      </p>
    </section>
  )
}
