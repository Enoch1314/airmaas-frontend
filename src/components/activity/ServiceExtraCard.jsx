import { continueOptions } from '../../data/activityData'

export default function ServiceExtraCard({
  serviceId,
  peers,
  continuePref,
  onContinueChange,
}) {
  if (serviceId === 'sameInterest') {
    return (
      <section className="ac-extra ac-extra--violet">
        <h3>同行关系是否继续？</h3>
        <ul className="ac-peers">
          {peers.map((peer) => (
            <li key={peer.id}>
              <strong>
                {peer.name} · {peer.interest}
              </strong>
            </li>
          ))}
        </ul>
        <div className="ac-continue">
          {continueOptions.map((item) => (
            <button
              type="button"
              key={item.id}
              className={continuePref === item.id ? 'is-on' : ''}
              onClick={() => onContinueChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="ac-extra__note">
          所有互动均由用户主动选择，落地后可以随时结束。
        </p>
      </section>
    )
  }

  if (serviceId === 'companion') {
    return (
      <section className="ac-extra ac-extra--teal">
        <h3>同行状态</h3>
        <div className="ac-extra__list">
          <div>
            <span>长辈 / 儿童同行</span>
            <strong>状态正常</strong>
          </div>
          <div>
            <span>无障碍接驳</span>
            <strong>返程已预留</strong>
          </div>
          <div>
            <span>建议提前</span>
            <strong>10分钟开始准备返程</strong>
          </div>
        </div>
      </section>
    )
  }

  if (serviceId === 'rush') {
    return (
      <section className="ac-extra ac-extra--orange">
        <h3>准时到达已完成</h3>
        <div className="ac-extra__list">
          <div>
            <span>到达目标</span>
            <strong className="is-ok">✓ 14:30 前到达</strong>
          </div>
          <div>
            <span>下一关键目标</span>
            <strong>21:00 前回家</strong>
          </div>
          <div>
            <span>返程方案</span>
            <strong>已预留</strong>
          </div>
        </div>
      </section>
    )
  }

  return null
}
