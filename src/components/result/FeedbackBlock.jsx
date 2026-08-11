import { feedbackTags } from '../../data/tripResultData'

export default function FeedbackBlock({
  rating,
  tags,
  note,
  onRate,
  onToggleTag,
  onNote,
}) {
  return (
    <section className="tr-feedback">
      <h3>今天的周末怎么样？</h3>
      <div className="tr-stars" role="group" aria-label="评分">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            className={n <= rating ? 'is-on' : ''}
            onClick={() => onRate(n)}
            aria-label={`${n} 星`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="tr-tags">
        {feedbackTags.map((tag) => (
          <button
            type="button"
            key={tag.id}
            className={tags.includes(tag.id) ? 'is-on' : ''}
            onClick={() => onToggleTag(tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <label className="tr-note">
        <span>给这个周末留一句话</span>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => onNote(e.target.value)}
          placeholder="今天终于没有把大半天花在路上。"
        />
      </label>
    </section>
  )
}
