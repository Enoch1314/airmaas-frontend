import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PlanBriefCard from '../components/guarantee/PlanBriefCard'
import GuaranteeCard from '../components/guarantee/GuaranteeCard'
import RecommendCombo from '../components/guarantee/RecommendCombo'
import GuaranteeSummary from '../components/guarantee/GuaranteeSummary'
import CompensationCollapse from '../components/guarantee/CompensationCollapse'
import TimeBankHint from '../components/guarantee/TimeBankHint'
import {
  GUARANTEE_SELECTION_KEY,
  defaultGuaranteeState,
  getGuaranteeItems,
} from '../data/guaranteeData'
import { getPlanDetail, resolvePlanType } from '../data/planDetailData'
import { SELECTED_PLAN_KEY } from '../data/compareData'
import { userProfile } from '../data/mockData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

function resolveCurrentPlan(searchParams, state) {
  const fromQuery = searchParams.get('type')
  if (fromQuery) return getPlanDetail(fromQuery)

  const fromState = state?.selectedPlan?.id || state?.planType
  if (fromState) return getPlanDetail(fromState)

  try {
    const stored = JSON.parse(window.sessionStorage.getItem(SELECTED_PLAN_KEY) || 'null')
    if (stored?.id) return getPlanDetail(stored.id)
  } catch {
    // ignore
  }

  return getPlanDetail('time')
}

export default function TimeGuarantee() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [toast, setToast] = useState('')
  const [enabled, setEnabled] = useState(defaultGuaranteeState)

  const plan = useMemo(
    () => resolveCurrentPlan(searchParams, location.state),
    [searchParams, location.state],
  )
  const planType = resolvePlanType(plan.id)
  const guaranteeItems = useMemo(() => getGuaranteeItems(planType), [planType])

  const selectedItems = guaranteeItems.filter((item) => enabled[item.id])
  const guaranteeFee = selectedItems.reduce((sum, item) => sum + item.fee, 0)
  const totalFee = plan.price + guaranteeFee

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const persistAndGo = (nextEnabled) => {
    const payload = {
      planType: resolvePlanType(plan.id),
      planId: plan.id,
      planName: plan.planType,
      basePrice: plan.price,
      guarantees: nextEnabled,
      selectedIds: Object.keys(nextEnabled).filter((key) => nextEnabled[key]),
      guaranteeFee: guaranteeItems
        .filter((item) => nextEnabled[item.id])
        .reduce((sum, item) => sum + item.fee, 0),
      totalFee:
        plan.price +
        guaranteeItems
          .filter((item) => nextEnabled[item.id])
          .reduce((sum, item) => sum + item.fee, 0),
    }
    window.sessionStorage.setItem(GUARANTEE_SELECTION_KEY, JSON.stringify(payload))
    navigate('/service-select', { state: payload })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page time-guarantee-page">
        <header className="tg-hero">
          <PageHeroBackdrop src={pageHeroPhoto.timeGuarantee} />

          <div className="tg-topbar">
            <button
              type="button"
              className="tg-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="tg-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="tg-hero__copy">
            <h1>关键时间保障</h1>
            <p>选出这次周末最不能被打乱的时间。</p>
            <span>平台会围绕这些时间要求安排交通、活动和返程。</span>
          </div>
        </header>

        <PlanBriefCard plan={plan} />

        <section className="tg-list">
          <h2>选择关键时间保障</h2>
          {guaranteeItems.map((item) => (
            <GuaranteeCard
              key={item.id}
              item={item}
              enabled={enabled[item.id]}
              onToggle={(id) =>
                setEnabled((prev) => ({ ...prev, [id]: !prev[id] }))
              }
            />
          ))}
        </section>

        <RecommendCombo
          onApply={() =>
            setEnabled({
              arrival: false,
              activityDuration: true,
              returnHome: true,
            })
          }
        />

        <GuaranteeSummary
          selectedItems={selectedItems}
          guaranteeFee={guaranteeFee}
          totalFee={totalFee}
        />

        <CompensationCollapse />
        <TimeBankHint onLearn={() => showToast('将在行程完成后统一记录')} />
      </div>

      <div className="tg-bottom-bar">
        <button
          type="button"
          className="tg-primary-btn"
          onClick={() => persistAndGo(enabled)}
        >
          确认时间保障
        </button>
        <button
          type="button"
          className="tg-secondary-btn"
          onClick={() =>
            persistAndGo({
              arrival: false,
              activityDuration: false,
              returnHome: false,
            })
          }
        >
          暂不添加保障
        </button>
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
