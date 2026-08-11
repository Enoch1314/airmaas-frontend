import { anonymousPeers } from '../../data/flightExperienceData'
import { interactionOptions } from '../../data/serviceSelectData'

export default function CabinPreview({ ctx }) {
  const cabin = ctx.cabin

  return (
    <section className="fe-cabin">
      <h3>这段飞行你可以这样度过</h3>

      {cabin.type === 'sameInterest' ? (
        <>
          <p className="fe-cabin__label">互动偏好</p>
          <div className="fe-interact">
            {interactionOptions.map((item) => (
              <span
                key={item.id}
                className={ctx.interactionId === item.id ? 'is-on' : ''}
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="fe-chips">
            {['共享歌单', '活动期待投票', '城市推荐卡', '同行主题'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="fe-theme">
            本次同频主题：<strong>{ctx.serviceMeta.theme}</strong>
          </p>
          <ul className="fe-anon">
            {anonymousPeers.map((peer) => (
              <li key={peer.id}>
                <strong>{peer.name}</strong>
                <span>{peer.interest}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {cabin.type === 'companion' ? (
        <div className="fe-cabin__list">
          <div>
            <span>安静模式</span>
            <strong>已开启</strong>
          </div>
          <div>
            <span>家庭同行状态</span>
            <strong>{cabin.family}</strong>
          </div>
          <div>
            <span>无障碍提醒</span>
            <strong>{cabin.accessNote}</strong>
          </div>
          <div>
            <span>落地后</span>
            <strong>{cabin.pickupWait}</strong>
          </div>
        </div>
      ) : null}

      {cabin.type === 'rush' ? (
        <div className="fe-cabin__list">
          <div>
            <span>当前目标</span>
            <strong>{cabin.target}</strong>
          </div>
          <div>
            <span>预计落地</span>
            <strong>{cabin.landAt}</strong>
          </div>
          <div>
            <span>当前衔接状态</span>
            <strong className="is-ok">{cabin.linkStatus}</strong>
          </div>
          <div>
            <span>落地后接驳</span>
            <strong>{cabin.pickup}</strong>
          </div>
          <div>
            <span>返程保障</span>
            <strong>{cabin.returnGuard}</strong>
          </div>
        </div>
      ) : null}
    </section>
  )
}
