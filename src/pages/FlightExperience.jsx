import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ArriveStatusCard from '../components/flight/ArriveStatusCard'
import CompanionsArrive from '../components/flight/CompanionsArrive'
import VerifyCard from '../components/flight/VerifyCard'
import ServiceSummaryCard from '../components/flight/ServiceSummaryCard'
import CabinPreview from '../components/flight/CabinPreview'
import ScenicExperience from '../components/flight/ScenicExperience'
import FlyingPanel from '../components/flight/FlyingPanel'
import SafetyNote from '../components/flight/SafetyNote'
import LandingNext from '../components/flight/LandingNext'
import { userProfile } from '../data/mockData'
import { resolveFlightExperienceContext } from '../data/flightExperienceData'

export default function FlightExperience() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [verified, setVerified] = useState(false)
  const [guideOn, setGuideOn] = useState(true)
  const [toast, setToast] = useState('')

  const ctx = useMemo(
    () => resolveFlightExperienceContext(location.state, searchParams),
    [location.state, searchParams],
  )
  const demoMode = searchParams.get('demo') === '1'

  const isFlying = ctx.stage === 'flying'

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const goFlying = () => {
    const next = new URLSearchParams(searchParams)
    next.set('stage', 'flying')
    if (!next.get('type')) next.set('type', ctx.planType)
    setSearchParams(next, { replace: true })
    setVerified(true)
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page flight-experience-page">
        <header className={`fe-hero${ctx.isScenic ? ' is-scenic' : ''}`}>
          <div className="fe-hero__sky" aria-hidden="true" />
          <div className="fe-hero__skyline" aria-hidden="true" />

          <div className="fe-topbar">
            <button
              type="button"
              className="fe-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="fe-avatar-user" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="fe-hero__copy">
            <div className={`fe-status${isFlying ? ' is-fly' : ''}`}>
              {isFlying ? '飞行中' : '等待登乘'}
            </div>
            <h1>{isFlying ? '低空飞行' : '汇聚与登乘'}</h1>
            <p>青浦汇聚枢纽 · B区</p>
          </div>
        </header>

        {!isFlying ? (
          <>
            <ArriveStatusCard
              verified={verified}
              takeoff={ctx.flight.takeoff}
              gatherTime={ctx.flight.gatherTime}
              onVerify={() => {
                setVerified(true)
                showToast('身份核验已完成（原型演示）')
              }}
            />

            <CompanionsArrive showTags={ctx.serviceId === 'sameInterest'} />

            {verified ? <VerifyCard takeoff={ctx.flight.takeoff} /> : null}

            <ServiceSummaryCard ctx={ctx} />
            <CabinPreview ctx={ctx} />

            {ctx.isScenic ? (
              <ScenicExperience
                flightMinutes={ctx.flightMinutes}
                guideOn={guideOn}
                onToggleGuide={() => setGuideOn((prev) => !prev)}
              />
            ) : null}

            <SafetyNote />

            <button
              type="button"
              className="fe-primary fe-primary--block"
              disabled={!verified}
              onClick={goFlying}
            >
              完成登乘，模拟起飞
            </button>
          </>
        ) : (
          <>
            <FlyingPanel ctx={ctx} guideOn={guideOn} />
            <ServiceSummaryCard ctx={ctx} />
            <CabinPreview ctx={ctx} />

            {ctx.isScenic ? (
              <ScenicExperience
                flightMinutes={ctx.flightMinutes}
                guideOn={guideOn}
                onToggleGuide={() => setGuideOn((prev) => !prev)}
              />
            ) : null}

            <button
              type="button"
              className="fe-secondary fe-secondary--block"
              onClick={() => showToast('当前飞行体验已展开（原型演示）')}
            >
              查看当前飞行体验
            </button>

            <SafetyNote />
            <LandingNext
              landing={ctx.landing}
              onContinue={() => navigate('/activity', { state: ctx })}
            />
          </>
        )}

        {demoMode ? (
          <div className="fe-demo">
            <span>演示状态</span>
            <div>
              {['waiting', 'flying'].map((stage) => (
                <button
                  type="button"
                  key={stage}
                  className={ctx.stage === stage ? 'is-on' : ''}
                  onClick={() => {
                    const next = new URLSearchParams(searchParams)
                    next.set('demo', '1')
                    next.set('stage', stage)
                    if (!next.get('type')) next.set('type', ctx.planType)
                    setSearchParams(next, { replace: true })
                    if (stage === 'flying') setVerified(true)
                  }}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
