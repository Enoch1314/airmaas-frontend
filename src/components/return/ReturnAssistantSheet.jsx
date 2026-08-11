import { useState } from 'react'
import { returnAssistantQs } from '../../data/returnAdjustData'

export default function ReturnAssistantSheet({ open, onClose, onPickGround }) {
  const [answer, setAnswer] = useState('')

  if (!open) return null

  return (
    <div className="ra-sheet" role="dialog" aria-modal="true">
      <button type="button" className="ra-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="ra-sheet__panel">
        <div className="ra-sheet__handle" />
        <h3>AirMaaS 助手</h3>
        <div className="ra-sheet__qs">
          {returnAssistantQs.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setAnswer(item.a)
                if (item.id === 'ground') {
                  window.setTimeout(() => onPickGround?.(), 500)
                }
              }}
            >
              {item.q}
            </button>
          ))}
        </div>
        {answer ? <p className="ra-sheet__answer">{answer}</p> : null}
        <button type="button" className="ra-sheet__close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
