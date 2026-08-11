export default function TripCompare({ scene }) {
  if (!scene.compare?.length) return null

  return (
    <section className="ta-compare">
      <h3>方案比较</h3>
      <div className="ta-compare__table">
        <div className="ta-compare__row is-head">
          <span />
          {scene.compareHeads.map((head) => (
            <span key={head}>{head}</span>
          ))}
        </div>
        {scene.compare.map((row) => (
          <div className="ta-compare__row" key={row.key}>
            <span>{row.key}</span>
            <span>{row.a}</span>
            <span>{row.b}</span>
            <span>{row.c}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
