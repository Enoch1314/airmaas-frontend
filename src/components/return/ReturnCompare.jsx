export default function ReturnCompare({ options, groundFast }) {
  const early = options.find((item) => item.id === 'early')
  const original = options.find((item) => item.id === 'original')
  const delay = options.find((item) => item.id === 'delay')

  return (
    <section className="ra-compare">
      <h3>返程方案比较</h3>
      <div className="ra-compare__table">
        <div className="ra-compare__row is-head">
          <span />
          <span>提前</span>
          <span>原计划</span>
          <span>延后</span>
        </div>
        <div className="ra-compare__row">
          <span>出发</span>
          <span>{early.depart}</span>
          <span>{original.depart}</span>
          <span>{delay.depart}</span>
        </div>
        <div className="ra-compare__row">
          <span>到家</span>
          <span>{early.home}</span>
          <span>{original.home}</span>
          <span>{delay.home}</span>
        </div>
        <div className="ra-compare__row">
          <span>活动变化</span>
          <span>-20分</span>
          <span>不变</span>
          <span>+20分</span>
        </div>
        <div className="ra-compare__row">
          <span>返程保障</span>
          <span className="is-ok">满足</span>
          <span className="is-ok">满足</span>
          <span className="is-warn">不满足</span>
        </div>
        <div className="ra-compare__row">
          <span>费用变化</span>
          <span>¥0</span>
          <span>¥0</span>
          <span>¥0</span>
        </div>
      </div>
      {groundFast ? (
        <p className="ra-compare__note">
          若选择快速地面替代：到家 {groundFast.home} · 费用 +¥{groundFast.feeDelta} ·
          保障满足
        </p>
      ) : null}
    </section>
  )
}
