export default function OrderTimeline({ timeline }) {
  const compact = []
  for (let i = 0; i < timeline.length; i += 1) {
    const cur = timeline[i]
    const next = timeline[i + 1]
    if (
      cur.type === 'activity' &&
      next?.type === 'activity' &&
      cur.title.includes('开始') &&
      next.title.includes('结束')
    ) {
      compact.push({
        time: `${cur.time}—${next.time}`,
        title: '西岸美术馆看展',
        type: 'activity',
      })
      i += 1
      continue
    }
    compact.push(cur)
  }

  return (
    <section className="oc-timeline">
      <h3>你的完整周末</h3>
      <ol>
        {compact.map((item) => (
          <li key={`${item.time}-${item.title}`} className={`is-${item.type || 'ground'}`}>
            <strong>{item.time}</strong>
            <span>{item.title}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
