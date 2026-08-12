import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ServiceBriefCard from '../components/service/ServiceBriefCard'
import ServiceOptionCard from '../components/service/ServiceOptionCard'
import StandardShareOption from '../components/service/StandardShareOption'
import RouteOptionCard from '../components/service/RouteOptionCard'
import InteractionPrefs from '../components/service/InteractionPrefs'
import ComboResultCard from '../components/service/ComboResultCard'
import CompatibilityHint from '../components/service/CompatibilityHint'
import CabinNote from '../components/service/CabinNote'
import { GUARANTEE_SELECTION_KEY } from '../data/guaranteeData'
import { SELECTED_PLAN_KEY } from '../data/compareData'
import { getPlanDetail, resolvePlanType } from '../data/planDetailData'
import { userProfile } from '../data/mockData'
import {
  SERVICE_SELECTION_KEY,
  calcServiceAdjustFee,
  getComboCopy,
  getCompatibilityHint,
  getRecommendation,
  getRouteById,
  getServiceById,
  interactionOptions,
  resolveGuaranteeFee,
  resolveGuaranteeLabels,
  routeOptions,
  serviceOptions,
  standardService,
} from '../data/serviceSelectData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

function readStoredGuarantees() {
  try {
    return JSON.parse(window.sessionStorage.getItem(GUARANTEE_SELECTION_KEY) || 'null')
  } catch {
    return null
  }
}

function resolvePlan(searchParams, state, guarantees) {
  const fromQuery = searchParams.get('type')
  if (fromQuery) return getPlanDetail(fromQuery)

  const fromState =
    state?.planType || state?.planId || state?.selectedPlan?.id || guarantees?.planType
  if (fromState) return getPlanDetail(fromState)

  try {
    const stored = JSON.parse(window.sessionStorage.getItem(SELECTED_PLAN_KEY) || 'null')
    if (stored?.id) return getPlanDetail(stored.id)
  } catch {
    // ignore
  }

  return getPlanDetail('time')
}

export default function ServiceSelect() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const guarantees = useMemo(() => {
    const state = location.state
    if (
      state &&
      (Array.isArray(state.selectedIds) ||
        state.guarantees ||
        typeof state.guaranteeFee === 'number' ||
        state.planType)
    ) {
      return state
    }
    return readStoredGuarantees()
  }, [location.state])

  const plan = useMemo(
    () => resolvePlan(searchParams, location.state, guarantees),
    [searchParams, location.state, guarantees],
  )

  const planType = resolvePlanType(plan.id)
  const recommendation = getRecommendation(planType)

  const [selectedService, setSelectedService] = useState(recommendation.service)
  const [selectedRoute, setSelectedRoute] = useState(recommendation.route)
  const [interactionPreference, setInteractionPreference] = useState('quiet')

  useEffect(() => {
    const next = getRecommendation(planType)
    setSelectedService(next.service)
    setSelectedRoute(next.route)
  }, [planType])

  const guaranteeLabels = resolveGuaranteeLabels(guarantees)
  const guaranteeFee = resolveGuaranteeFee(guarantees)

  const service = getServiceById(selectedService)
  const route = getRouteById(selectedRoute)
  const adjustFee = calcServiceAdjustFee(selectedService, selectedRoute)
  const totalFee = plan.price + guaranteeFee + adjustFee
  const combo = getComboCopy(planType, selectedService, selectedRoute)
  const hint = getCompatibilityHint(selectedService, selectedRoute)

  const applyRecommendation = () => {
    const next = getRecommendation(planType)
    setSelectedService(next.service)
    setSelectedRoute(next.route)
    if (next.service === 'sameInterest') {
      setInteractionPreference('quiet')
    }
  }

  const confirmSelection = () => {
    const payload = {
      planType,
      planId: plan.id,
      planName: plan.planType,
      selectedService,
      selectedRoute,
      interactionPreference:
        selectedService === 'sameInterest' ? interactionPreference : null,
      serviceTitle: service.title,
      routeTitle: route.title,
      adjustFee,
      basePrice: plan.price,
      guaranteeFee,
      totalFee,
      guarantees,
    }
    window.sessionStorage.setItem(SERVICE_SELECTION_KEY, JSON.stringify(payload))
    navigate('/matching', { state: payload })
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page service-select-page">
        <header className="ss-hero">
          <PageHeroBackdrop src={pageHeroPhoto.serviceSelect} />

          <div className="ss-topbar">
            <button
              type="button"
              className="ss-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="ss-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="ss-hero__copy">
            <h1>选择共享服务与航线</h1>
            <p>
              根据你的同行关系、时间要求和周末节奏，选择更适合这次出行的方式。
            </p>
          </div>
        </header>

        <ServiceBriefCard plan={plan} guaranteeLabels={guaranteeLabels} />

        <section className="ss-section ss-section--service">
          <div className="ss-section__head">
            <h2>这次想怎样一起飞？</h2>
            <p>
              不同选项代表不同的服务组织方式，不是固定物理隔舱，也不改变统一的飞行安全标准。
            </p>
          </div>

          {serviceOptions.map((option) => (
            <ServiceOptionCard
              key={option.id}
              option={option}
              selected={selectedService === option.id}
              onSelect={setSelectedService}
            />
          ))}

          <StandardShareOption
            option={standardService}
            selected={selectedService === standardService.id}
            onSelect={setSelectedService}
          />

          {selectedService === 'sameInterest' ? (
            <InteractionPrefs
              options={interactionOptions}
              value={interactionPreference}
              onChange={setInteractionPreference}
            />
          ) : null}
        </section>

        <section className="ss-section ss-section--route">
          <div className="ss-section__head">
            <h2>这段低空想怎样飞？</h2>
            <p>形成舱型—航线联合匹配，让服务方式和飞行节奏一致。</p>
          </div>

          {routeOptions.map((option) => (
            <RouteOptionCard
              key={option.id}
              option={option}
              selected={selectedRoute === option.id}
              onSelect={setSelectedRoute}
            />
          ))}
        </section>

        <CompatibilityHint hint={hint} />

        <ComboResultCard
          serviceTitle={service.title}
          routeTitle={route.title}
          fitLine={combo.fitLine}
          because={combo.because}
          recommended={combo.recommended}
          adjustFee={adjustFee}
          totalFee={totalFee}
          recommendReason={combo.recommended ? recommendation.reason : ''}
        />

        <CabinNote />
      </div>

      <div className="ss-bottom-bar">
        <button type="button" className="ss-primary-btn" onClick={confirmSelection}>
          确认选择，开始拼班
        </button>
        <button
          type="button"
          className="ss-secondary-btn"
          onClick={applyRecommendation}
        >
          使用平台推荐组合
        </button>
      </div>
    </div>
  )
}
