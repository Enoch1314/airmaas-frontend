export default function RedeemCatalog({ items, onRedeem }) {
  return (
    <section className="tb-redeem">
      <h3>时间币可以这样用</h3>
      <div className="tb-redeem__list">
        {items.map((item) => (
          <article key={item.id}>
            <div className="tb-redeem__head">
              <h4>{item.title}</h4>
              <em>{item.cost} 时间币</em>
            </div>
            <p>{item.desc}</p>
            {item.note ? <span>{item.note}</span> : null}
            <button type="button" className="tb-mini" onClick={() => onRedeem(item)}>
              兑换
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
