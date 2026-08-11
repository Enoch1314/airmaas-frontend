import { nearbySuggestions } from '../../data/activityData'

export default function NearbyCards({ onAdd }) {
  return (
    <section className="ac-nearby">
      <h3>如果还有一点时间</h3>
      <div className="ac-nearby__list">
        {nearbySuggestions.map((item) => (
          <article key={item.id} className="ac-nearby__card">
            <strong>{item.title}</strong>
            <span>
              {item.walk} · {item.duration}
            </span>
            <button type="button" onClick={() => onAdd(item)}>
              加入当前周末
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
