export default function TimeBankResultCard({ bank, onOpen }) {
  return (
    <section className="tr-bank">
      <div className="tr-bank__brand">周末时间银行</div>
      <h3>本次记录</h3>
      <div className="tr-bank__grid">
        <div>
          <span>回收生活时间</span>
          <strong>{bank.recoveredLabel}</strong>
        </div>
        <div>
          <span>关键时间保障完成</span>
          <strong>{bank.guaranteeScore}</strong>
        </div>
        <div>
          <span>本次获得时间币</span>
          <strong>{bank.timeCoinReward}</strong>
        </div>
        <div>
          <span>累计时间币</span>
          <strong>{bank.cumulativeCoins}</strong>
        </div>
      </div>
      <p>
        累计回收生活时间 <b>{bank.cumulativeLifeLabel}</b>
      </p>
      <button type="button" className="tr-primary" onClick={onOpen}>
        查看周末时间银行
      </button>
    </section>
  )
}
