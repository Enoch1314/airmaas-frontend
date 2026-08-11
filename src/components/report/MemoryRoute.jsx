const ICON_MAP = {
  home: '起',
  cloud: '云',
  adjust: '调',
  city: '城',
  art: '展',
  coffee: '停',
  walk: '步',
  return: '返',
  sky: '空',
}

export default function MemoryRoute({ nodes }) {
  return (
    <section className="wr-memory">
      <h3>我的记忆航线</h3>
      <p className="wr-memory__sub">生活记忆路线，不是航空轨迹回放。</p>
      <ol className="wr-memory__list">
        {nodes.map((node) => (
          <li key={`${node.time}-${node.title}`}>
            <div className="wr-memory__time">{node.time}</div>
            <div className="wr-memory__card">
              <span className="wr-memory__icon" aria-hidden="true">
                {ICON_MAP[node.icon] || '·'}
              </span>
              <div>
                <strong>{node.title}</strong>
                <em>{node.desc}</em>
              </div>
              <div className="wr-memory__shot" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
