export default function ProfileStats({ stats, onOpenBank }) {
  return (
    <section className="pf-stats">
      <div className="pf-stats__grid">
        <div>
          <span>完成周末</span>
          <strong>{stats.weekends}次</strong>
        </div>
        <div className="is-life">
          <span>累计回收生活时间</span>
          <strong>{stats.totalLifeLabel}</strong>
        </div>
        <div>
          <span>周末记忆</span>
          <strong>{stats.memories}条</strong>
        </div>
        <div>
          <span>时间币</span>
          <strong>{stats.timeCoins}</strong>
        </div>
      </div>
      <button type="button" className="pf-secondary" onClick={onOpenBank}>
        查看周末时间银行
      </button>
    </section>
  )
}
