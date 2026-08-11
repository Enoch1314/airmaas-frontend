export default function RouteSketchCard({ plan }) {
  return (
    <section className="pd-map">
      <div className="pd-map__head">
        <h3>空地路线示意</h3>
        <span>{plan.flightHint}</span>
      </div>

      <svg className="pd-map__svg" viewBox="0 0 320 150" fill="none" aria-hidden="true">
        <path
          d="M28 108 H118"
          stroke="#8FA3B8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M118 108 C160 40, 220 40, 262 108"
          stroke="#2F7FE8"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <path
          d="M262 108 H292"
          stroke="#8FA3B8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="28" cy="108" r="6" fill="#2F7FE8" />
        <circle cx="118" cy="108" r="6" fill="#5B9FE8" />
        <circle cx="190" cy="52" r="5" fill="#FF8A45" />
        <circle cx="262" cy="108" r="6" fill="#5B9FE8" />
        <circle cx="292" cy="108" r="6" fill="#F08A4B" />
      </svg>

      <div className="pd-map__flow">
        {plan.routeFlow.map((item) => (
          <span
            key={item}
            className={item.includes('eVTOL') || item.includes('天空散步') ? 'is-air' : ''}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
