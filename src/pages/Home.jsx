import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import DirectPlanCard from '../components/DirectPlanCard'
import SmartPlanCard from '../components/SmartPlanCard'
import QuickTags from '../components/QuickTags'
import RecommendSection from '../components/RecommendSection'
import TimeBankCard from '../components/TimeBankCard'
import NextTripCard from '../components/NextTripCard'
import BottomNav from '../components/BottomNav'

export default function Home() {
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const showToast = (message) => setToast(message)

  return (
    <div className="phone-shell">
      <div className="app-page home-page">
        <Header
          onMessage={() => showToast('消息中心将在下一阶段接入')}
          onProfile={() => navigate('/profile')}
        />

        <HeroSection />

        <section className="entry-grid" aria-label="双入口">
          <DirectPlanCard />
          <SmartPlanCard />
        </section>

        <QuickTags
          selectedId={selectedTag}
          onSelect={(tag) => {
            setSelectedTag(tag.id)
            showToast(`已选择「${tag.label}」`)
          }}
        />

        <RecommendSection
          onCardClick={() => showToast('该体验详情将在后续页面接入')}
          onViewAll={() => showToast('全部推荐将在后续页面接入')}
        />

        <section className="bottom-duo" aria-label="时间与行程">
          <TimeBankCard />
          <NextTripCard />
        </section>
      </div>

      <BottomNav />

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
