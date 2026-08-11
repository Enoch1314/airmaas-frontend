export default function MemoryList({ items, onAction, onViewAll }) {
  return (
    <section className="pf-memories">
      <h3>我的周末记忆</h3>
      <div className="pf-memories__list">
        {items.map((item) => (
          <article key={item.id}>
            <h4>{item.title}</h4>
            <span>{item.date}</span>
            <div className="pf-tags">
              {item.tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </div>
            <p>{item.lifeLabel}</p>
            <button type="button" onClick={() => onAction(item)}>
              {item.actionLabel}
            </button>
          </article>
        ))}
      </div>
      <button type="button" className="pf-link" onClick={onViewAll}>
        查看全部周末记忆 &gt;
      </button>
    </section>
  )
}
