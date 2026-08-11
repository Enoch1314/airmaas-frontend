export default function ProfileSettings({ items, onClick }) {
  return (
    <section className="pf-settings">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => onClick(item)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
