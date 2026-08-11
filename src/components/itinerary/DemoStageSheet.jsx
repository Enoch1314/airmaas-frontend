const DEMO_STAGES = [
  { id: 'toHub', index: '①', label: '前往汇聚点', code: 'toHub' },
  { id: 'waiting', index: '②', label: '等待登乘', code: 'waiting' },
  { id: 'flying', index: '③', label: '飞行中', code: 'flying' },
  { id: 'activity', index: '④', label: '活动进行中', code: 'activity' },
  { id: 'returning', index: '⑤', label: '返程中', code: 'returning' },
]

export default function DemoStageSheet({
  open,
  currentStage,
  onSelect,
  onClose,
  showCodes = false,
}) {
  if (!open) return null

  return (
    <div className="it-sheet" role="dialog" aria-modal="true" aria-label="演示行程阶段">
      <button type="button" className="it-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="it-sheet__panel">
        <div className="it-sheet__handle" />
        <h3>演示行程阶段</h3>
        <p className="it-sheet__lead">选择一个阶段查看对应页面状态</p>
        <div className="it-demo-stages">
          {DEMO_STAGES.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`it-demo-stage${currentStage === item.id ? ' is-on' : ''}`}
              onClick={() => onSelect(item.id)}
            >
              <span className="it-demo-stage__index">{item.index}</span>
              <span className="it-demo-stage__label">{item.label}</span>
              {showCodes ? <em>{item.code}</em> : null}
            </button>
          ))}
        </div>
        <button type="button" className="it-sheet__close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
