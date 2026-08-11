export default function CancelDialog({ open, refundLabel, onConfirm, onBack }) {
  if (!open) return null

  return (
    <div className="ta-dialog" role="dialog" aria-modal="true">
      <button type="button" className="ta-dialog__mask" aria-label="关闭" onClick={onBack} />
      <div className="ta-dialog__panel">
        <h3>确认取消本次安排？</h3>
        <p>
          {refundLabel}
          <br />
          时间保障将按实际已执行服务和规则结算。
        </p>
        <button type="button" className="ta-danger" onClick={onConfirm}>
          确认取消
        </button>
        <button type="button" className="ta-secondary" onClick={onBack}>
          再看看其他方案
        </button>
      </div>
    </div>
  )
}
