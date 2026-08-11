export default function SelectedSummary({ selected, baseEstimate }) {
  if (!selected) return null

  return (
    <section className="ra-selected">
      <h3>你选择的返程</h3>
      <strong>{selected.title}</strong>
      <div className="ra-selected__grid">
        <div>
          <span>出发</span>
          <em>{selected.depart}</em>
        </div>
        <div>
          <span>到家</span>
          <em>{selected.home}</em>
        </div>
        <div>
          <span>活动时间</span>
          <em>
            {selected.activityDelta
              ? `${selected.activityDelta > 0 ? '多留' : '减少'}${Math.abs(selected.activityDelta)}分钟`
              : baseEstimate}
          </em>
        </div>
        <div>
          <span>返程保障</span>
          <em className={selected.meets ? 'is-ok' : 'is-warn'}>
            {selected.meets ? '✓ 21:00前回家' : '无法满足'}
          </em>
        </div>
        <div className="is-wide">
          <span>费用变化</span>
          <em>{selected.feeDelta ? `+¥${selected.feeDelta}` : '¥0'}</em>
        </div>
      </div>
    </section>
  )
}
