import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MessageCircle, SlidersHorizontal } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import ActionCard from '../components/itinerary/ActionCard'
import GuaranteeStatusCard from '../components/itinerary/GuaranteeStatusCard'
import LiveTimeline from '../components/itinerary/LiveTimeline'
import RouteSketch from '../components/itinerary/RouteSketch'
import FlightStatusCard from '../components/itinerary/FlightStatusCard'
import SecondaryActions from '../components/itinerary/SecondaryActions'
import CompanionsSheet from '../components/itinerary/CompanionsSheet'
import AssistantSheet from '../components/itinerary/AssistantSheet'
import DemoStageSheet from '../components/itinerary/DemoStageSheet'
import FloatingAssistant from '../components/itinerary/FloatingAssistant'
import { resolveItineraryContext } from '../data/itineraryData'
import { FINAL_ADJUSTMENT_KEY, TRIP_ADJUST_SESSION_KEY } from '../data/tripResultData'

function hasTripAdjustment() {
  try {
    return Boolean(
      window.localStorage.getItem(FINAL_ADJUSTMENT_KEY) ||
        window.sessionStorage.getItem(TRIP_ADJUST_SESSION_KEY),
    )
  } catch {
    return false
  }
}

export default function Itinerary() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [toast, setToast] = useState('')
  const [companionsOpen, setCompanionsOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  const ctx = useMemo(
    () => resolveItineraryContext(location.state, searchParams),
    [location.state, searchParams],
  )

  const demoMode = searchParams.get('demo') === '1'
  const showCompleteDemo =
    ctx.stage === 'returning' ||
    ctx.stage === 'activity' ||
    hasTripAdjustment()

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const handlePrimary = () => {
    if (ctx.action.primaryNav) {
      navigate(ctx.action.primaryNav, { state: ctx })
      return
    }
    if (ctx.action.primaryToast) showToast(ctx.action.primaryToast)
  }

  const selectDemoStage = (stage) => {
    const params = new URLSearchParams()
    params.set('stage', stage)
    params.set('type', searchParams.get('type') || ctx.planType)
    if (demoMode) params.set('demo', '1')
    navigate(`/itinerary?${params.toString()}`, {
      replace: true,
      state: location.state,
    })
    setDemoOpen(false)
  }

  return (
    <div className="phone-shell phone-shell--subpage phone-shell--itinerary">
      <main className="app-page itinerary-page">
        <header className="it-hero">
          <div className="it-hero__sky" aria-hidden="true" />
          <div className="it-hero__skyline" aria-hidden="true" />

          <div className="it-topbar">
            <button
              type="button"
              className="it-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="it-topbar__right">
              <button
                type="button"
                className="it-demo-btn"
                onClick={() => setDemoOpen(true)}
              >
                <SlidersHorizontal size={13} strokeWidth={2.3} />
                演示
              </button>
              <button
                type="button"
                className="it-icon-btn"
                aria-label="消息"
                onClick={() => setAssistantOpen(true)}
              >
                <MessageCircle size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          <div className="it-hero__copy">
            <div className="it-status">{ctx.action.statusLabel}</div>
            <h1>我的数字行程</h1>
            <p>西岸美术馆看展 · 周六 06-24</p>
          </div>
        </header>

        <ActionCard key={ctx.stage} action={ctx.action} onPrimary={handlePrimary} />

        <GuaranteeStatusCard
          guarantees={ctx.guarantees}
          estimatedActivity={ctx.estimatedActivity}
        />

        <LiveTimeline timeline={ctx.timeline} />

        <RouteSketch
          nodes={ctx.routeNodes}
          highlightTo={ctx.highlightTo}
          nextSegmentLabel={ctx.nextSegmentLabel}
          nextSegmentTime={ctx.nextSegmentTime}
        />

        <FlightStatusCard
          ctx={ctx}
          onOpenCompanions={() => setCompanionsOpen(true)}
        />

        <p className="it-quote">
          接下来不用自己拼交通、活动和返程，跟着这一张数字行程单走就可以。
        </p>

        <SecondaryActions
          onAssistant={() => setAssistantOpen(true)}
          onReturn={() => navigate('/return-adjust', { state: ctx })}
          onGuarantee={() =>
            showToast(
              ctx.guarantees.length
                ? '关键时间保障状态正常'
                : '本次未添加关键时间保障',
            )
          }
          onReport={() => showToast('问题已记录，助手将尽快协助（原型演示）')}
          onDemoWeather={() =>
            navigate('/trip-adjust?reason=weather', { state: ctx })
          }
          showCompleteDemo={showCompleteDemo}
          onCompleteTrip={() =>
            navigate(`/trip-result?type=${ctx.planType}`, { state: ctx })
          }
        />
      </main>

      <FloatingAssistant onClick={() => setAssistantOpen(true)} />
      <BottomNav />

      <CompanionsSheet open={companionsOpen} onClose={() => setCompanionsOpen(false)} />
      <AssistantSheet
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onAdjustReturn={() => navigate('/return-adjust', { state: ctx })}
      />
      <DemoStageSheet
        open={demoOpen}
        currentStage={ctx.stage}
        showCodes={demoMode}
        onSelect={selectDemoStage}
        onClose={() => setDemoOpen(false)}
      />

      <div className={`toast it-toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
