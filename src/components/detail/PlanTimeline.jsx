import { Plane, TrainFront, Palette, Undo2, CarFront } from 'lucide-react'

const iconMap = {
  ground: TrainFront,
  air: Plane,
  activity: Palette,
  return: Undo2,
}

export default function PlanTimeline({ timeline = [] }) {
  return (
    <section className="pd-timeline">
      <h3>完整周末时间轴</h3>
      <ol>
        {timeline.map((item, index) => {
          const Icon = iconMap[item.type] || CarFront
          return (
            <li key={`${item.time}-${item.title}`} className={`is-${item.type}`}>
              <div className="pd-timeline__rail" aria-hidden="true">
                <span className="pd-timeline__dot">
                  <Icon size={12} strokeWidth={2.3} />
                </span>
                {index < timeline.length - 1 ? (
                  <span className="pd-timeline__line" />
                ) : null}
              </div>
              <div className="pd-timeline__body">
                <strong>{item.time}</strong>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
