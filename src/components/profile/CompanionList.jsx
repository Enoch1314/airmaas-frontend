export default function CompanionList({ items, onManage }) {
  return (
    <section className="pf-companions">
      <h3>常用同行人</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="pf-secondary" onClick={onManage}>
        管理同行人
      </button>
    </section>
  )
}
