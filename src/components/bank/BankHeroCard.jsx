export default function BankHeroCard({
  totalLabel,
  monthlyLabel,
  completedGuarantees,
  timeCoins,
}) {
  return (
    <section className="tb-hero-card">
      <span>累计回收生活时间</span>
      <strong>{totalLabel}</strong>
      <div className="tb-hero-card__grid">
        <div>
          <em>本月回收</em>
          <b>{monthlyLabel}</b>
        </div>
        <div>
          <em>累计完成保障</em>
          <b>{completedGuarantees} 次</b>
        </div>
        <div>
          <em>时间币</em>
          <b>{timeCoins}</b>
        </div>
      </div>
    </section>
  )
}
