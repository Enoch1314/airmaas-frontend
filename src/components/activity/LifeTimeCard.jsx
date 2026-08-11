export default function LifeTimeCard({ meta, progress }) {
  return (
    <section className="ac-life">
      <p>你还有</p>
      <strong>
        {meta.remainLabel}
      </strong>
      <span>可自由活动</span>
      <div className="ac-life__meta">
        <div>
          <em>预计 {meta.end} 开始准备返程</em>
          <em>21:00 前回家 · 保障状态正常</em>
        </div>
      </div>
      <div className="ac-progress" aria-hidden="true">
        <i style={{ width: `${progress.used}%` }} className="is-used" />
        <i style={{ width: `${progress.remain}%` }} className="is-remain" />
        <i style={{ width: `${progress.returning}%` }} className="is-return" />
      </div>
      <div className="ac-progress__legend">
        <span>已使用</span>
        <span>剩余活动</span>
        <span>返程预留</span>
      </div>
    </section>
  )
}
