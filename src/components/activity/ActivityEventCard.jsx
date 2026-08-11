export default function ActivityEventCard({ meta, onTicket }) {
  return (
    <section className="ac-event">
      <h3>今天的活动</h3>
      <div className="ac-event__main">
        <strong>西岸美术馆</strong>
        <span>当代艺术特展</span>
      </div>
      <div className="ac-event__grid">
        <div>
          <span>时间</span>
          <strong>
            {meta.start}—{meta.end}
          </strong>
        </div>
        <div>
          <span>状态</span>
          <strong className="is-on">进行中</strong>
        </div>
        <div>
          <span>电子凭证</span>
          <strong>已核销</strong>
        </div>
        <div>
          <span>同行</span>
          <strong>朋友 · 2人</strong>
        </div>
      </div>
      <button type="button" className="ac-text-btn" onClick={onTicket}>
        查看电子凭证
      </button>
    </section>
  )
}
