export default function MatchBriefCard({ ctx }) {
  return (
    <section className="mt-brief">
      <div className="mt-brief__head">
        <span>{ctx.plan.planType}方案</span>
        <strong>
          {ctx.serviceTitle} + {ctx.routeTitle}
        </strong>
      </div>
      <div className="mt-brief__route">
        <em>青浦汇聚枢纽</em>
        <span>→</span>
        <em>西岸区域</em>
      </div>
      <div className="mt-brief__meta">
        <div>
          <span>预计起飞</span>
          <strong>14:00</strong>
        </div>
        <div>
          <span>返程</span>
          <strong>21:00 前</strong>
        </div>
      </div>
    </section>
  )
}
