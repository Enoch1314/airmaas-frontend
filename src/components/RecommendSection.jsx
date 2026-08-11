import { ChevronRight } from 'lucide-react'
import RecommendCard from './RecommendCard'
import { recommendations } from '../data/mockData'

export default function RecommendSection({ onCardClick, onViewAll }) {
  return (
    <section className="section recommend-section">
      <div className="section-head">
        <h2 className="section-title">本周推荐</h2>
        <button type="button" className="section-more" onClick={onViewAll}>
          全部
          <ChevronRight size={14} strokeWidth={2.3} />
        </button>
      </div>
      <div className="recommend-scroller">
        {recommendations.map((item) => (
          <RecommendCard key={item.id} item={item} onClick={onCardClick} />
        ))}
      </div>
    </section>
  )
}
