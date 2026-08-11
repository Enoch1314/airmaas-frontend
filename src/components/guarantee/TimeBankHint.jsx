export default function TimeBankHint({ onLearn }) {
  return (
    <section className="tg-bank">
      <h3>这些保障结果会记录到「周末时间银行」</h3>
      <ul>
        <li>本次节省的生活时间</li>
        <li>保障完成情况</li>
        <li>获得或使用的时间币</li>
      </ul>
      <button type="button" className="tg-bank__btn" onClick={onLearn}>
        了解周末时间银行 {'>'}
      </button>
    </section>
  )
}
