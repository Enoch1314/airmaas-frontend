const OPTIONS = [
  { id: 20, label: '多逛 20 分钟' },
  { id: 40, label: '多逛 40 分钟' },
  { id: 0, label: '按原计划' },
]

export default function ExtendStayCard({ selected, result, onSelect, onReplan }) {
  return (
    <section className="ac-extend">
      <h3>想多待一会儿？</h3>
      <div className="ac-extend__options">
        {OPTIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={selected === item.id ? 'is-on' : ''}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {result && selected !== null ? (
        <div className="ac-extend__result">
          <p>
            新的活动结束：<strong>{result.end}</strong>
          </p>
          <p>
            新的预计到家：<strong>{result.home}</strong>
          </p>
          {result.warning ? (
            <div className="ac-alert is-warn">
              <p>{result.warning}</p>
              <button type="button" onClick={onReplan}>
                重新安排返程
              </button>
            </div>
          ) : null}
          {result.okMessage ? (
            <div className="ac-alert is-ok">
              <p>{result.okMessage}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
