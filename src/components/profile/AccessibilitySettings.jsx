import { accessibilityOptions } from '../../data/profileData'

export default function AccessibilitySettings({ selected, onToggle }) {
  return (
    <section className="pf-a11y">
      <h3>陪伴与无障碍</h3>
      <div className="pf-check">
        {accessibilityOptions.map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => onToggle(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <p>这些设置只用于帮助平台推荐更合适的出行和接驳方式。</p>
    </section>
  )
}
