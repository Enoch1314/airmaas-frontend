export default function ComboResultCard({
  serviceTitle,
  routeTitle,
  fitLine,
  because,
  recommended,
  adjustFee,
  totalFee,
  recommendReason,
}) {
  return (
    <section className="ss-combo">
      <div className="ss-combo__head">
        <h3>你的本次低空组合</h3>
        {recommended ? <em>平台推荐</em> : null}
      </div>

      <div className="ss-combo__pair">
        <strong>{serviceTitle}</strong>
        <span>＋</span>
        <strong>{routeTitle}</strong>
      </div>

      <p className="ss-combo__fit">{fitLine}</p>
      <p className="ss-combo__because">因为：{because}</p>
      {recommendReason ? (
        <p className="ss-combo__reason">推荐说明：{recommendReason}</p>
      ) : null}

      <div className="ss-combo__fees">
        <div>
          <span>本次服务调整</span>
          <strong>+¥{adjustFee}</strong>
        </div>
        <div>
          <span>预计订单</span>
          <strong>¥{totalFee}</strong>
        </div>
      </div>
    </section>
  )
}
