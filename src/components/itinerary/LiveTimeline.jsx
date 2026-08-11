import { Check } from 'lucide-react'

export default function LiveTimeline({ timeline }) {
  return (
    <section className="it-timeline">
      <h3>今天的完整行程</h3>
      <ol>
        {timeline.map((item) => (
          <li key={`${item.time}-${item.title}`} className={`is-${item.state}`}>
            <div className="it-timeline__dot" aria-hidden="true">
              {item.state === 'done' ? <Check size={11} strokeWidth={3} /> : null}
            </div>
            <div>
              <strong>{item.time}</strong>
              <span>{item.title}</span>
              {item.state === 'current' ? <em>当前阶段</em> : null}
              {item.state === 'done' ? <em className="is-done">已完成</em> : null}
              {item.desc && item.state !== 'done' ? (
                <p>{item.desc}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
