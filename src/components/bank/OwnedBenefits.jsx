export default function OwnedBenefits({ items, onUse }) {
  return (
    <section className="tb-owned">
      <h3>我的可用权益</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>
                {item.title} ×{item.count}
              </strong>
              <span>有效期：{item.expire}</span>
            </div>
            <button type="button" onClick={() => onUse(item)}>
              去使用 &gt;
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
