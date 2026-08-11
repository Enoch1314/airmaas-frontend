export default function GuaranteeSummary({
  selectedItems,
  guaranteeFee,
  totalFee,
}) {
  return (
    <section className="tg-summary">
      <h3>本次已选择</h3>
      {selectedItems.length ? (
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.goalLabel}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tg-summary__empty">暂未添加关键时间保障</p>
      )}
      <div className="tg-summary__fees">
        <div>
          <span>预计保障费用</span>
          <strong>¥{guaranteeFee}</strong>
        </div>
        <div>
          <span>预计订单总额</span>
          <strong>¥{totalFee}</strong>
        </div>
      </div>
    </section>
  )
}
