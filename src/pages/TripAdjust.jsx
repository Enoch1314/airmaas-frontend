import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import FactCard from '../components/trip/FactCard'
import TripGuaranteeCard from '../components/trip/TripGuaranteeCard'
import ImpactCard from '../components/trip/ImpactCard'
import AltOptionCard from '../components/trip/AltOptionCard'
import TripCompare from '../components/trip/TripCompare'
import SelectedTripCard from '../components/trip/SelectedTripCard'
import CancelDialog from '../components/trip/CancelDialog'
import TripAssistantSheet from '../components/trip/TripAssistantSheet'
import { resolveTripAdjustContext } from '../data/tripAdjustData'
import { saveFinalAdjustmentChoice } from '../data/tripResultData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

const DEMO_REASONS = [
  { id: 'weather', label: '天气' },
  { id: 'no-batch', label: '未成班' },
  { id: 'activity-delay', label: '活动延迟' },
]

export default function TripAdjust() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedId, setSelectedId] = useState('')
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const selectedRef = useRef(null)

  const ctx = useMemo(
    () => resolveTripAdjustContext(location.state, searchParams),
    [location.state, searchParams],
  )
  const demoMode = searchParams.get('demo') === '1'

  useEffect(() => {
    setSelectedId('')
    setCancelOpen(false)
  }, [ctx.reason])

  const selected = ctx.scene.options.find((item) => item.id === selectedId)

  const handleSelect = (id) => {
    const option = ctx.scene.options.find((item) => item.id === id)
    if (option?.isCancel) {
      setCancelOpen(true)
      setSelectedId(id)
      return
    }
    setSelectedId(id)
    window.setTimeout(() => {
      selectedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 60)
  }

  const confirmPlan = () => {
    const payload = {
      ...ctx,
      selectedTrip: selected,
    }
    saveFinalAdjustmentChoice(payload)
    navigate(`/itinerary?stage=activity&type=${ctx.planType}`, { state: payload })
  }

  const switchReason = (reason) => {
    const next = new URLSearchParams(searchParams)
    next.set('reason', reason)
    if (!next.get('type')) next.set('type', ctx.planType)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page trip-adjust-page">
        <header className="ta-hero">
          <PageHeroBackdrop src={pageHeroPhoto.tripAdjust} />

          <div className="ta-topbar">
            <button
              type="button"
              className="ta-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button
              type="button"
              className="ta-icon-btn"
              aria-label="助手"
              onClick={() => setAssistantOpen(true)}
            >
              <MessageCircle size={16} strokeWidth={2.2} />
            </button>
          </div>

          <div className="ta-hero__copy">
            <div className="ta-status">计划发生变化</div>
            <h1>行程需要调整</h1>
            <p>
              别担心，我们先把发生的情况说清楚，再一起看看这个周末还能怎么安排。
            </p>
          </div>
        </header>

        <FactCard scene={ctx.scene} />
        <TripGuaranteeCard activityTarget={ctx.activityTarget} />
        <ImpactCard meta={ctx.meta} />

        <section className="ta-section">
          <h2>这个周末还可以这样继续</h2>
          <p className="ta-section__sub">以下方案均基于当前可执行条件生成。</p>
          {ctx.scene.options.map((option) => (
            <AltOptionCard
              key={option.id}
              option={option}
              selected={selectedId === option.id}
              onSelect={handleSelect}
            />
          ))}
        </section>

        <TripCompare scene={ctx.scene} />

        <div ref={selectedRef}>
          <SelectedTripCard option={selected} onConfirm={confirmPlan} />
        </div>

        {demoMode ? (
        <div className="ta-demo">
          <span>演示场景</span>
          <div>
            {DEMO_REASONS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={
                  (ctx.reason === 'noBatch' && item.id === 'no-batch') ||
                  (ctx.reason === 'activityDelay' && item.id === 'activity-delay') ||
                  (ctx.reason === 'weather' && item.id === 'weather')
                    ? 'is-on'
                    : ''
                }
                onClick={() => switchReason(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        ) : null}
      </div>

      <CancelDialog
        open={cancelOpen}
        refundLabel={selected?.feeLabel || '预计按规则退款'}
        onConfirm={() => navigate('/')}
        onBack={() => {
          setCancelOpen(false)
          setSelectedId('')
        }}
      />

      <TripAssistantSheet
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  )
}
