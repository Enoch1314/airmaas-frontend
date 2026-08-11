export default function RouteSketch({ activeIndex, done }) {
  const lit = done ? 5 : Math.min(activeIndex + 1, 5)

  return (
    <div className={`gn-route${done ? ' is-done' : ''}`} aria-hidden="true">
      <svg className="gn-route__svg" viewBox="0 0 320 168" fill="none">
        <path
          className={`gn-route__ground${lit >= 1 ? ' is-on' : ''}`}
          d="M36 118 C90 118, 130 118, 160 118 C210 118, 250 118, 284 118"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className={`gn-route__air${lit >= 3 ? ' is-on' : ''}`}
          d="M48 110 C100 42, 220 42, 272 110"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 7"
        />
        <circle className={`gn-route__dot${lit >= 1 ? ' is-on' : ''}`} cx="36" cy="118" r="6" />
        <circle className={`gn-route__dot${lit >= 2 ? ' is-on' : ''}`} cx="110" cy="118" r="5" />
        <circle className={`gn-route__dot gn-route__dot--air${lit >= 3 ? ' is-on' : ''}`} cx="160" cy="56" r="6" />
        <circle className={`gn-route__dot gn-route__dot--warm${lit >= 4 ? ' is-on' : ''}`} cx="230" cy="118" r="6" />
        <circle className={`gn-route__dot${lit >= 5 ? ' is-on' : ''}`} cx="284" cy="118" r="6" />
        <circle className="gn-route__mover" r="4" />
      </svg>

      <div className="gn-route__labels">
        <span className={lit >= 1 ? 'is-on' : ''}>青浦</span>
        <span className={lit >= 2 ? 'is-on' : ''}>汇聚枢纽</span>
        <span className={lit >= 3 ? 'is-on' : ''}>共享低空</span>
        <span className={lit >= 4 ? 'is-on' : ''}>西岸美术馆</span>
        <span className={lit >= 5 ? 'is-on' : ''}>返程</span>
      </div>
    </div>
  )
}
