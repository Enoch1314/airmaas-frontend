export default function PromiseCompare({ items }) {
  return (
    <section className="tr-promise">
      <h3>这次我们守住了吗？</h3>
      <div className="tr-promise__list">
        {items.map((item) => (
          <article
            key={item.id}
            className={`tr-promise__card is-${item.status}`}
          >
            <header>
              <h4>{item.title}</h4>
              <em>{item.statusLabel}</em>
            </header>
            <div className="tr-promise__grid">
              <div>
                <span>目标</span>
                <strong>{item.targetLabel || item.target}</strong>
              </div>
              <div>
                <span>实际</span>
                <strong>{item.actual}</strong>
              </div>
            </div>
            <p>{item.deltaLabel}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
