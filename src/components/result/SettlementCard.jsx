export default function SettlementCard({ result, activityTarget }) {
  const allDone = result.guaranteeCompleted
  const shortfall = Math.max(
    0,
    result.activityGuaranteeTarget - result.activityActual,
  )

  return (
    <section className={`tr-settle${allDone ? ' is-ok' : ' is-partial'}`}>
      <h3>时间保障结算</h3>
      <div className="tr-settle__status">
        <span>本次关键时间保障</span>
        <strong>{allDone ? '全部完成' : '部分未完全实现'}</strong>
      </div>

      {allDone ? (
        <>
          <div className="tr-settle__coin">
            <span>时间币补偿</span>
            <em>0</em>
          </div>
          <p>本次保障结果已记录到「周末时间银行」。</p>
        </>
      ) : (
        <>
          <div className="tr-settle__gap">
            <div>
              <span>活动时长保障目标</span>
              <strong>{activityTarget?.short || activityTarget?.target}</strong>
            </div>
            <div>
              <span>实际</span>
              <strong>{result.actualLifeLabel}</strong>
            </div>
            <div>
              <span>差额</span>
              <strong>{shortfall} 分钟</strong>
            </div>
          </div>
          <div className="tr-settle__coin is-reward">
            <span>本次获得时间币</span>
            <em>{result.timeCoinReward}</em>
          </div>
          <p>
            用于后续优先拼班、改签、活动权益或其他平台内部服务。
          </p>
        </>
      )}
    </section>
  )
}
