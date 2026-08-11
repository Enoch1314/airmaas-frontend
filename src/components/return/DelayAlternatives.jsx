export default function DelayAlternatives({
  alternatives,
  selectedId,
  onSelect,
  onConfirmKeep,
}) {
  return (
    <section className="ra-alts">
      <h3>想多待一会儿，我们再看看其他回法。</h3>
      <ul>
        {alternatives.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`ra-alt${selectedId === item.id ? ' is-on' : ''}${
                item.meets ? '' : ' is-bad'
              }`}
              onClick={() => {
                if (item.id === 'delayKeep') onConfirmKeep(item)
                else onSelect(item.id)
              }}
            >
              <div>
                <strong>{item.title}</strong>
                <span>
                  {item.depart} 出发 · {item.home} 到家
                  {item.feeDelta ? ` · +¥${item.feeDelta}` : ''}
                </span>
                <em>{item.note}</em>
              </div>
              <b>{item.meets ? '✓ 满足' : '不满足'}</b>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
