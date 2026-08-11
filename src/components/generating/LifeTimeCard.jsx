import { comparingPlans } from '../../data/generatingData'

export default function LifeTimeCard({ hours = '6', highlightIndex = 0 }) {
  return (
    <section className="gn-life">
      <p className="gn-life__label">你有</p>
      <p className="gn-life__metric">
        <em>{hours}</em>
        <span>小时</span>
      </p>
      <p className="gn-life__sub">周末时间</p>
      <p className="gn-life__desc">
        AirMaaS 正在尽量减少交通、换乘和等待对这段时间的占用。
      </p>

      <div className="gn-life__compare">
        <span>正在比较：</span>
        <div className="gn-life__chips">
          {comparingPlans.map((plan, index) => (
            <em
              key={plan}
              className={index === highlightIndex % comparingPlans.length ? 'is-on' : ''}
            >
              {plan}
            </em>
          ))}
        </div>
      </div>
    </section>
  )
}
