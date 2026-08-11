export default function KeepDelayDialog({ open, plan, onStill, onBack }) {
  if (!open || !plan) return null

  return (
    <div className="ra-dialog" role="dialog" aria-modal="true">
      <button type="button" className="ra-dialog__mask" aria-label="关闭" onClick={onBack} />
      <div className="ra-dialog__panel">
        <h3>选择后，本次返程时间保障将无法继续满足。</h3>
        <p>
          {plan.depart} 出发，预计 {plan.home} 到家。
        </p>
        <button type="button" className="ra-primary" onClick={onStill}>
          仍然选择
        </button>
        <button type="button" className="ra-secondary" onClick={onBack}>
          返回看看其他方案
        </button>
      </div>
    </div>
  )
}
