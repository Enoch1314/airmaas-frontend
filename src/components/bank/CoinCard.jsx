export default function CoinCard({ coins, open, onToggle }) {
  return (
    <section className="tb-coin">
      <div className="tb-coin__head">
        <h3>我的时间币</h3>
        <button type="button" className="tb-info" onClick={onToggle} aria-label="说明">
          i
        </button>
      </div>
      <div className="tb-coin__balance">
        <span>当前余额</span>
        <strong>{coins}</strong>
      </div>
      <p>时间币是 AirMaaS 平台内部服务权益，用于后续出行和周末服务。</p>
      {open ? (
        <div className="tb-coin__tip">
          <strong>不能用于</strong>
          <ul>
            <li>现金提现</li>
            <li>买卖交易</li>
            <li>投资增值</li>
          </ul>
        </div>
      ) : null}
    </section>
  )
}
