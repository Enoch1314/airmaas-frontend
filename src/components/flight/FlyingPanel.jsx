export default function FlyingPanel({ ctx, guideOn }) {
  const cabin = ctx.cabin

  return (
    <section className="fe-flying">
      <div className="fe-flying__count">
        <span>距离目的地还有</span>
        <strong>
          {ctx.remainMinutes}
          <em>分钟</em>
        </strong>
      </div>
      <p className="fe-flying__route">当前航线：{ctx.routeTitle}</p>

      {cabin.type === 'sameInterest' ? (
        <div className="fe-flying__block">
          <div>
            <span>当前景观节点</span>
            <strong>{cabin.landscape}</strong>
          </div>
          <div>
            <span>数字导览</span>
            <strong>{guideOn ? '正在播放' : '已关闭'}</strong>
          </div>
          <div>
            <span>共享歌单</span>
            <strong>{cabin.playlist}</strong>
          </div>
          <div className="is-wide">
            <span>活动期待 · {cabin.poll.question}</span>
            <ul>
              {cabin.poll.options.map((opt) => (
                <li key={opt.label}>
                  <em>{opt.label}</em>
                  <b>{opt.percent}%</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {cabin.type === 'rush' ? (
        <div className="fe-flying__block">
          <div>
            <span>预计落地</span>
            <strong>{cabin.landAt}</strong>
          </div>
          <div>
            <span>当前准时状态</span>
            <strong className="is-ok">正常</strong>
          </div>
        </div>
      ) : null}

      {cabin.type === 'companion' ? (
        <div className="fe-flying__block">
          <div>
            <span>安静模式</span>
            <strong>已开启</strong>
          </div>
          <div>
            <span>目的地接驳</span>
            <strong>已准备</strong>
          </div>
        </div>
      ) : null}
    </section>
  )
}
