import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, CalendarPlus, Share2, Bell } from 'lucide-react'
import { userProfile } from '../data/mockData'
import {
  nextStepMock,
  quickActions,
  resolveBookingSuccessContext,
} from '../data/bookingSuccessData'
import PageHeroBackdrop from '../components/PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

const actionIcons = {
  calendar: CalendarPlus,
  share: Share2,
  remind: Bell,
}

export default function BookingSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [toast, setToast] = useState('')

  const ctx = useMemo(
    () => resolveBookingSuccessContext(location.state, searchParams),
    [location.state, searchParams],
  )

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className="phone-shell phone-shell--subpage">
      <div className="app-page booking-success-page">
        <header className="bs-hero">
          <PageHeroBackdrop src={pageHeroPhoto.bookingSuccess} />

          <div className="bs-topbar">
            <button
              type="button"
              className="bs-icon-btn"
              aria-label="返回"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <div className="bs-avatar" aria-hidden="true">
              {userProfile.avatarText}
            </div>
          </div>

          <div className="bs-hero__success">
            <div className="bs-check" aria-hidden="true">
              <Check size={34} strokeWidth={2.8} />
            </div>
            <h1>你的周末已生成</h1>
            <p>
              交通、活动、返程和关键时间保障
              <br />
              都已经整理到同一张数字行程单中。
            </p>
          </div>
        </header>

        <section className="bs-summary">
          <div className="bs-summary__head">
            <em>西岸美术馆看展</em>
            <span>周六 06-24</span>
          </div>
          <div className="bs-summary__plan">{ctx.plan.planType}方案</div>
          <div className="bs-summary__combo">
            <strong>{ctx.serviceTitle}</strong>
            <span>＋</span>
            <strong>{ctx.routeTitle}</strong>
          </div>
          <div className="bs-summary__times">
            <div>
              <span>出发</span>
              <strong>{ctx.flight.depart}</strong>
            </div>
            <div>
              <span>到达</span>
              <strong>{ctx.flight.arrive} 左右</strong>
            </div>
            <div>
              <span>到家</span>
              <strong>{ctx.plan.arrivalHome}</strong>
            </div>
          </div>
          <div className="bs-summary__life">
            <div>
              <strong>{ctx.plan.activityTime}</strong>
              <span>真正留给活动</span>
            </div>
            <div>
              <strong className="is-warm">多留{ctx.plan.recoveredTime}分钟</strong>
              <span>比纯地面给生活</span>
            </div>
          </div>
        </section>

        <section className="bs-flight">
          <div className="bs-flight__head">
            <h3>共享班次已确认</h3>
            <em>✓ 4 / 4</em>
          </div>
          <div className="bs-flight__grid">
            <div>
              <span>集合时间</span>
              <strong>{ctx.flight.gatherTime}</strong>
            </div>
            <div>
              <span>预计起飞</span>
              <strong>{ctx.flight.takeoff}</strong>
            </div>
            <div className="is-wide">
              <span>集合地点</span>
              <strong>{ctx.flight.place}</strong>
            </div>
            <div>
              <span>服务</span>
              <strong>{ctx.serviceTitle}</strong>
            </div>
            <div>
              <span>航线</span>
              <strong>{ctx.routeTitle}</strong>
            </div>
            <div>
              <span>当前人数</span>
              <strong>{ctx.flight.seats}</strong>
            </div>
          </div>
        </section>

        <section className="bs-guarantee">
          <h3>这次你希望我们帮你守住：</h3>
          {ctx.guaranteeLines.length ? (
            <ul>
              {ctx.guaranteeLines.map((line) => (
                <li key={line}>✓ {line}</li>
              ))}
            </ul>
          ) : (
            <p className="bs-guarantee__empty">本次未添加关键时间保障</p>
          )}
          <p className="bs-guarantee__note">
            这些结果将在行程中持续跟踪，并记录到“周末时间银行”。
          </p>
        </section>

        <section className="bs-next">
          <h3>接下来</h3>
          <p className="bs-next__main">
            {nextStepMock.gatherBefore} 前
            <br />
            前往{nextStepMock.place}
          </p>
          <div className="bs-next__remain">
            <span>距离集合还有</span>
            <strong>{nextStepMock.remainLabel}</strong>
          </div>
          <button
            type="button"
            className="bs-next__btn"
            onClick={() => navigate('/itinerary', { state: ctx })}
          >
            查看数字行程单
          </button>
        </section>

        <div className="bs-actions">
          {quickActions.map((action) => {
            const Icon = actionIcons[action.id]
            return (
              <button
                type="button"
                key={action.id}
                onClick={() => showToast(action.toast)}
              >
                <Icon size={15} strokeWidth={2.2} />
                {action.label}
              </button>
            )
          })}
        </div>

        <p className="bs-quote">
          接下来，不用再拼交通和活动，跟着一张数字行程单走就可以了。
        </p>
      </div>

      <div className="bs-bottom-bar">
        <button
          type="button"
          className="bs-primary-btn"
          onClick={() => navigate('/itinerary', { state: ctx })}
        >
          查看我的数字行程
        </button>
        <button
          type="button"
          className="bs-secondary-btn"
          onClick={() => navigate('/')}
        >
          返回首页
        </button>
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
