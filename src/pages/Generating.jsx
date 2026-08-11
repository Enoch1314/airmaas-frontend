import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import RouteSketch from '../components/generating/RouteSketch'
import GeneratingSteps from '../components/generating/GeneratingSteps'
import LifeTimeCard from '../components/generating/LifeTimeCard'
import {
  generatingCopyByMode,
  resolvePlanningMode,
  setPlanningMode,
} from '../data/planningModeData'
import { userProfile } from '../data/mockData'

export default function Generating() {
  const navigate = useNavigate()
  const location = useLocation()
  const planningMode = resolvePlanningMode(location.state)
  const copy = generatingCopyByMode[planningMode] || generatingCopyByMode.ai

  const [currentStep, setCurrentStep] = useState(0)
  const [done, setDone] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [compareIndex, setCompareIndex] = useState(0)

  useEffect(() => {
    setPlanningMode(planningMode)
  }, [planningMode])

  const hours = useMemo(() => {
    const raw = location.state?.duration || '6小时'
    return String(raw).replace(/[^\d]/g, '') || '6'
  }, [location.state])

  useEffect(() => {
    if (done) return undefined

    const stepTimer = window.setTimeout(() => {
      if (currentStep >= copy.steps.length - 1) {
        setDone(true)
        return
      }
      setCurrentStep((prev) => prev + 1)
    }, 850)

    return () => window.clearTimeout(stepTimer)
  }, [currentStep, done, copy.steps.length])

  useEffect(() => {
    if (done) return undefined

    const hintTimer = window.setInterval(() => {
      setHintIndex((prev) => (prev + 1) % copy.hints.length)
      setCompareIndex((prev) => prev + 1)
    }, 900)

    return () => window.clearInterval(hintTimer)
  }, [done, copy.hints.length])

  const backTarget =
    planningMode === 'direct' ? '/direct-plan' : '/need-confirm'

  const compareState = {
    ...(location.state || {}),
    planningMode,
    source: location.state?.source || 'generating',
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page generating-page">
        <header className="gn-hero">
          <div className="gn-hero__sky" aria-hidden="true" />
          <div className="gn-hero__skyline" aria-hidden="true" />

          <div className="gn-topbar">
            <button
              type="button"
              className="gn-icon-btn"
              aria-label="返回"
              onClick={() => navigate(backTarget, { state: location.state })}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="gn-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="gn-hero__copy">
            <h1>{copy.title}</h1>
            <p>
              {copy.subtitleLead}
              <br />
              {copy.subtitleTail(hours)}
            </p>
          </div>
        </header>

        <section className="gn-stage">
          <RouteSketch activeIndex={currentStep} done={done} />
          <p className="gn-hint">
            {copy.hints[done ? copy.hints.length - 1 : hintIndex]}
          </p>
        </section>

        <GeneratingSteps
          steps={copy.steps}
          currentStep={currentStep}
          done={done}
        />
        <LifeTimeCard hours={hours} highlightIndex={compareIndex} />

        {done ? (
          <section className="gn-done">
            <h2>{copy.doneTitle}</h2>
            <p>{copy.doneDesc}</p>
            <button
              type="button"
              className="gn-primary-btn"
              onClick={() => navigate('/compare', { state: compareState })}
            >
              <Sparkles size={16} strokeWidth={2.2} />
              {copy.doneCta}
            </button>
          </section>
        ) : null}

        <button
          type="button"
          className="gn-cancel-btn"
          onClick={() => navigate(backTarget, { state: location.state })}
        >
          取消生成
        </button>
      </div>
    </div>
  )
}
