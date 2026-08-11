export default function OrderIncludes({ items }) {
  return (
    <section className="oc-includes">
      <h3>本次包含</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>✓ {item.label}</li>
        ))}
      </ul>
    </section>
  )
}
