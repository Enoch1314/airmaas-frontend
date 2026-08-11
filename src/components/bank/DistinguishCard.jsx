export default function DistinguishCard({ distinguish }) {
  return (
    <section className="tb-distinguish">
      <h3>先分清两件事</h3>
      <div>
        <strong>生活时间</strong>
        <p>{distinguish.life}</p>
      </div>
      <div>
        <strong>时间币</strong>
        <p>{distinguish.coin}</p>
      </div>
      <em>{distinguish.note}</em>
    </section>
  )
}
