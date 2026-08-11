export default function ShareCardModal({ open, cover, result, note, onClose, onToast }) {
  if (!open) return null

  return (
    <div className="wr-modal" role="dialog" aria-modal="true">
      <button type="button" className="wr-modal__mask" aria-label="关闭" onClick={onClose} />
      <div className="wr-modal__panel">
        <div className="wr-sharecard">
          <em>记忆航线</em>
          <h3>{cover.title}</h3>
          <strong>{result.actualLifeLabel}</strong>
          <span>真正留给生活</span>
          <p>{cover.shareHighlights}</p>
          <blockquote>“{note}”</blockquote>
          <div className="wr-sharecard__brand">
            <b>AirMaaS</b>
            <i>把周末还给生活</i>
          </div>
        </div>
        <button
          type="button"
          className="wr-primary"
          onClick={() => onToast('分享卡已保存（原型演示）')}
        >
          保存图片
        </button>
        <button
          type="button"
          className="wr-secondary"
          onClick={() => onToast('已分享给好友（原型演示）')}
        >
          分享给好友
        </button>
        <button type="button" className="wr-mini is-ghost" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
