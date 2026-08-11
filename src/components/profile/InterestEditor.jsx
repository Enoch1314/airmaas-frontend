import { interestOptions } from '../../data/profileData'

export default function InterestEditor({ selected, editing, onToggle, onEdit }) {
  return (
    <section className="pf-interests">
      <div className="pf-section-head">
        <h3>我喜欢怎样过周末</h3>
        <button type="button" onClick={onEdit}>
          {editing ? '完成' : '编辑兴趣'}
        </button>
      </div>
      <div className={`pf-chip-grid${editing ? ' is-editing' : ''}`}>
        {interestOptions.map((item) => {
          const on = selected.includes(item.id)
          return (
            <button
              type="button"
              key={item.id}
              className={on ? 'is-on' : ''}
              onClick={() => editing && onToggle(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
