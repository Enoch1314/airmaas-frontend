export default function GuaranteeHistory({ items }) {
  return (
    <section className="tb-guards">
      <h3>我守住过的时间</h3>
      <div className="tb-guards__list">
        {items.map((card) => (
          <article key={card.id}>
            <h4>{card.title}</h4>
            {card.items.map((row) => (
              <div
                key={`${card.id}-${row.name}`}
                className={`tb-guards__row${row.ok ? ' is-ok' : ' is-partial'}`}
              >
                <strong>{row.name}</strong>
                <p>
                  目标：{row.target}
                  <br />
                  实际：{row.actual}
                </p>
                {row.ok ? (
                  <em>✓ 完成</em>
                ) : (
                  <em>
                    未完全完成：{row.gap}
                    <br />
                    获得：{row.coin}时间币
                  </em>
                )}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}
