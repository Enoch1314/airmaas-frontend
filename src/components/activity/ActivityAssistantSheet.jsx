import { useState } from 'react'
import { activityAssistantQs } from '../../data/activityData'

export default function ActivityAssistantSheet({
  open,
  onClose,
  onAdjustReturn,
  remainLabel,
  end,
}) {
  const [answer, setAnswer] = useState('')

  if (!open) return null

  return (
    <div className="ac-sheet" role="dialog" aria-modal="true">
      <button type="button" className="ac-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="ac-sheet__panel">
        <div className="ac-sheet__handle" />
        <h3>AirMaaS 助手</h3>
        <div className="ac-sheet__qs">
          {activityAssistantQs.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                if (item.id === 'howlong') {
                  setAnswer(
                    `按当前返程安排，你大约还能自由活动${remainLabel}。如果希望21:00前回家，建议${end}前开始准备返程。`,
                  )
                  return
                }
                setAnswer(item.a)
                if (item.id === 'return') {
                  window.setTimeout(() => onAdjustReturn?.(), 700)
                }
              }}
            >
              {item.q}
            </button>
          ))}
        </div>
        {answer ? <p className="ac-sheet__answer">{answer}</p> : null}
        <button type="button" className="ac-sheet__close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
