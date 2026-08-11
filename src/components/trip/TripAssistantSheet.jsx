import { useState } from 'react'
import { tripAssistantQs } from '../../data/tripAdjustData'

export default function TripAssistantSheet({ open, onClose }) {
  const [answer, setAnswer] = useState('')

  if (!open) return null

  return (
    <div className="ta-sheet" role="dialog" aria-modal="true">
      <button type="button" className="ta-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="ta-sheet__panel">
        <div className="ta-sheet__handle" />
        <h3>AirMaaS 助手</h3>
        <div className="ta-sheet__qs">
          {tripAssistantQs.map((item) => (
            <button type="button" key={item.id} onClick={() => setAnswer(item.a)}>
              {item.q}
            </button>
          ))}
        </div>
        {answer ? <p className="ta-sheet__answer">{answer}</p> : null}
        <button type="button" className="ta-sheet__close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
