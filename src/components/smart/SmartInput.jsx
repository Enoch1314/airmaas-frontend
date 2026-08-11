import { ImagePlus, Mic, SendHorizonal } from 'lucide-react'

export default function SmartInput({
  value,
  onChange,
  onSend,
  onVoice,
  onImage,
  disabled,
}) {
  return (
    <section className="sp-input-card">
      <textarea
        className="sp-textarea"
        rows={5}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="告诉我你的周末想法..."
      />
      <div className="sp-input-actions">
        <button
          type="button"
          className="sp-tool-btn"
          aria-label="语音输入"
          onClick={onVoice}
        >
          <Mic size={18} strokeWidth={2.1} />
        </button>
        <button
          type="button"
          className="sp-tool-btn"
          aria-label="上传活动海报"
          onClick={onImage}
        >
          <ImagePlus size={18} strokeWidth={2.1} />
        </button>
        <button
          type="button"
          className="sp-send-btn"
          aria-label="发送"
          disabled={disabled || !value.trim()}
          onClick={onSend}
        >
          <SendHorizonal size={17} strokeWidth={2.2} />
          发送
        </button>
      </div>
    </section>
  )
}
