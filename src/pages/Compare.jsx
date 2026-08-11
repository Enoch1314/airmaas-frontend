import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PlanCard from '../components/compare/PlanCard'
import GroundPlanCard from '../components/compare/GroundPlanCard'
import CompareMatrix from '../components/compare/CompareMatrix'
import WhyRecommend from '../components/compare/WhyRecommend'
import {
  SELECTED_PLAN_KEY,
  compareMeta,
  groundPlan,
  weekendPlans,
} from '../data/compareData'
import {
  compareModeCopy,
  enrichPlansForMode,
  applyRecommendBadge,
  readDirectPlanSnapshot,
  resolveCompareRecommendation,
  resolvePlanningMode,
  setPlanningMode,
} from '../data/planningModeData'
import { userProfile } from '../data/mockData'

function saveSelectedPlan(plan, planningMode) {
  const payload = {
    id: plan.id,
    name: plan.name,
    lifeTime: plan.lifeTime,
    price: plan.price,
    gainMinutes: plan.gainMinutes || 0,
    planningMode,
    destination: plan.destination,
    selectedAt: Date.now(),
  }
  window.sessionStorage.setItem(SELECTED_PLAN_KEY, JSON.stringify(payload))
  return payload
}

export default function Compare() {
  const navigate = useNavigate()
  const location = useLocation()
  const planningMode = resolvePlanningMode(location.state)
  const modeCopy = compareModeCopy[planningMode] || compareModeCopy.ai
  const snapshot = readDirectPlanSnapshot() || {}
  const directInputs = {
    ...snapshot,
    ...(location.state || {}),
  }
  const destination =
    directInputs.destination ||
    directInputs.to ||
    '西岸美术馆'

  const recommendation = useMemo(() => {
    const inputs = {
      ...(readDirectPlanSnapshot() || {}),
      ...(location.state || {}),
    }
    return resolveCompareRecommendation(planningMode, inputs)
  }, [planningMode, location.state])

  const plans = useMemo(() => {
    const enriched = enrichPlansForMode(weekendPlans, planningMode, destination)
    return applyRecommendBadge(enriched, recommendation.recommendId)
  }, [planningMode, destination, recommendation.recommendId])

  useEffect(() => {
    setPlanningMode(planningMode)
  }, [planningMode])

  const handleSelect = (plan) => {
    const selected = saveSelectedPlan(plan, planningMode)
    navigate('/time-guarantee', {
      state: { selectedPlan: selected, planningMode },
    })
  }

  const handleDetail = (plan) => {
    const selected = saveSelectedPlan(plan, planningMode)
    const type =
      plan.id === 'relax' ? 'relaxed' : plan.id === 'experience' ? 'experience' : 'time'
    navigate(`/plan-detail?type=${type}`, {
      state: { selectedPlan: selected, planningMode },
    })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page compare-page">
        <header className="cp-hero">
          <div className="cp-hero__sky" aria-hidden="true" />
          <div className="cp-hero__skyline" aria-hidden="true" />

          <div className="cp-topbar">
            <button
              type="button"
              className="cp-icon-btn"
              aria-label="返回"
              onClick={() =>
                navigate('/generating', { state: location.state })
              }
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="cp-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="cp-hero__copy">
            <span
              className={`cp-mode-tag${
                planningMode === 'direct' ? ' is-direct' : ' is-ai'
              }`}
            >
              {modeCopy.tag}
            </span>
            <h1>{modeCopy.title}</h1>
            <p>
              {planningMode === 'direct' ? (
                <>
                  都能到达 {destination}，
                  <br />
                  区别在于交通、共享服务和时间结果。
                </>
              ) : (
                <>
                  都能完成这次周末计划，
                  <br />
                  区别在于时间、体验和轻松程度。
                </>
              )}
            </p>
            <span className="cp-hero__tip">{modeCopy.tip}</span>
          </div>
        </header>

        <section className="cp-summary">
          <p className="cp-summary__label">你有</p>
          <p className="cp-summary__metric">
            <em>{compareMeta.totalHours}</em>
            <span>小时</span>
          </p>
          <p className="cp-summary__sub">周末时间</p>
          <p className="cp-summary__desc">{modeCopy.summaryDesc}</p>
        </section>

        <div className="cp-list">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              planningMode={planningMode}
              recommended={plan.id === recommendation.recommendId}
              onSelect={handleSelect}
              onDetail={handleDetail}
            />
          ))}
        </div>

        <GroundPlanCard plan={groundPlan} onSelect={handleSelect} />
        <CompareMatrix />
        <WhyRecommend recommendation={recommendation} />
      </div>
    </div>
  )
}
