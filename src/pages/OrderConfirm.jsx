import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import OrderHeroCard from '../components/order/OrderHeroCard'
import OrderTimeline from '../components/order/OrderTimeline'
import OrderIncludes from '../components/order/OrderIncludes'
import OrderServiceCard from '../components/order/OrderServiceCard'
import OrderGuaranteeCard from '../components/order/OrderGuaranteeCard'
import OrderFeeCard from '../components/order/OrderFeeCard'
import OrderTimeCoin from '../components/order/OrderTimeCoin'
import OrderCompanions from '../components/order/OrderCompanions'
import OrderRulesCollapse from '../components/order/OrderRulesCollapse'
import OrderChecks from '../components/order/OrderChecks'
import { userProfile } from '../data/mockData'
import {
  ORDER_CONFIRM_KEY,
  buildFeeLines,
  calcPayable,
  getIncludedServices,
  resolveOrderContext,
  timeCoinConfig,
} from '../data/orderConfirmData'

export default function OrderConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [timeCoinEnabled, setTimeCoinEnabled] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [rulesRead, setRulesRead] = useState(false)
  const [paying, setPaying] = useState(false)
  const [toast, setToast] = useState('')

  const ctx = useMemo(
    () => resolveOrderContext(location.state, searchParams),
    [location.state, searchParams],
  )

  const feeLines = buildFeeLines(ctx)
  const included = getIncludedServices(ctx)
  const payable = calcPayable(ctx.subtotal, timeCoinEnabled)

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const handlePay = () => {
    if (!confirmed || paying) return
    setPaying(true)
    const payload = {
      ...ctx,
      timeCoinEnabled,
      payable,
      rulesRead,
    }
    window.sessionStorage.setItem(ORDER_CONFIRM_KEY, JSON.stringify(payload))
    window.setTimeout(() => {
      navigate('/booking-success', { state: payload })
    }, 900)
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page order-confirm-page">
        <header className="oc-hero">
          <div className="oc-hero__sky" aria-hidden="true" />
          <div className="oc-hero__skyline" aria-hidden="true" />

          <div className="oc-topbar">
            <button
              type="button"
              className="oc-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="oc-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="oc-hero__copy">
            <h1>确认周末方案</h1>
            <p>一次确认交通、活动、返程与时间保障。</p>
          </div>
        </header>

        <OrderHeroCard ctx={ctx} />
        <OrderTimeline timeline={ctx.timeline} />
        <OrderIncludes items={included} />
        <OrderServiceCard ctx={ctx} />
        <OrderGuaranteeCard
          items={ctx.selectedGuaranteeItems}
          onEdit={() =>
            navigate(`/time-guarantee?type=${ctx.planType}`, {
              state: { planType: ctx.planType },
            })
          }
        />
        <OrderFeeCard
          lines={feeLines}
          total={payable}
          timeCoinEnabled={timeCoinEnabled}
          discount={timeCoinConfig.discountYen}
        />
        <OrderTimeCoin
          enabled={timeCoinEnabled}
          onToggle={() => setTimeCoinEnabled((prev) => !prev)}
        />
        <OrderCompanions
          onAdd={() => showToast('同行人管理将在正式服务中接入')}
        />
        <OrderRulesCollapse />
        <OrderChecks
          confirmed={confirmed}
          rulesRead={rulesRead}
          onToggleConfirmed={setConfirmed}
          onToggleRules={setRulesRead}
        />
      </div>

      <div className="oc-bottom-bar">
        <div className="oc-pay-row">
          <div>
            <span>应付</span>
            <strong>¥{payable}</strong>
          </div>
          <button
            type="button"
            className="oc-pay-btn"
            disabled={!confirmed || paying}
            onClick={handlePay}
          >
            {paying ? '正在确认周末…' : '确认并模拟支付'}
          </button>
        </div>
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
