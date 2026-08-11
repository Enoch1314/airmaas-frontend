export default function OrderChecks({ confirmed, rulesRead, onToggleConfirmed, onToggleRules }) {
  return (
    <section className="oc-checks">
      <label>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => onToggleConfirmed(e.target.checked)}
        />
        <span>我已确认本次完整周末安排</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={rulesRead}
          onChange={(e) => onToggleRules(e.target.checked)}
        />
        <span>我已阅读行程调整与退款规则</span>
      </label>
    </section>
  )
}
