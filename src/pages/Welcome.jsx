import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  markOnboardingSeen,
  welcomeSlides,
} from '../data/welcomeData'

function WelcomeBackdrop() {
  return (
    <div className="wl-bg" aria-hidden="true">
      <div className="wl-bg__sky" />
      <div className="wl-bg__sun" />
      <div className="wl-bg__cloud wl-bg__cloud--1" />
      <div className="wl-bg__cloud wl-bg__cloud--2" />
      <div className="wl-bg__cloud wl-bg__cloud--3" />
      <div className="wl-bg__craft" />
      <div className="wl-bg__city" />
      <div className="wl-bg__mist" />
    </div>
  )
}

function LifeVisual() {
  return (
    <div className="wl-visual wl-visual--life" aria-hidden="true">
      <div className="wl-life__sky" />
      <div className="wl-life__city" />
      <div className="wl-life__people" />
      <div className="wl-life__craft" />
      <div className="wl-life__badge">生活时间</div>
    </div>
  )
}

function DirectVisual({ flow }) {
  return (
    <div className="wl-visual wl-visual--direct" aria-hidden="true">
      <div className="wl-flow">
        {flow.map((item, index) => (
          <div key={item} className="wl-flow__item">
            <span>{item}</span>
            {index < flow.length - 1 ? <i>→</i> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function SmartVisual({ bubble, tags }) {
  return (
    <div className="wl-visual wl-visual--smart" aria-hidden="true">
      <div className="wl-bubble">{bubble}</div>
      <div className="wl-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

function GuaranteeVisual({ guarantees }) {
  return (
    <div className="wl-visual wl-visual--guarantee" aria-hidden="true">
      <div className="wl-guards">
        {guarantees.map((item) => (
          <div key={item}>
            <em />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Welcome() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)
  const slide = welcomeSlides[index]
  const isLast = index === welcomeSlides.length - 1

  const finish = () => {
    markOnboardingSeen()
    navigate('/', { replace: true })
  }

  const goNext = () => {
    if (isLast) {
      finish()
      return
    }
    setIndex((n) => Math.min(n + 1, welcomeSlides.length - 1))
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

  return (
    <div className="phone-shell phone-shell--welcome">
      <div
        className={`welcome-page welcome-page--${slide.visual}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <WelcomeBackdrop />

        <header className="wl-top">
          <span className="wl-brand">AirMaaS</span>
          <button type="button" className="wl-skip" onClick={finish}>
            跳过
          </button>
        </header>

        <div className="wl-stage" key={slide.id}>
          {slide.visual === 'life' ? <LifeVisual /> : null}
          {slide.visual === 'direct' ? <DirectVisual flow={slide.flow} /> : null}
          {slide.visual === 'smart' ? (
            <SmartVisual bubble={slide.bubble} tags={slide.tags} />
          ) : null}
          {slide.visual === 'guarantee' ? (
            <GuaranteeVisual guarantees={slide.guarantees} />
          ) : null}

          <div className="wl-copy">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            {slide.footer ? <strong>{slide.footer}</strong> : null}
            {slide.bankNote ? <em className="wl-bank">{slide.bankNote}</em> : null}
          </div>
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
            <span>
              {index + 1} / {welcomeSlides.length}
            </span>
          </div>
          <button type="button" className="wl-primary" onClick={goNext}>
            {isLast ? '开始我的周末' : '下一步'}
          </button>
        </footer>
      </div>
    </div>
  )
}
