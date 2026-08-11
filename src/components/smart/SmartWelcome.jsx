export default function SmartWelcome() {
  return (
    <section className="sp-welcome">
      <div className="sp-welcome__robot" aria-hidden="true">
        <svg viewBox="0 0 64 56">
          <rect x="16" y="14" width="32" height="28" rx="10" fill="#FFFFFF" stroke="#D7E6F5" />
          <circle cx="26" cy="28" r="4" fill="#5B9FE8" />
          <circle cx="38" cy="28" r="4" fill="#5B9FE8" />
          <circle cx="26" cy="28" r="1.6" fill="#FFFFFF" />
          <circle cx="38" cy="28" r="1.6" fill="#FFFFFF" />
          <rect x="27" y="35" width="10" height="3" rx="1.5" fill="#FFB08A" />
          <rect x="29" y="6" width="6" height="8" rx="3" fill="#FF9B63" />
          <circle cx="32" cy="5" r="2.5" fill="#FFB08A" />
        </svg>
      </div>
      <div className="sp-welcome__bubble">
        <h3>这个周末想怎么过？</h3>
        <p>
          你可以直接告诉我：有多少时间、和谁一起、大概预算，以及想要什么感觉。
        </p>
        <span className="sp-welcome__badge">体验导向智能规划</span>
      </div>
    </section>
  )
}
