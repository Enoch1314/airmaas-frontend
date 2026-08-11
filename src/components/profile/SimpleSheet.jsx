export default function SimpleSheet({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="pf-sheet" role="dialog" aria-modal="true">
      <button type="button" className="pf-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="pf-sheet__panel">
        <div className="pf-sheet__handle" />
        <h3>{title}</h3>
        <div className="pf-sheet__body">{children}</div>
        <button type="button" className="pf-secondary" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
