export default function OriginalReturnCard({ ctx, onKeep }) {
  const { pack } = ctx
  return (
    <section className="ra-original">
      <h3>原返程安排</h3>
      <p className="ra-original__time">
        <strong>{pack.base.returnStart}</strong>
        从西岸区域出发
      </p>
      <div className="ra-original__flow">
        目的地接驳 <i>→</i> 共享低空 <i>→</i> 地面交通
      </div>
      <div className="ra-original__meta">
        <div>
          <span>服务</span>
          <strong>{ctx.serviceTitle}</strong>
        </div>
        <div>
          <span>航线</span>
          <strong>{ctx.routeTitle}</strong>
        </div>
        <div>
          <span>预计到家</span>
          <strong>{pack.base.home}</strong>
        </div>
        <div>
          <span>状态</span>
          <strong className="is-ok">满足返程保障</strong>
        </div>
      </div>
      <button type="button" className="ra-secondary" onClick={onKeep}>
        按原计划返回
      </button>
    </section>
  )
}
