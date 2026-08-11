export default function RecommendCombo({ onApply }) {
  return (
    <section className="tg-recommend">
      <h3>AirMaaS 推荐</h3>
      <p>
        根据你只有 6 小时周末时间，并希望 21:00 前回家，建议开启：
      </p>
      <ul>
        <li>✓ 活动时长保障</li>
        <li>✓ 返程保障</li>
      </ul>
      <p className="tg-recommend__note">到达保障可根据预约情况选择。</p>
      <button type="button" className="tg-recommend__btn" onClick={onApply}>
        一键采用推荐
      </button>
    </section>
  )
}
