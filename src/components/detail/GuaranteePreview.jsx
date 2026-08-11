import { useNavigate } from 'react-router-dom'
import { getGuaranteePreview } from '../../data/planDetailData'

export default function GuaranteePreview({ planType = 'time' }) {
  const navigate = useNavigate()
  const items = getGuaranteePreview(planType)

  return (
    <section className="pd-guarantee">
      <h3>你可以在下一步添加关键时间保障</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button
        type="button"
        className="pd-link-btn"
        onClick={() => navigate(`/time-guarantee?type=${planType}`)}
      >
        设置关键时间保障
      </button>
    </section>
  )
}
