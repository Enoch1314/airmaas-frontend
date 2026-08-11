import { useState } from 'react'
import { assistantQuestions } from '../../data/itineraryData'

export default function AssistantSheet({ open, onClose, onAdjustReturn }) {
  const [answer, setAnswer] = useState('')

  if (!open) return null

  return (
    <div className="it-sheet" role="dialog" aria-modal="true">
      <button type="button" className="it-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="it-sheet__panel">
        <div className="it-sheet__handle" />
        <h3>AirMaaS 助手</h3>
        <p className="it-sheet__lead">你可以问：</p>
        <div className="it-sheet__qs">
          {assistantQuestions.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
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
        {answer ? <p className="it-sheet__answer">{answer}</p> : null}
        <button type="button" className="it-sheet__close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
