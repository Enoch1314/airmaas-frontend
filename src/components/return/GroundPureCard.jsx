export default function GroundPureCard({ option, selected, onSelect }) {
  return (
    <section className={`ra-ground${selected ? ' is-selected' : ''}`}>
      <h3>{option.title}</h3>
      <div className="ra-ground__meta">
        <div>
          <span>预计</span>
          <strong>
            {option.depart} 出发 · {option.home} 到家
          </strong>
        </div>
        <div>
          <span>费用</span>
          <strong>约 ¥{option.feeDelta}</strong>
        </div>
        <div>
          <span>换乘</span>
          <strong>{option.transfers}次</strong>
        </div>
        <div>
          <span>状态</span>
          <strong className="is-ok">✓ 仍可满足21:00前返程</strong>
        </div>
      </div>
      <p>{option.note}</p>
      <button type="button" className="ra-secondary" onClick={() => onSelect(option.id)}>
        选择纯地面返程
      </button>
    </section>
  )
}
