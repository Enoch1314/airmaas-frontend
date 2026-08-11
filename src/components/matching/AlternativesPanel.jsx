import { alternatives } from '../../data/matchingData'

export default function AlternativesPanel({
  selectedId,
  onSelect,
  emphasized,
}) {
  return (
    <section className={`mt-alts${emphasized ? ' is-emphasis' : ''}`}>
      <h3>{emphasized ? '可选替代方案' : '若未成班，可选方案'}</h3>
      {emphasized ? (
        <p className="mt-alts__lead">你的周末计划仍然可以继续。</p>
      ) : null}
      <ul>
        {alternatives.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`mt-alt mt-alt--${item.tone}${
                selectedId === item.id ? ' is-on' : ''
              }`}
              onClick={() => onSelect(item.id)}
            >
              <div>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
              <em>{item.action}</em>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
