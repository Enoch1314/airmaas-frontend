export default function InteractionPrefs({ options, value, onChange }) {
  return (
    <section className="ss-interact">
      <h3>同行互动偏好</h3>
      <div className="ss-interact__row" role="radiogroup" aria-label="同行互动偏好">
        {options.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`ss-interact__btn${value === item.id ? ' is-on' : ''}`}
            onClick={() => onChange(item.id)}
            aria-pressed={value === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}
