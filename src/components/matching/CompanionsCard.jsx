import { Check } from 'lucide-react'
import { interestTags } from '../../data/matchingData'

export default function CompanionsCard({ companions, showTags }) {
  return (
    <section className="mt-companions">
      <h3>当前同行</h3>
      <ul>
        {companions.map((person) => (
          <li key={person.id} className={person.status === 'waiting' ? 'is-wait' : ''}>
            <div className={`mt-avatar${person.self ? ' is-self' : ''}`}>
              {person.status === 'waiting' ? '···' : person.name.slice(0, 1)}
            </div>
            <div>
              <strong>{person.name}</strong>
              {person.status === 'confirmed' ? (
                <span className="is-ok">
                  <Check size={12} strokeWidth={3} /> 已确认
                </span>
              ) : (
                <span className="is-pending">等待中</span>
              )}
            </div>
          </li>
        ))}
      </ul>
      {showTags ? (
        <div className="mt-tags">
          {interestTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
