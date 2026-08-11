import { Coins, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  minutesToLabel,
  readTimeCoins,
  timeBankBase,
} from '../data/timeBankData'

export default function TimeBankCard() {
  const navigate = useNavigate()
  const coins = readTimeCoins()
  const monthlyLabel = minutesToLabel(timeBankBase.monthlyRecoveredMinutes)

  return (
    <button
      type="button"
      className="info-card info-card--bank"
      onClick={() => navigate('/time-bank')}
    >
      <div className="info-card__head">
        <span className="info-card__label">周末时间银行</span>
        <ChevronRight size={14} strokeWidth={2.2} className="info-card__chevron" />
      </div>

      <p className="info-card__caption">本月已把</p>
      <p className="info-card__metric">{monthlyLabel}</p>
      <p className="info-card__caption">还给生活</p>

      <div className="info-card__coins">
        <span className="coin-mark" aria-hidden="true">
          <Coins size={14} strokeWidth={2.1} />
        </span>
        <span>时间币</span>
        <strong>{coins}</strong>
      </div>

      <div className="bank-deco" aria-hidden="true" />
    </button>
  )
}
