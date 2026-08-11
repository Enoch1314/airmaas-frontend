export default function LifeResultCard({ result }) {
  return (
    <section className="tr-life">
      <p>真正留给生活</p>
      <strong>{result.actualLifeLabel}</strong>
      <div className="tr-life__meta">
        <div>
          <span>你原本有</span>
          <em>6小时周末时间</em>
        </div>
        <div>
          <span>交通、换乘与等待</span>
          <em>{result.transitLabel}</em>
        </div>
        <div>
          <span>真正用于活动 / 陪伴 / 休闲</span>
          <em>{result.actualLifeLabel}</em>
        </div>
      </div>
      <div className="tr-life__gain">
        比纯地面原方案多留 <b>{result.recoveredTime} 分钟</b> 给生活
      </div>
    </section>
  )
}
