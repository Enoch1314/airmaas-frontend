import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Clock3,
  Lock,
  MapPin,
  Mic,
  Navigation,
  CalendarDays,
  Users,
  CheckCircle2,
} from 'lucide-react'
import {
  markOnboardingSeen,
  welcomeAssets,
  welcomeSlides,
} from '../data/welcomeData'
import { setPlanningMode } from '../data/planningModeData'

function PhotoSlot({ src, className, alt = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return <div className={`${className} is-missing`} aria-hidden="true" />
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}

function WelcomeBackdrop({ slide }) {
  return (
    <div className={`wl-bg wl-bg--${slide.visual}`} aria-hidden="true">
      <PhotoSlot src={slide.bg} className="wl-bg__photo" alt="" />
      <div className="wl-bg__veil" />
      {slide.showEvtol ? (
        <PhotoSlot
          src={welcomeAssets.evtol}
          className={`wl-bg__evtol${slide.evtolTone === 'far' ? ' is-far' : ' is-hero'}`}
          alt=""
        />
      ) : null}
    </div>
  )
}

const fieldIcons = [Navigation, MapPin, CalendarDays, Users]
const guardIcons = [Lock, Clock3, CheckCircle2]

function BrandSlide() {
  return (
    <div className="wl-slide wl-slide--brand">
      <p className="wl-wordmark">AirMaaS</p>
      <h1 className="wl-hero-title">把周末还给生活</h1>
      <p className="wl-hero-kicker">— 周末时光回收计划 —</p>

      <div className="wl-evtol-stage" aria-hidden="true">
        <PhotoSlot src={welcomeAssets.evtol} className="wl-evtol-stage__img" alt="" />
      </div>

      <section className="wl-glass wl-glass--compact">
        <p className="wl-glass__lead">
          空地联程 · 智能规划 · 时间保障 · 同频共飞
        </p>
        <p className="wl-glass__sub">为每一段周末，争取更多属于你的时间</p>
      </section>
    </div>
  )
}

function DirectSlide({ slide, onPlan }) {
  return (
    <div className="wl-slide wl-slide--direct">
      <h1 className="wl-hero-title">
        {slide.title}
        <span>{slide.titleLine2}</span>
      </h1>
      <p className="wl-hero-sub">{slide.subtitle}</p>

      <p className="wl-flow-lite" aria-hidden="true">
        起点 → 地面交通 → 共享低空 → 活动
      </p>

      <section className="wl-glass wl-glass--form">
        <div className="wl-glass__head">
          <MapPin size={16} strokeWidth={2.3} />
          <h2>我已经想好去哪</h2>
        </div>
        <ul className="wl-form-list">
          {slide.fields.map((field, index) => {
            const Icon = fieldIcons[index] || MapPin
            return (
              <li key={field.label}>
                <Icon size={14} strokeWidth={2.2} />
                <div>
                  <span>{field.label}</span>
                  <strong>{field.value}</strong>
                </div>
              </li>
            )
          })}
        </ul>
        <button type="button" className="wl-card-btn" onClick={onPlan}>
          查看出行方案
          <ChevronRight size={16} strokeWidth={2.4} />
        </button>
      </section>
    </div>
  )
}

function SmartSlide({ slide, onPlan }) {
  return (
    <div className="wl-slide wl-slide--smart">
      <h1 className="wl-hero-title">
        {slide.title}
        <span>{slide.titleLine2}</span>
      </h1>
      <p className="wl-hero-sub">{slide.subtitle}</p>

      <div className="wl-chat">
        <div className="wl-chat__bubble">{slide.bubble}</div>
        <PhotoSlot src={welcomeAssets.robot} className="wl-chat__robot" alt="" />
      </div>

      <section className="wl-glass wl-glass--smart">
        <h2>帮我设计周末</h2>
        <div className="wl-input-fake">
          <span>告诉我你的周末想法……</span>
          <Mic size={16} strokeWidth={2.2} />
        </div>
        <div className="wl-tags">
          {slide.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <button type="button" className="wl-card-btn wl-card-btn--orange" onClick={onPlan}>
          让 AI 帮我规划
          <ChevronRight size={16} strokeWidth={2.4} />
        </button>
      </section>
    </div>
  )
}

function GuaranteeSlide({ slide }) {
  return (
    <div className="wl-slide wl-slide--guarantee">
      <h1 className="wl-hero-title">{slide.title}</h1>
      <p className="wl-hero-sub">{slide.subtitle}</p>

      <section className="wl-glass wl-glass--guards">
        <h2>关键时间保障</h2>
        <ul className="wl-guard-list">
          {slide.guarantees.map((item, index) => {
            const Icon = guardIcons[index] || Lock
            return (
              <li key={item.id}>
                <div className="wl-guard-list__icon">
                  <Icon size={14} strokeWidth={2.3} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="wl-glass wl-glass--memory">
        <p className="wl-memory-label">本次周末结束后</p>
        <h2>{slide.memoryTitle}</h2>
        <p className="wl-memory-desc">{slide.memoryDesc}</p>
        <div className="wl-photos" aria-hidden="true">
          {welcomeAssets.memory.map((src) => (
            <PhotoSlot key={src} src={src} className="wl-photos__img" alt="" />
          ))}
        </div>
        <p className="wl-life-sample">{slide.lifeSample}</p>
      </section>
    </div>
  )
}

export default function Welcome() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState('')
  const touchStartX = useRef(null)
  const slide = welcomeSlides[index]
  const isFirst = index === 0
  const isLast = index === welcomeSlides.length - 1

  const finish = () => {
    markOnboardingSeen()
    navigate('/home', { replace: true })
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const goNext = () => {
    if (isLast || isFirst) {
      finish()
      return
    }
    setIndex((n) => Math.min(n + 1, welcomeSlides.length - 1))
  }

  const goDirect = () => {
    markOnboardingSeen()
    setPlanningMode('direct')
    navigate('/direct-plan', { state: { planningMode: 'direct' } })
  }

  const goSmart = () => {
    markOnboardingSeen()
    setPlanningMode('ai')
    navigate('/smart-plan', { state: { planningMode: 'ai' } })
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta < 0) {
      setIndex((n) => Math.min(n + 1, welcomeSlides.length - 1))
    } else {
      setIndex((n) => Math.max(n - 1, 0))
    }
  }

  const primaryLabel = isFirst
    ? '开始使用'
    : isLast
      ? '开始我的周末'
      : '下一步'

  return (
    <div className="phone-shell phone-shell--welcome">
      <div
        className={`welcome-page welcome-page--${slide.visual}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <WelcomeBackdrop slide={slide} />

        <header className="wl-top">
          <span className="wl-progress">{slide.progress}</span>
          <button type="button" className="wl-skip" onClick={finish}>
            跳过
          </button>
        </header>

        <div className="wl-stage" key={slide.id}>
          {slide.visual === 'brand' ? <BrandSlide /> : null}
          {slide.visual === 'direct' ? (
            <DirectSlide slide={slide} onPlan={goDirect} />
          ) : null}
          {slide.visual === 'smart' ? (
            <SmartSlide slide={slide} onPlan={goSmart} />
          ) : null}
          {slide.visual === 'guarantee' ? <GuaranteeSlide slide={slide} /> : null}
        </div>

        <footer className="wl-footer">
          <div className="wl-dots" aria-label={`第 ${index + 1} 屏，共 4 屏`}>
            {welcomeSlides.map((item, i) => (
              <button
                type="button"
                key={item.id}
                className={i === index ? 'is-on' : ''}
                aria-label={`第 ${i + 1} 屏`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button type="button" className="wl-primary" onClick={goNext}>
            {primaryLabel}
            {(isFirst || isLast) && <ChevronRight size={18} strokeWidth={2.4} />}
          </button>

          {isFirst ? (
            <button
              type="button"
              className="wl-auth"
              onClick={() => showToast('演示中暂不接入账号')}
            >
              登录 / 注册
            </button>
          ) : null}
        </footer>
      </div>

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
