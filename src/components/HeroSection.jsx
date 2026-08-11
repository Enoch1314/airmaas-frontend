function EvtolMark() {
  return (
    <svg className="hero-evtol" viewBox="0 0 140 70" aria-hidden="true">
      <ellipse cx="72" cy="40" rx="40" ry="10" fill="rgba(255,255,255,0.55)" />
      <path
        d="M28 38c10-11 28-18 44-18s34 7 42 18c-10 8-24 13-42 13S38 46 28 38Z"
        fill="rgba(255,255,255,0.82)"
        stroke="rgba(120,170,220,0.45)"
        strokeWidth="1"
      />
      <rect x="52" y="30" width="36" height="12" rx="6" fill="#EAF4FF" />
      <rect x="64" y="25" width="14" height="7" rx="3.5" fill="#FF9B63" />
      <path
        d="M34 34h18M90 34h18"
        stroke="#9EC4EB"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="42" cy="44" r="2.2" fill="#5B9FE8" />
      <circle cx="102" cy="44" r="2.2" fill="#5B9FE8" />
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="hero" aria-label="品牌主视觉">
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-skyline" aria-hidden="true" />
      <EvtolMark />
      <div className="hero-copy">
        <h1 className="hero-title">把周末还给生活</h1>
        <p className="hero-subtitle">
          去一个想去的地方，
          <br />
          或者告诉我们你想怎样度过。
        </p>
      </div>
    </section>
  )
}
