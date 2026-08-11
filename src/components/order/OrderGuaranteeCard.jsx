export default function OrderGuaranteeCard({ items, onEdit }) {
  return (
    <section className="oc-guarantee">
      <div className="oc-guarantee__head">
        <h3>你已选择的关键时间保障</h3>
        <button type="button" onClick={onEdit}>
          修改 {'>'}
        </button>
      </div>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>✓ {item.title}</strong>
              <span>{item.target}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="oc-guarantee__empty">本次未添加关键时间保障</p>
      )}
    </section>
  )
}
