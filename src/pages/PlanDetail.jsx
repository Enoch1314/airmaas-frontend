import { useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Share2 } from 'lucide-react'
import ResultSummary from '../components/detail/ResultSummary'
import PlanTimeline from '../components/detail/PlanTimeline'
import RouteSketchCard from '../components/detail/RouteSketchCard'
import WhyLowAltitude from '../components/detail/WhyLowAltitude'
import ShareServiceCard from '../components/detail/ShareServiceCard'
import GuaranteePreview from '../components/detail/GuaranteePreview'
import BackupCollapse from '../components/detail/BackupCollapse'
import { getPlanDetail, resolvePlanType } from '../data/planDetailData'
import { SELECTED_PLAN_KEY } from '../data/compareData'

function resolveType(searchParams, state) {
  const fromQuery = searchParams.get('type')
  if (fromQuery) return resolvePlanType(fromQuery)

  const fromState = state?.selectedPlan?.id || state?.planType
  if (fromState) return resolvePlanType(fromState)

  try {
    const stored = JSON.parse(window.sessionStorage.getItem(SELECTED_PLAN_KEY) || 'null')
    if (stored?.id) return resolvePlanType(stored.id)
  } catch {
    // ignore
  }

  return 'time'
}

export default function PlanDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const planType = useMemo(
    () => resolveType(searchParams, location.state),
    [searchParams, location.state],
  )
  const plan = useMemo(() => getPlanDetail(planType), [planType])

  const handleSelect = () => {
    const selected = {
      id: plan.id,
      name: plan.planType,
      lifeTime: plan.activityTime,
      price: `¥${plan.price}`,
      gainMinutes: plan.recoveredTime,
    }
    window.sessionStorage.setItem(SELECTED_PLAN_KEY, JSON.stringify(selected))
    const type =
      plan.id === 'relax' ? 'relaxed' : plan.id === 'experience' ? 'experience' : 'time'
    navigate(`/time-guarantee?type=${type}`, { state: { selectedPlan: selected } })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page plan-detail-page">
        <header className="pd-hero">
          <div className="pd-hero__sky" aria-hidden="true" />
          <div className="pd-hero__skyline" aria-hidden="true" />

          <div className="pd-topbar">
            <button
              type="button"
              className="pd-icon-btn"
              aria-label="返回"
              onClick={() => navigate('/compare')}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button type="button" className="pd-icon-btn" aria-label="分享">
              <Share2 size={16} strokeWidth={2.2} />
            </button>
          </div>

          <div className="pd-hero__copy">
            <h1>{plan.planType}方案</h1>
            <p>{plan.subtitle}</p>
          </div>
        </header>

        <ResultSummary plan={plan} />
        <PlanTimeline timeline={plan.timeline} />
        <RouteSketchCard plan={plan} />
        <WhyLowAltitude plan={plan} />
        <ShareServiceCard plan={plan} />
        <GuaranteePreview planType={planType} />
        <BackupCollapse />
      </div>

      <div className="pd-bottom-bar">
        <button type="button" className="pd-primary-btn" onClick={handleSelect}>
          选择这个方案
        </button>
        <button
          type="button"
          className="pd-secondary-btn"
          onClick={() => navigate('/compare')}
        >
          返回比较其他方案
        </button>
      </div>
    </div>
  )
}
