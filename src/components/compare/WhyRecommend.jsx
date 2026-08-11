export default function WhyRecommend({ recommendation }) {
  const name = recommendation?.recommendName || '体验优先'
  const reason =
    recommendation?.whyRecommend ||
    '该方案更符合你当前的时间与体验安排。'

  return (
    <section className="cp-why">
      <h3>为什么推荐{name}？</h3>
      <p>{reason}</p>
    </section>
  )
}
