export default function ReportEntryCard({ onGenerate }) {
  return (
    <section className="tr-report">
      <h3>把这次周末保存下来</h3>
      <p>
        路线、活动、生活时间、景观、照片与一句话记录，都可以整理成「记忆航线」。
      </p>
      <ul>
        <li>路线</li>
        <li>活动</li>
        <li>生活时间</li>
        <li>景观</li>
        <li>照片</li>
        <li>一句话记录</li>
      </ul>
      <button type="button" className="tr-primary" onClick={onGenerate}>
        生成我的周末报告
      </button>
    </section>
  )
}
