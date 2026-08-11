import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import ReturnLifeCard from '../components/return/ReturnLifeCard'
import OriginalReturnCard from '../components/return/OriginalReturnCard'
import ReturnOptionCard from '../components/return/ReturnOptionCard'
import DelayAlternatives from '../components/return/DelayAlternatives'
import GuaranteeStatusCard from '../components/return/GuaranteeStatusCard'
import ReturnCompare from '../components/return/ReturnCompare'
import GroundPureCard from '../components/return/GroundPureCard'
import SelectedSummary from '../components/return/SelectedSummary'
import KeepDelayDialog from '../components/return/KeepDelayDialog'
import ReturnAssistantSheet from '../components/return/ReturnAssistantSheet'
import {
  resolveReturnAdjustContext,
  resolveSelectedPlan,
} from '../data/returnAdjustData'

export default function ReturnAdjust() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [keepOpen, setKeepOpen] = useState(false)
  const [pendingKeep, setPendingKeep] = useState(null)
  const [showDelayAlts, setShowDelayAlts] = useState(false)
  const altsRef = useRef(null)

  const ctx = useMemo(
    () => resolveReturnAdjustContext(location.state, searchParams),
    [location.state, searchParams],
  )

  const [selectedId, setSelectedId] = useState(ctx.defaultSelection)

  useEffect(() => {
    setSelectedId(ctx.defaultSelection)
    setShowDelayAlts(ctx.defaultSelection === 'delay')
  }, [ctx.defaultSelection])

  const selected = resolveSelectedPlan(selectedId, ctx.pack)

  const handleSelect = (id) => {
    setSelectedId(id)
    if (id === 'delay') {
      setShowDelayAlts(true)
      window.setTimeout(() => {
        altsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 60)
    } else if (['early', 'original', 'groundPure'].includes(id)) {
      setShowDelayAlts(false)
    }
  }

  const confirmReturn = () => {
    const payload = {
      ...ctx,
      selectedReturn: selected,
      selectedReturnId: selectedId,
    }
    window.sessionStorage.setItem('airmaas_selected_return', JSON.stringify(payload))
    navigate(`/itinerary?stage=returning&type=${ctx.planType}`, { state: payload })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page return-adjust-page">
        <header className="ra-hero">
          <div className="ra-hero__sky" aria-hidden="true" />
          <div className="ra-hero__skyline" aria-hidden="true" />

          <div className="ra-topbar">
            <button
              type="button"
              className="ra-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button
              type="button"
              className="ra-icon-btn"
              aria-label="助手"
              onClick={() => setAssistantOpen(true)}
            >
              <MessageCircle size={16} strokeWidth={2.2} />
            </button>
          </div>

          <div className="ra-hero__copy">
            <div className="ra-status">活动进行中</div>
            <h1>调整返程</h1>
            <p>根据你现在的活动进度，重新选择最合适的回家时间。</p>
          </div>
        </header>

        <ReturnLifeCard ctx={ctx} />
        <OriginalReturnCard
          ctx={ctx}
          onKeep={() => handleSelect('original')}
        />

        <section className="ra-section">
          <h2>返程选择</h2>
          {ctx.pack.options.map((option) => (
            <ReturnOptionCard
              key={option.id}
              option={option}
              selected={selectedId === option.id}
              onSelect={(id) => {
                handleSelect(id)
                if (id === 'delay') setShowDelayAlts(true)
              }}
            />
          ))}
        </section>

        {showDelayAlts || selectedId === 'delay' || ['groundFast', 'adjacent', 'delayKeep'].includes(selectedId) ? (
          <div ref={altsRef}>
            <DelayAlternatives
              alternatives={ctx.pack.alternatives}
              selectedId={selectedId}
              onSelect={handleSelect}
              onConfirmKeep={(item) => {
                setPendingKeep(item)
                setKeepOpen(true)
              }}
            />
          </div>
        ) : null}

        <GuaranteeStatusCard ctx={ctx} selected={selected} />
        <ReturnCompare
          options={ctx.pack.options}
          groundFast={ctx.pack.alternatives.find((item) => item.id === 'groundFast')}
        />
        <GroundPureCard
          option={ctx.pack.groundPure}
          selected={selectedId === 'groundPure'}
          onSelect={handleSelect}
        />
        <SelectedSummary
          selected={selected}
          baseEstimate={ctx.pack.base.estimatedActivity}
        />
      </div>

      <div className="ra-bottom-bar">
        <button
          type="button"
          className="ra-primary"
          disabled={!selected}
          onClick={confirmReturn}
        >
          确认新的返程安排
        </button>
        <button
          type="button"
          className="ra-secondary"
          onClick={() => navigate('/activity', { state: ctx })}
        >
          继续当前活动
        </button>
      </div>

      <KeepDelayDialog
        open={keepOpen}
        plan={pendingKeep}
        onStill={() => {
          setSelectedId('delayKeep')
          setKeepOpen(false)
        }}
        onBack={() => {
          setKeepOpen(false)
          setPendingKeep(null)
        }}
      />

      <ReturnAssistantSheet
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onPickGround={() => {
          handleSelect('groundPure')
          setAssistantOpen(false)
        }}
      />
    </div>
  )
}
