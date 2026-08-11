import { ArrowRight, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { nextTrip } from '../data/mockData'

export default function NextTripCard() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="info-card info-card--trip"
      onClick={() => navigate('/itinerary')}
    >
      <div className="info-card__head">
        <span className="info-card__label">
          下一个行程
          <ChevronRight size={14} strokeWidth={2.2} />
        </span>
        <span className="status-pill">{nextTrip.status}</span>
      </div>

      <p className="trip-date">{nextTrip.date}</p>
      <p className="trip-time">{nextTrip.time}</p>

      <div className="trip-route">
        <span>{nextTrip.from}</span>
        <ArrowRight size={13} strokeWidth={2.3} />
        <span>{nextTrip.to}</span>
      </div>

      <p className="trip-segment">{nextTrip.segment}</p>
      <p className="trip-gain">
        比纯地面方案多留{' '}
        <em>{nextTrip.lifeGainMinutes} 分钟</em>
        {' '}给生活
      </p>
    </button>
  )
}
