export default function HelpSheet({ open, onClose }) {
  if (!open) return null

  return (
    <div className="tb-dialog" role="dialog" aria-modal="true">
      <button type="button" className="tb-dialog__mask" aria-label="关闭" onClick={onClose} />
      <div className="tb-dialog__panel">
        <h3>周末时间银行说明</h3>
        <p>
          这里记录被省下来的生活时间，以及关键时间保障是否守住。时间币只用于平台内部服务权益，不能提现或交易。
        </p>
        <button type="button" className="tb-secondary" onClick={onClose}>
          知道了
        </button>
      </div>
    </div>
  )
}
