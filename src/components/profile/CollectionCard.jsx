export default function CollectionCard({ collection, onView, onStart }) {
  return (
    <section className="pf-collection">
      <h3>收藏与复刻</h3>
      <div className="pf-collection__grid">
        <div>
          <span>收藏的周末</span>
          <strong>{collection.savedWeekends}</strong>
        </div>
        <div>
          <span>已复刻</span>
          <strong>{collection.replicated}</strong>
        </div>
        <div>
          <span>保存的活动</span>
          <strong>{collection.savedActivities}</strong>
        </div>
      </div>
      <button type="button" className="pf-secondary" onClick={onView}>
        查看收藏
      </button>
      <button type="button" className="pf-primary" onClick={onStart}>
        开始设计新的周末
      </button>
    </section>
  )
}
