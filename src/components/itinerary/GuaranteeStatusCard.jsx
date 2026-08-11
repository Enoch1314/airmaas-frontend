export default function GuaranteeStatusCard({ guarantees, estimatedActivity }) {
  return (
    <section className="it-guarantee">
      <div className="it-guarantee__head">
        <h3>关键时间保障</h3>
        <em>正常</em>
      </div>
      {guarantees.length ? (
        <ul>
          {guarantees.map((item) => (
            <li key={item.id}>
              <strong>✓ {item.title}</strong>
              <span>{item.target}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="it-guarantee__empty">本次未添加关键时间保障</p>
      )}
      <p className="it-guarantee__est">
        当前预计：<strong>{estimatedActivity}</strong>活动时间
      </p>
    </section>
  )
}
