export default function AiExplain() {
  return (
    <section className="pf-ai">
      <h3>AI使用说明</h3>
      <p>AirMaaS 助手可以帮助：</p>
      <ul className="is-help">
        <li>理解周末需求</li>
        <li>比较不同方案</li>
        <li>调整返程</li>
        <li>解释行程变化</li>
      </ul>
      <p>但：</p>
      <ul className="is-limit">
        <li>不会替用户自动确认支付</li>
        <li>不会替用户接受社交匹配</li>
        <li>不会绕过航空安全和运行规则</li>
      </ul>
    </section>
  )
}
