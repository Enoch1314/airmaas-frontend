import { compareTable } from '../../data/compareData'

export default function CompareMatrix() {
  return (
    <section className="cp-matrix">
      <h3>轻量比较</h3>
      <div className="cp-matrix__table">
        <div className="cp-matrix__row is-head">
          <span />
          {compareTable.headers.map((header) => (
            <strong key={header}>{header}</strong>
          ))}
        </div>
        {compareTable.rows.map((row) => (
          <div key={row.label} className="cp-matrix__row">
            <span>{row.label}</span>
            {row.values.map((value, index) => (
              <em key={`${row.label}-${compareTable.headers[index]}`}>{value}</em>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
