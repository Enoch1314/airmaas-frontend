export default function WeekendKeywords({ keywords }) {
  return (
    <section className="nc-keywords">
      <h3>你的周末关键词</h3>
      <div className="nc-keywords__list">
        {keywords.map((word) => (
          <span
            key={word}
            className={`nc-keyword${word === '轻松' ? ' is-warm' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}
