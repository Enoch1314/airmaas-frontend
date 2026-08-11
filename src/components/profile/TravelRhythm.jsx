import { interactionOptions } from '../../data/profileData'

export default function TravelRhythm({
  pace,
  interaction,
  lowAir,
  services,
  onInteraction,
}) {
  return (
    <section className="pf-rhythm">
      <h3>我喜欢怎样出行</h3>

      <div className="pf-block">
        <span>节奏偏好</span>
        <div className="pf-chip-grid">
          {pace.map((item) => (
            <em key={item} className="is-on">
              ✓ {item}
            </em>
          ))}
        </div>
      </div>

      <div className="pf-block">
        <span>互动偏好</span>
        <div className="pf-radio">
          {interactionOptions.map((item) => (
            <label key={item.id}>
              <input
                type="radio"
                name="pf-interaction"
                checked={interaction === item.id}
                onChange={() => onInteraction(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pf-block">
        <span>低空偏好</span>
        <p>
          快捷航线：{lowAir.express}
          <br />
          天空散步航线：{lowAir.skywalk}
        </p>
      </div>

      <div className="pf-block">
        <span>共享服务偏好</span>
        <ul>
          {services.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <em>{item.note}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
