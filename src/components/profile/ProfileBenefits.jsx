export default function ProfileBenefits({ items, onOpen }) {
  return (
    <section className="pf-benefits">
      <h3>我的可用权益</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} ×{item.count}
          </li>
        ))}
      </ul>
      <button type="button" className="pf-link" onClick={onOpen}>
        查看全部 &gt;
      </button>
    </section>
  )
}
