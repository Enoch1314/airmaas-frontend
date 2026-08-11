export default function AltOptionCard({ option, selected, onSelect }) {
  return (
    <article
      className={`ta-option ta-option--${option.tone}${selected ? ' is-selected' : ''}${
        option.isCancel ? ' is-cancel' : ''
      }`}
    >
      <div className="ta-option__head">
        <h3>{option.title}</h3>
        {option.badge ? <em>{option.badge}</em> : null}
      </div>
      <p className="ta-option__mode">{option.mode}</p>
      {!option.isCancel ? (
        <div className="ta-option__grid">
          <div>
            <span>预计到达/开始</span>
            <strong>{option.arrive}</strong>
          </div>
          <div>
            <span>预计可活动</span>
            <strong>{option.lifeTime}</strong>
          </div>
          <div>
            <span>预计到家</span>
            <strong>{option.home}</strong>
          </div>
          <div>
            <span>费用变化</span>
            <strong>{option.feeLabel}</strong>
          </div>
        </div>
      ) : (
        <p className="ta-option__note">{option.note}</p>
      )}
      {!option.isCancel ? (
        <div className="ta-option__guards">
          <span className={option.activityOk === true ? 'is-ok' : option.activityOk === 'partial' ? 'is-warn' : 'is-bad'}>
            活动时长保障：
            {option.activityOk === true
              ? `✓ ${option.activityNote}`
              : option.activityOk === 'partial'
                ? `⚠ ${option.activityNote}`
                : option.activityNote}
          </span>
          <span className={option.returnOk ? 'is-ok' : 'is-bad'}>
            返程保障：{option.returnOk ? '✓ 21:00前回家' : '需重新结算'}
          </span>
        </div>
      ) : null}
      {option.features?.length ? (
        <div className="ta-chips">
          {option.features.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      {option.note && !option.isCancel ? (
        <p className="ta-option__note">{option.note}</p>
      ) : null}
      {option.coinHint ? (
        <p className="ta-option__coin">
          因平台运行调整导致活动保障未完全实现，预计获得相应时间币补偿。
        </p>
      ) : null}
      <button
        type="button"
        className={option.isCancel ? 'ta-secondary' : 'ta-primary'}
        onClick={() => onSelect(option.id)}
      >
        {option.cta}
      </button>
    </article>
  )
}
