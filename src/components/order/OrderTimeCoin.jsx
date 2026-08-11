import { timeCoinConfig } from '../../data/orderConfirmData'

export default function OrderTimeCoin({ enabled, onToggle }) {
  return (
    <section className={`oc-coin${enabled ? ' is-on' : ''}`}>
      <div className="oc-coin__top">
        <div>
          <h3>使用时间币</h3>
          <p>当前：{timeCoinConfig.balance} 时间币</p>
        </div>
        <button
          type="button"
          className={`oc-switch${enabled ? ' is-on' : ''}`}
          aria-pressed={enabled}
          onClick={onToggle}
        >
          <span />
        </button>
      </div>
      <p className="oc-coin__desc">使用时间币抵扣部分平台服务权益</p>
      {enabled ? (
        <p className="oc-coin__effect">
          使用 {timeCoinConfig.useAmount} 时间币 · 本次优惠 ¥{timeCoinConfig.discountYen}
        </p>
      ) : null}
      <p className="oc-coin__note">
        时间币仅用于 AirMaaS 平台内部服务权益，不支持现金交易或投资收益。
      </p>
    </section>
  )
}
