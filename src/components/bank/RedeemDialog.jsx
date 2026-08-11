export default function RedeemDialog({ open, item, onConfirm, onClose }) {
  if (!open || !item) return null

  return (
    <div className="tb-dialog" role="dialog" aria-modal="true">
      <button type="button" className="tb-dialog__mask" aria-label="关闭" onClick={onClose} />
      <div className="tb-dialog__panel">
        <h3>
          确认使用{item.cost}时间币兑换{item.title}？
        </h3>
        <p>兑换后将进入「我的可用权益」，仅用于平台内部服务。</p>
        <button type="button" className="tb-primary" onClick={onConfirm}>
          确认兑换
        </button>
        <button type="button" className="tb-secondary" onClick={onClose}>
          再想想
        </button>
      </div>
    </div>
  )
}
