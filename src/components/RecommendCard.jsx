export default function RecommendCard({ item, onClick }) {
  return (
    <button
      type="button"
      className={`recommend-card recommend-card--${item.tone}`}
      onClick={() => onClick?.(item)}
    >
      <div className="recommend-card__visual" aria-hidden="true">
        <span className="recommend-card__tag">{item.tag}</span>
      </div>
      <div className="recommend-card__body">
        <h4 className="recommend-card__title">{item.title}</h4>
        <p className="recommend-card__meta">{item.datetime}</p>
        <p className="recommend-card__price">{item.price}</p>
      </div>
    </button>
  )
}
