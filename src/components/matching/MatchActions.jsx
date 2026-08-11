import { adjacentSlots, hubOptions } from '../../data/matchingData'

export default function MatchActions({
  selectedSlot,
  selectedHub,
  onInvite,
  onSelectSlot,
  onSelectHub,
  onUseTimeCoin,
}) {
  return (
    <section className="mt-actions">
      <h3>可以做什么</h3>

      <button type="button" className="mt-action-primary" onClick={onInvite}>
        邀请好友同行
        <span>邀请好友</span>
      </button>

      <div className="mt-action-block">
        <p>接受相邻时段</p>
        <div className="mt-chip-row">
          {adjacentSlots.map((slot) => (
            <button
              type="button"
              key={slot.id}
              className={`mt-chip${selectedSlot === slot.id ? ' is-on' : ''}`}
              onClick={() => onSelectSlot(slot.id)}
            >
              {slot.time}
            </button>
          ))}
        </div>
        {selectedSlot ? (
          <em>接受相邻时段可提高匹配成功机会</em>
        ) : null}
      </div>

      <div className="mt-action-block">
        <p>切换汇聚枢纽</p>
        <div className="mt-chip-row">
          {hubOptions.map((hub) => (
            <button
              type="button"
              key={hub.id}
              className={`mt-chip${selectedHub === hub.id ? ' is-on' : ''}`}
              onClick={() => onSelectHub(hub.id)}
            >
              {hub.label}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="mt-timecoin" onClick={onUseTimeCoin}>
        <strong>使用时间币兑换优先匹配权益</strong>
        <span>仅影响平台服务匹配顺序，不改变航空运行和安全规则。</span>
      </button>
    </section>
  )
}
