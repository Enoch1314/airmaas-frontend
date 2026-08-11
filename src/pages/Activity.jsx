import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Bot, MessageCircle } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import LifeTimeCard from '../components/activity/LifeTimeCard'
import ActivityEventCard from '../components/activity/ActivityEventCard'
import ActivityGuaranteeCard from '../components/activity/ActivityGuaranteeCard'
import ReturnReminderCard from '../components/activity/ReturnReminderCard'
import ExtendStayCard from '../components/activity/ExtendStayCard'
import NearbyCards from '../components/activity/NearbyCards'
import ServiceExtraCard from '../components/activity/ServiceExtraCard'
import TicketModal from '../components/activity/TicketModal'
import ActivityAssistantSheet from '../components/activity/ActivityAssistantSheet'
import {
  resolveActivityContext,
  simulateExtend,
} from '../data/activityData'

export default function Activity() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [toast, setToast] = useState('')
  const [ticketOpen, setTicketOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [extend, setExtend] = useState(null)
  const [continuePref, setContinuePref] = useState('end')

  const ctx = useMemo(
    () => resolveActivityContext(location.state, searchParams),
    [location.state, searchParams],
  )

  const extendResult = useMemo(() => {
    if (extend === null) return null
    return simulateExtend(ctx.planType, extend)
  }, [ctx.planType, extend])

  const currentEnd = extendResult?.end || ctx.meta.end
  const currentReturnStart = extendResult?.returnStart || ctx.meta.returnStart
  const currentHome = extendResult?.home || ctx.meta.home

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const goReturn = (withExtend = false) => {
    const params = new URLSearchParams()
    params.set('type', ctx.planType)
    if (withExtend && extend) params.set('extend', String(extend))
    else if (extend === 20 || extend === 40) params.set('extend', String(extend))
    navigate(`/return-adjust?${params.toString()}`, { state: ctx })
  }

  return (
    <div className="phone-shell phone-shell--subpage phone-shell--activity">
      <main className="app-page activity-page">
        <header className="ac-hero">
          <div className="ac-hero__sky" aria-hidden="true" />

          <div className="ac-topbar">
            <button
              type="button"
              className="ac-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button
              type="button"
              className="ac-icon-btn"
              aria-label="助手"
              onClick={() => setAssistantOpen(true)}
            >
              <MessageCircle size={16} strokeWidth={2.2} />
            </button>
          </div>

          <div className="ac-hero__copy">
            <div className="ac-status">活动进行中</div>
            <h1>现在，把时间留给生活</h1>
            <p>西岸美术馆看展 · 活动进行中</p>
          </div>
        </header>

        <LifeTimeCard meta={ctx.meta} progress={ctx.progress} />
        <ActivityEventCard meta={ctx.meta} onTicket={() => setTicketOpen(true)} />
        <ActivityGuaranteeCard ctx={ctx} homeEta={currentHome} />
        <ReturnReminderCard
          meta={ctx.meta}
          end={currentEnd}
          returnStart={currentReturnStart}
          home={currentHome}
          onViewReturn={() => goReturn(false)}
        />
        <ExtendStayCard
          selected={extend}
          result={extendResult}
          onSelect={setExtend}
          onReplan={() => goReturn(true)}
        />
        <NearbyCards
          onAdd={(item) => {
            if (item.impactReturn) {
              showToast('已加入临时安排；可能压缩返程缓冲（原型演示）')
              return
            }
            showToast('已加入临时安排（原型演示）')
          }}
        />
        <ServiceExtraCard
          serviceId={ctx.serviceId}
          peers={ctx.peers}
          continuePref={continuePref}
          onContinueChange={setContinuePref}
        />

        <button type="button" className="ac-sim" onClick={() => goReturn(false)}>
          模拟活动结束
        </button>
      </main>

      <button
        type="button"
        className="ac-fab"
        onClick={() => setAssistantOpen(true)}
        aria-label="AirMaaS 助手"
      >
        <Bot size={18} strokeWidth={2.2} />
        <span>助手</span>
      </button>

      <BottomNav />

      <TicketModal
        open={ticketOpen}
        meta={{ ...ctx.meta, end: currentEnd }}
        onClose={() => setTicketOpen(false)}
      />
      <ActivityAssistantSheet
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onAdjustReturn={() => goReturn(true)}
        remainLabel={ctx.meta.remainLabel}
        end={currentEnd}
      />

      <div className={`toast ac-toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
