export default function CoinLedger({ open, onToggle, items }) {
  return (
    <section className="tb-ledger">
      <button type="button" className="tb-ledger__toggle" onClick={onToggle}>
        <h3>时间币记录</h3>
        <span>{open ? '收起' : '展开'}</span>
      </button>
      {open ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.date}</span>
                <strong>{item.title}</strong>
              </div>
              <em className={item.delta > 0 ? 'is-plus' : item.delta < 0 ? 'is-minus' : ''}>
                {item.delta > 0 ? `+${item.delta}` : item.delta}
              </em>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
