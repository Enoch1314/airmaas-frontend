export default function PrivacyBlock({ items, onOpen }) {
  return (
    <section className="pf-privacy">
      <h3>隐私与数据</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="pf-secondary" onClick={onOpen}>
        隐私设置 &gt;
      </button>
    </section>
  )
}
