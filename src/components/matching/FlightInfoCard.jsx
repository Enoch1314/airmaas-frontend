export default function FlightInfoCard({ ctx, matched, status }) {
  const matchedCount =
    status === 'matching' ? matched : status === 'notFormed' ? matched : 4

  return (
    <section className="mt-info">
      <h3>当前成班信息</h3>
      <div className="mt-info__grid">
        <div>
          <span>汇聚枢纽</span>
          <strong>青浦汇聚枢纽</strong>
        </div>
        <div>
          <span>目标区域</span>
          <strong>西岸美术馆片区</strong>
        </div>
        <div>
          <span>预计起飞</span>
          <strong>14:00</strong>
        </div>
        <div>
          <span>当前服务</span>
          <strong>{ctx.serviceTitle}</strong>
        </div>
        <div>
          <span>航线</span>
          <strong>{ctx.routeTitle}</strong>
        </div>
        <div>
          <span>座位需求</span>
          <strong>4人</strong>
        </div>
        <div>
          <span>已匹配</span>
          <strong>{matchedCount}人</strong>
        </div>
        <div>
          <span>预计成班可能性</span>
          <strong className="is-warm">较高</strong>
        </div>
      </div>
    </section>
  )
}
