export default function OrderCompanions({ onAdd }) {
  return (
    <section className="oc-people">
      <div className="oc-people__head">
        <h3>同行人</h3>
        <button type="button" onClick={onAdd}>
          添加同行人
        </button>
      </div>
      <ul>
        <li>
          <strong>你</strong>
          <span>主出行人</span>
        </li>
        <li>
          <strong>朋友</strong>
          <span>1人</span>
        </li>
      </ul>
    </section>
  )
}
