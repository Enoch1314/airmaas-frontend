import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { boardingInfo, boardingNotes } from '../../data/flightExperienceData'

export default function VerifyCard({ takeoff }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="fe-verify">
      <h3>身份核验已完成</h3>
      <div className="fe-verify__grid">
        <div>
          <span>座位</span>
          <strong>{boardingInfo.seat}</strong>
        </div>
        <div>
          <span>登乘区</span>
          <strong>{boardingInfo.gate}</strong>
        </div>
        <div>
          <span>预计登乘</span>
          <strong>{boardingInfo.boardAt}</strong>
        </div>
        <div>
          <span>预计起飞</span>
          <strong>{takeoff}</strong>
        </div>
        <div className="is-wide">
          <span>行李</span>
          <strong>{boardingInfo.luggage}</strong>
        </div>
      </div>
      <button
        type="button"
        className={`fe-notes-toggle${open ? ' is-open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        查看登乘须知
        <ChevronDown size={16} strokeWidth={2.2} />
      </button>
      {open ? (
        <ul className="fe-notes">
          {boardingNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
