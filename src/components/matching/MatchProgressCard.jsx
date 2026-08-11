import { CheckCircle2, LoaderCircle } from 'lucide-react'

export default function MatchProgressCard({ status, copy, countdown }) {
  const showRing = status === 'matching' || status === 'formed' || status === 'ready'
  const ratio =
    status === 'matching' ? 0.75 : status === 'bookable' ? 1 : 1

  return (
    <section className={`mt-progress mt-progress--${copy.tone}`}>
      <div className="mt-progress__badge">
        {status === 'matching' ? (
          <LoaderCircle size={14} strokeWidth={2.4} className="mt-spin" />
        ) : (
          <CheckCircle2 size={14} strokeWidth={2.4} />
        )}
        <span>{copy.badge}</span>
      </div>

      {showRing ? (
        <div className="mt-ring" style={{ '--ratio': ratio }}>
          <div className="mt-ring__inner">
            <strong>{copy.headline}</strong>
            <span>{copy.sub}</span>
          </div>
        </div>
      ) : (
        <div className="mt-progress__plain">
          <strong>{copy.headline}</strong>
          <span>{copy.sub}</span>
        </div>
      )}

      <p className="mt-progress__tip">{copy.tip}</p>

      {copy.theme ? (
        <p className="mt-progress__theme">同频主题：{copy.theme}</p>
      ) : null}

      {status === 'matching' ? (
        <div className="mt-countdown">
          <span>预计匹配剩余时间</span>
          <strong>{countdown}</strong>
        </div>
      ) : null}
    </section>
  )
}
