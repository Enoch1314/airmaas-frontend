export default function SecondaryActions({
  onAssistant,
  onReturn,
  onGuarantee,
  onReport,
  onDemoWeather,
  onCompleteTrip,
  showCompleteDemo = false,
  showTripChangeDemo = true,
}) {
  return (
    <section className="it-secondary">
      <button type="button" onClick={onAssistant}>
        联系智能助手
      </button>
      <button type="button" onClick={onReturn}>
        调整返程
      </button>
      <button type="button" onClick={onGuarantee}>
        查看保障
      </button>
      <button type="button" onClick={onReport}>
        报告问题
      </button>
      {showTripChangeDemo ? (
        <button type="button" className="is-demo" onClick={onDemoWeather}>
          模拟行程变化
        </button>
      ) : null}
      {showCompleteDemo ? (
        <button type="button" className="is-demo" onClick={onCompleteTrip}>
          模拟到家并完成行程
        </button>
      ) : null}
    </section>
  )
}
