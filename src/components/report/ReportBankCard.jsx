export default function ReportBankCard({ bank, onOpen }) {
  return (
    <section className="wr-bank">
      <h3>周末时间银行</h3>
      <div className="wr-bank__grid">
        <div>
          <span>本次回收</span>
          <strong>{bank.recoveredLabel}</strong>
        </div>
        <div>
          <span>关键时间保障</span>
          <strong>{bank.guaranteeScore}</strong>
        </div>
        <div>
          <span>本次时间币</span>
          <strong>{bank.timeCoinReward}</strong>
        </div>
        <div>
          <span>累计时间币</span>
          <strong>{bank.cumulativeCoins}</strong>
        </div>
      </div>
      <p>
        累计生活时间 <b>{bank.cumulativeLifeLabel}</b>
      </p>
      <button type="button" className="wr-secondary" onClick={onOpen}>
        查看周末时间银行
      </button>
    </section>
  )
}
