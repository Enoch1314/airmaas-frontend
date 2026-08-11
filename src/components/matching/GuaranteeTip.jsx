import { getGuaranteeItems } from '../../data/guaranteeData'

export default function GuaranteeTip({ labels, planType = 'time' }) {
  if (!labels?.length) return null

  const items = getGuaranteeItems(planType).filter((item) =>
    labels.includes(item.title),
  )

  return (
    <section className="mt-guarantee">
      <h3>你已开启关键时间保障</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>✓ {item.target}</li>
        ))}
      </ul>
      <p>
        如果当前班次最终无法满足，AirMaaS 会优先推荐仍能满足这些要求的替代方案。
      </p>
    </section>
  )
}
