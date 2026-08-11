export default function ImpactCard({ meta }) {
  return (
    <section className="ta-impact">
      <h3>本次变化对你的影响</h3>
      <div className="ta-impact__grid">
        <div>
          <span>原订单</span>
          <strong>¥{meta.orderPrice}</strong>
        </div>
        <div>
          <span>当前已使用</span>
          <strong>{meta.usedLabel}</strong>
        </div>
        <div>
          <span>低空航段</span>
          <strong>未执行</strong>
        </div>
        <div>
          <span>预计可退低空差额</span>
          <strong>¥{meta.refundAir}</strong>
        </div>
      </div>
      <p className="ta-impact__note">
        关键时间保障仍在生效。如果最终未能实现已确认的保障目标，将按规则提供时间币等内部服务权益。
      </p>
      <div className="ta-bank">
        <strong>周末时间银行</strong>
        <span>本次调整结果和时间保障完成情况将在行程结束后统一记录。</span>
      </div>
    </section>
  )
}
