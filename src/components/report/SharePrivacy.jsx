import { visibilityOptions } from '../../data/weekendReportData'

export default function SharePrivacy({
  visibility,
  privacy,
  onVisibility,
  onTogglePrivacy,
}) {
  return (
    <section className="wr-share">
      <h3>分享这次周末</h3>
      <div className="wr-share__vis">
        {visibilityOptions.map((item) => (
          <label key={item.id}>
            <input
              type="radio"
              name="wr-visibility"
              checked={visibility === item.id}
              onChange={() => onVisibility(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <div className="wr-share__privacy">
        <label>
          <input
            type="checkbox"
            checked={privacy.hideOrigin}
            onChange={() => onTogglePrivacy('hideOrigin')}
          />
          <span>隐藏具体出发地点</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={privacy.hideTrack}
            onChange={() => onTogglePrivacy('hideTrack')}
          />
          <span>隐藏精确移动轨迹</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={privacy.hideCompanions}
            onChange={() => onTogglePrivacy('hideCompanions')}
          />
          <span>隐藏同行者身份</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={privacy.hideFee}
            onChange={() => onTogglePrivacy('hideFee')}
          />
          <span>隐藏订单费用</span>
        </label>
      </div>
      <p>
        公开分享的是脱敏后的生活路线和体验内容，不会公开住址、完整轨迹或同行者真实身份。
      </p>
    </section>
  )
}
