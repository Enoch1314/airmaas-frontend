export default function ReplicaBlock({ replica, open, onToggle, onPick, onInvite }) {
  return (
    <section className="wr-replica">
      <h3>想再来一次？</h3>
      <p>记忆航线不只是纪念，也可以成为下一次生活规划的起点。</p>
      <button type="button" className="wr-secondary" onClick={onToggle}>
        复刻这个周末
      </button>
      {open ? (
        <div className="wr-replica__panel">
          <strong>已根据本次体验生成可复刻模板</strong>
          <ul>
            <li>
              <span>时间</span>
              <em>{replica.time}</em>
            </li>
            <li>
              <span>同行</span>
              <em>{replica.companions}</em>
            </li>
            <li>
              <span>体验</span>
              <em>{replica.vibe}</em>
            </li>
            <li>
              <span>返程</span>
              <em>{replica.returnHome}</em>
            </li>
            <li>
              <span>活动内容</span>
              <em>{replica.activity}</em>
            </li>
          </ul>
          <div className="wr-replica__actions">
            <button type="button" onClick={() => onPick('exact')}>
              完全复刻
            </button>
            <button type="button" onClick={() => onPick('similar')}>
              换一个类似活动
            </button>
            <button type="button" onClick={() => onPick('otherDay')}>
              换一天
            </button>
          </div>
        </div>
      ) : null}
      <button type="button" className="wr-text" onClick={onInvite}>
        邀请好友一起复刻
      </button>
    </section>
  )
}
