import { hubCompanions, sameInterestTags } from '../../data/flightExperienceData'

export default function CompanionsArrive({ showTags }) {
  return (
    <section className="fe-peers">
      <h3>本次同行</h3>
      <ul>
        {hubCompanions.map((person) => (
          <li key={person.id} className={person.status === 'soon' ? 'is-soon' : ''}>
            <div className={`fe-avatar${person.self ? ' is-self' : ''}`}>
              {person.name.slice(0, 1)}
            </div>
            <div>
              <strong>{person.name}</strong>
              <span>
                {person.status === 'arrived' ? '✓ 已到达' : person.eta}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {showTags ? (
        <div className="fe-tags">
          {sameInterestTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
