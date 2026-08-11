export default function OrderServiceCard({ ctx }) {
  return (
    <section className="oc-service">
      <h3>共享服务</h3>
      <div className="oc-service__pair">
        <strong>{ctx.serviceTitle}</strong>
        <span>＋</span>
        <strong>{ctx.routeTitle}</strong>
      </div>
      {ctx.serviceId === 'sameInterest' ? (
        <p>
          互动偏好：<em>{ctx.interactionLabel}</em>
        </p>
      ) : null}
    </section>
  )
}
