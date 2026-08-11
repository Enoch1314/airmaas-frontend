const LABELS = {
  optimize: '允许使用历史偏好优化推荐',
  saveMemory: '允许保存周末记忆',
  personalize: '允许生成个性化活动推荐',
  desensitize: '公开分享默认脱敏',
}

export default function AuthSwitches({ auth, onToggle }) {
  return (
    <section className="pf-auth">
      <h3>数据授权</h3>
      <ul>
        {Object.keys(LABELS).map((key) => (
          <li key={key}>
            <span>{LABELS[key]}</span>
            <button
              type="button"
              className={`pf-switch${auth[key] ? ' is-on' : ''}`}
              aria-pressed={auth[key]}
              onClick={() => onToggle(key)}
            >
              {auth[key] ? 'ON' : 'OFF'}
            </button>
          </li>
        ))}
      </ul>
      <p>用户可以随时关闭授权或删除历史记录。</p>
    </section>
  )
}
