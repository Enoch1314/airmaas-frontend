export default function TicketModal({ open, meta, onClose }) {
  if (!open) return null

  return (
    <div className="ac-modal" role="dialog" aria-modal="true">
      <button type="button" className="ac-modal__mask" aria-label="关闭" onClick={onClose} />
      <div className="ac-modal__panel">
        <h3>电子凭证</h3>
        <div className="ac-qr" aria-hidden="true">
          <span />
        </div>
        <p>西岸美术馆 · 当代艺术特展</p>
        <p>
          {meta.start}—{meta.end}
        </p>
        <em>入场状态：已核销</em>
        <button type="button" className="ac-primary" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
