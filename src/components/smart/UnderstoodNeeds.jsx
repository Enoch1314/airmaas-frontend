import { smartNeedRows } from '../../data/smartPlanData'
import ConditionTags from './ConditionTags'

export default function UnderstoodNeeds({ conditions, onRemove }) {
  return (
    <section className="sp-understood">
      <div className="sp-understood__head">
        <h3>我理解的周末需求</h3>
        <span>可直接修改</span>
      </div>

      <div className="sp-understood__rows">
        {smartNeedRows.map((row) => (
          <div key={row.key} className="sp-understood__row">
            <span>{row.key}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>

      <ConditionTags items={conditions} onRemove={onRemove} />
    </section>
  )
}
