import { getActivityEstimate } from '../../data/returnAdjustData'

export default function GuaranteeStatusCard({ ctx, selected }) {
  const home = selected?.home || ctx.pack.base.home
  const meets = selected ? selected.meets : true
  const activityLabel = getActivityEstimate(
    ctx.pack.base.estimatedActivity,
    selected?.activityDelta || 0,
  )

  return (
    <section className="ra-guarantee">
      <h3>你的关键时间要求</h3>
      <div className="ra-guarantee__item">
        <strong>活动时长保障</strong>
        <span>{ctx.activityTarget.target}</span>
        <em>
          当前预计：{activityLabel}
          <b className="is-ok">正常</b>
        </em>
      </div>
      <div className="ra-guarantee__item">
        <strong>返程保障</strong>
        <span>21:00 前到家</span>
        <em>
          当前选择方案：{home} 到家
          <b className={meets ? 'is-ok' : 'is-warn'}>
            {meets ? '✓ 均满足' : '⚠ 无法满足'}
          </b>
        </em>
      </div>
    </section>
  )
}
