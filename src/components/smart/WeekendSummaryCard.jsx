import { weekendSummaryDefault } from '../../data/smartPlanData'

export default function WeekendSummaryCard({ returnLabel }) {
  const lines = [...weekendSummaryDefault.lines]
  if (returnLabel && returnLabel !== '不确定') {
    lines[lines.length - 1] = `${returnLabel}前回家`
  } else if (returnLabel === '不确定') {
    lines[lines.length - 1] = '返程时间灵活'
  }

  return (
    <section className="sp-summary">
      <h3>我想拥有的周末</h3>
      <ul>
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="sp-summary__highlight">{weekendSummaryDefault.highlight}</p>
    </section>
  )
}
