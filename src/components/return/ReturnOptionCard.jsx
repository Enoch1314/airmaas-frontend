export default function ReturnOptionCard({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`ra-option${selected ? ' is-selected' : ''}${
        option.warn ? ' is-warn' : ''
      }${option.recommended ? ' is-rec' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
    >
      <div className="ra-option__head">
        <h3>{option.title}</h3>
        {option.recommended ? <em>推荐</em> : null}
      </div>
      <div className="ra-option__times">
        <div>
          <span>出发</span>
          <strong>{option.depart}</strong>
        </div>
        <div>
          <span>预计到家</span>
          <strong>{option.home}</strong>
        </div>
      </div>
      <p className="ra-option__delta">{option.activityDeltaLabel}</p>
      {option.features?.length ? (
        <div className="ra-chips">
          {option.features.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      <div className={`ra-option__status${option.meets ? ' is-ok' : ' is-bad'}`}>
        {option.meets ? '✓ 满足 21:00 前回家' : '⚠ 可能无法满足 21:00 前返程保障'}
      </div>
      <span className="ra-option__cta">
        {option.id === 'early'
          ? '选择提前返回'
          : option.id === 'original'
            ? '保持原计划'
            : '查看还能怎么调整'}
      </span>
    </button>
  )
}
