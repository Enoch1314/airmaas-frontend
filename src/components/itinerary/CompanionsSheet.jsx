import { companionTags, itineraryCompanions } from '../../data/itineraryData'

export default function CompanionsSheet({ open, onClose }) {
  if (!open) return null

  return (
    <div className="it-sheet" role="dialog" aria-modal="true">
      <button type="button" className="it-sheet__mask" aria-label="关闭" onClick={onClose} />
      <div className="it-sheet__panel">
        <div className="it-sheet__handle" />
        <h3>同行状态</h3>
        <ul>
          {itineraryCompanions.map((person) => (
            <li key={person.id}>
              <div className={`it-sheet__avatar${person.self ? ' is-self' : ''}`}>
                {person.name.slice(0, 1)}
              </div>
              <strong>{person.name}</strong>
              <span>已确认</span>
            </li>
          ))}
        </ul>
        <div className="it-sheet__tags">
          {companionTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <button type="button" className="it-sheet__close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  )
}
