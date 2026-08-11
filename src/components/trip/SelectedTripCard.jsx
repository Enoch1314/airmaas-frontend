export default function SelectedTripCard({ option, onConfirm }) {
  if (!option || option.isCancel) return null

  return (
    <section className="ta-selected">
      <h3>你选择的新安排</h3>
      <strong>{option.title}</strong>
      <div className="ta-selected__grid">
        <div>
          <span>开始</span>
          <em>{option.arrive}</em>
        </div>
        <div>
          <span>预计活动时间</span>
          <em>{option.lifeTime}</em>
        </div>
        <div>
          <span>预计到家</span>
          <em>{option.home}</em>
        </div>
        <div>
          <span>费用变化</span>
          <em>{option.feeLabel}</em>
        </div>
      </div>
      <div className="ta-selected__guards">
        <span className={option.activityOk === true ? 'is-ok' : 'is-warn'}>
          {option.activityOk === true
            ? '✓ 活动时长满足'
            : `⚠ ${option.activityNote}`}
        </span>
        <span className={option.returnOk ? 'is-ok' : 'is-warn'}>
          {option.returnOk ? '✓ 返程保障满足' : '返程需重新确认'}
        </span>
      </div>
      {option.coinHint ? (
        <div className="ta-coin-box">
          <strong>活动时长保障：{option.activityNote}</strong>
          <p>
            由于本次变化来自平台运行调整，行程完成后将根据实际结果结算相应时间币。
          </p>
          <em>预计补偿：待行程完成后结算</em>
        </div>
      ) : null}
      <button type="button" className="ta-primary" onClick={onConfirm}>
        确认并更新数字行程
      </button>
    </section>
  )
}
