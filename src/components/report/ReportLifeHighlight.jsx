export default function ReportLifeHighlight({ result, bank }) {
  return (
    <section className="wr-life">
      <p>今天真正留给生活</p>
      <strong>{result.actualLifeLabel}</strong>
      <div className="wr-life__row">
        <span>
          比纯地面方案多留 <b>{result.recoveredTime} 分钟</b>
        </span>
        <span>关键时间保障 {bank.guaranteeScore}</span>
        <span>{result.actualHomeTime} 到家</span>
      </div>
    </section>
  )
}
