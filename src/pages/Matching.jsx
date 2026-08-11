import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import MatchBriefCard from '../components/matching/MatchBriefCard'
import MatchProgressCard from '../components/matching/MatchProgressCard'
import CompanionsCard from '../components/matching/CompanionsCard'
import FlightInfoCard from '../components/matching/FlightInfoCard'
import FormedSuccessCard from '../components/matching/FormedSuccessCard'
import MatchActions from '../components/matching/MatchActions'
import GuaranteeTip from '../components/matching/GuaranteeTip'
import AlternativesPanel from '../components/matching/AlternativesPanel'
import DemoStatusBar from '../components/matching/DemoStatusBar'
import { GUARANTEE_SELECTION_KEY } from '../data/guaranteeData'
import { SERVICE_SELECTION_KEY } from '../data/serviceSelectData'
import { SELECTED_PLAN_KEY } from '../data/compareData'
import { userProfile } from '../data/mockData'
import {
  buildMatchContext,
  companionsMatching,
  companionsReady,
  formatCountdown,
  getDefaultMatchStatus,
  getStatusCopy,
  matchingInfoBase,
  resolveMatchStatus,
} from '../data/matchingData'

function readJson(key) {
  try {
    return JSON.parse(window.sessionStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function resolveServiceSelection(state) {
  if (state?.selectedService || state?.serviceTitle) return state
  return readJson(SERVICE_SELECTION_KEY)
}

function resolveGuarantees(state, serviceSelection) {
  if (state?.selectedIds || state?.guarantees || typeof state?.guaranteeFee === 'number') {
    return state
  }
  if (serviceSelection?.guarantees || serviceSelection?.selectedIds) {
    return serviceSelection.guarantees || serviceSelection
  }
  return readJson(GUARANTEE_SELECTION_KEY)
}

function resolvePlanTypeValue(state, serviceSelection, searchParams) {
  return (
    searchParams.get('type') ||
    state?.planType ||
    serviceSelection?.planType ||
    readJson(SELECTED_PLAN_KEY)?.id ||
    'time'
  )
}

function statusToQuery(status) {
  if (status === 'notFormed') return 'notformed'
  return status
}

export default function Matching() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const demoMode = searchParams.get('demo') === '1'
  const [toast, setToast] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [selectedHub, setSelectedHub] = useState('qingpu')
  const [selectedAlt, setSelectedAlt] = useState('')
  const [showAlts, setShowAlts] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(matchingInfoBase.countdownStart)

  const serviceSelection = useMemo(
    () => resolveServiceSelection(location.state),
    [location.state],
  )
  const guarantees = useMemo(
    () => resolveGuarantees(location.state, serviceSelection),
    [location.state, serviceSelection],
  )
  const planType = resolvePlanTypeValue(
    location.state,
    serviceSelection,
    searchParams,
  )

  const ctx = useMemo(
    () =>
      buildMatchContext({
        planType,
        serviceSelection,
        guarantees,
      }),
    [planType, serviceSelection, guarantees],
  )

  const queryStatus = resolveMatchStatus(searchParams.get('status'))
  const [status, setStatus] = useState(
    () => queryStatus || getDefaultMatchStatus(ctx.planType),
  )

  useEffect(() => {
    if (queryStatus) {
      setStatus(queryStatus)
      return
    }
    setStatus(getDefaultMatchStatus(ctx.planType))
  }, [queryStatus, ctx.planType])

  useEffect(() => {
    if (status !== 'matching') return undefined
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [status])

  useEffect(() => {
    if (status === 'notFormed') setShowAlts(true)
  }, [status])

  const copy = getStatusCopy(status, ctx)
  const companions =
    status === 'matching' || status === 'notFormed'
      ? companionsMatching
      : companionsReady

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const changeStatus = (next) => {
    setStatus(next)
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('status', statusToQuery(next))
    setSearchParams(nextParams, { replace: true })
    if (next === 'formed' || next === 'ready' || next === 'bookable') {
      setShowAlts(false)
    }
  }

  const goConfirm = (extra = {}) => {
    const payload = {
      ...ctx,
      status,
      selectedSlot,
      selectedHub,
      selectedAlt,
      ...extra,
    }
    navigate('/order-confirm', { state: payload })
  }

  const primaryAction = () => {
    if (status === 'matching') {
      showToast('继续为相近需求匹配共享座位')
      return
    }
    if (status === 'notFormed') {
      if (!selectedAlt) {
        showToast('请先选择一个替代方案')
        return
      }
      if (selectedAlt === 'ground') {
        navigate('/compare', { state: { from: 'matching-ground' } })
        return
      }
      goConfirm({ alternative: selectedAlt })
      return
    }
    goConfirm()
  }

  const primaryLabel =
    status === 'matching'
      ? '继续等待匹配'
      : status === 'notFormed'
        ? '确认新的方案'
        : status === 'formed'
          ? '确认班次并继续'
          : '确认当前班次'

  const secondaryLabel =
    status === 'matching'
      ? '查看替代方案'
      : status === 'notFormed'
        ? '返回方案比较'
        : '返回调整'

  const secondaryAction = () => {
    if (status === 'matching') {
      setShowAlts(true)
      return
    }
    if (status === 'notFormed') {
      navigate('/compare')
      return
    }
    navigate(-1)
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page matching-page">
        <header className="mt-hero">
          <div className="mt-hero__sky" aria-hidden="true" />
          <div className="mt-hero__skyline" aria-hidden="true" />

          <div className="mt-topbar">
            <button
              type="button"
              className="mt-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="mt-avatar-user" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="mt-hero__copy">
            <h1>共享班次匹配</h1>
            <p>正在为时间和方向相近的用户匹配共享座位。</p>
            <span>
              满足成班条件后，平台将在可用运力、批准走廊和服务时窗内确认班次。
            </span>
          </div>
        </header>

        <MatchBriefCard ctx={ctx} />

        <MatchProgressCard
          status={status}
          copy={copy}
          countdown={formatCountdown(secondsLeft)}
        />

        {status === 'formed' ? <FormedSuccessCard ctx={ctx} /> : null}

        {status !== 'notFormed' ? (
          <CompanionsCard
            companions={companions}
            showTags={ctx.isSameInterest}
          />
        ) : null}

        {status === 'matching' || status === 'ready' || status === 'bookable' ? (
          <FlightInfoCard
            ctx={ctx}
            matched={status === 'matching' ? 3 : 4}
            status={status}
          />
        ) : null}

        {status === 'matching' ? (
          <MatchActions
            selectedSlot={selectedSlot}
            selectedHub={selectedHub}
            onInvite={() => showToast('已生成同行邀请链接（原型演示）')}
            onSelectSlot={(id) => {
              setSelectedSlot(id)
              showToast('接受相邻时段可提高匹配成功机会')
            }}
            onSelectHub={setSelectedHub}
            onUseTimeCoin={() => showToast('已兑换优先匹配权益（原型演示）')}
          />
        ) : null}

        <GuaranteeTip labels={ctx.guaranteeLabels} planType={ctx.planType} />

        {status === 'notFormed' || showAlts ? (
          <AlternativesPanel
            selectedId={selectedAlt}
            onSelect={setSelectedAlt}
            emphasized={status === 'notFormed'}
          />
        ) : null}

        {demoMode && status === 'matching' ? (
          <button
            type="button"
            className="mt-sim"
            onClick={() => changeStatus('formed')}
          >
            模拟匹配完成
          </button>
        ) : null}

        {demoMode ? (
          <DemoStatusBar
            status={
              status === 'ready' || status === 'bookable' ? 'formed' : status
            }
            onChange={changeStatus}
          />
        ) : null}
      </div>

      <div className="mt-bottom-bar">
        <button type="button" className="mt-primary-btn" onClick={primaryAction}>
          {primaryLabel}
        </button>
        <button
          type="button"
          className="mt-secondary-btn"
          onClick={secondaryAction}
        >
          {secondaryLabel}
        </button>
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
