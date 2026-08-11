export default function PhotoStrip({ photos, skyNote, onAdd }) {
  return (
    <section className="wr-photos">
      <div className="wr-photos__head">
        <h3>今天的片段</h3>
        <button type="button" onClick={onAdd}>
          添加照片
        </button>
      </div>
      {skyNote ? <p className="wr-photos__note">{skyNote}</p> : null}
      <div className="wr-photos__strip">
        {photos.map((photo) => (
          <article key={photo.id} className={`wr-photo wr-photo--${photo.tone}`}>
            <span>{photo.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
