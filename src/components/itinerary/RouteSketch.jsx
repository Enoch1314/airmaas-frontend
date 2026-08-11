export default function RouteSketch({
  nodes,
  highlightTo,
  nextSegmentLabel,
  nextSegmentTime,
}) {
  return (
    <section className="it-route">
      <h3>实时路线示意</h3>
      <div className="it-route__track" aria-hidden="true">
        {nodes.map((node, index) => {
          const active = index <= highlightTo
          const current = index === highlightTo
          return (
            <div
              key={node.id}
              className={`it-route__node is-${node.kind}${active ? ' is-on' : ''}${
                current ? ' is-current' : ''
              }`}
            >
              {index > 0 ? (
                <i className={`it-route__link is-${nodes[index].kind === 'air' || nodes[index - 1].kind === 'air' ? 'air' : 'ground'}${index <= highlightTo ? ' is-on' : ''}`} />
              ) : null}
              <b />
              <span>{node.label}</span>
            </div>
          )
        })}
      </div>
      <div className="it-route__next">
        <span>下一段</span>
        <strong>{nextSegmentLabel}</strong>
        <em>{nextSegmentTime}</em>
      </div>
    </section>
  )
}
