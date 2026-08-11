import { formedInfo } from '../../data/matchingData'

export default function FormedSuccessCard({ ctx }) {
  return (
    <section className="mt-formed">
      <h3>{formedInfo.title}</h3>
      <div className="mt-formed__grid">
        <div>
          <span>班次</span>
          <strong>{formedInfo.flight}</strong>
        </div>
        <div>
          <span>集合时间</span>
          <strong>{formedInfo.gatherTime}</strong>
        </div>
        <div className="is-wide">
          <span>集合地点</span>
          <strong>{formedInfo.gatherPlace}</strong>
        </div>
        <div>
          <span>服务</span>
          <strong>{ctx.serviceTitle}</strong>
        </div>
        <div>
          <span>航线</span>
          <strong>{ctx.routeTitle}</strong>
        </div>
        <div>
          <span>座位</span>
          <strong>{formedInfo.seats}</strong>
        </div>
      </div>
    </section>
  )
}
