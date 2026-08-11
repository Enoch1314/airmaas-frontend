export default function OrderFeeCard({ lines, total, timeCoinEnabled, discount }) {
  return (
    <section className="oc-fee">
      <h3>费用明细</h3>
      <ul>
        {lines.map((line) => (
          <li key={line.label}>
            <span>{line.label}</span>
            <strong>{line.value}</strong>
          </li>
        ))}
        {timeCoinEnabled ? (
          <li className="is-discount">
            <span>时间币抵扣</span>
            <strong>-¥{discount}</strong>
          </li>
        ) : null}
      </ul>
      <div className="oc-fee__total">
        <span>总计</span>
        <strong>¥{total}</strong>
      </div>
    </section>
  )
}
