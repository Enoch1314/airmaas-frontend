import { scenicNodes } from '../../data/flightExperienceData'

export default function ScenicExperience({
  flightMinutes,
  guideOn,
  onToggleGuide,
}) {
  return (
    <section className="fe-scenic">
      <h3>天空散步航线</h3>
      <p className="fe-scenic__time">本次预计飞行：约 {flightMinutes} 分钟</p>
      <div className="fe-scenic__nodes">
        {scenicNodes.map((node) => (
          <span key={node.id}>{node.label}</span>
        ))}
      </div>
      <p className="fe-scenic__guide">
        当前数字导览：
        <strong>从城市外围进入核心滨水文化带</strong>
      </p>
      <button type="button" className="fe-secondary" onClick={onToggleGuide}>
        {guideOn ? '关闭导览' : '开启数字导览'}
      </button>
    </section>
  )
}
