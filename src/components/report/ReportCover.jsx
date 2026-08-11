export default function ReportCover({ cover }) {
  return (
    <section className={`wr-cover wr-cover--${cover.mood}`}>
      <div className="wr-cover__art" aria-hidden="true">
        <span className="wr-cover__skyline" />
        <span className="wr-cover__drop wr-cover__drop--1" />
        <span className="wr-cover__drop wr-cover__drop--2" />
        <span className="wr-cover__drop wr-cover__drop--3" />
        <span className="wr-cover__building" />
        <span className="wr-cover__cafe" />
      </div>
      <div className="wr-cover__copy">
        <h2>{cover.title}</h2>
        <p>
          {cover.dateLabel}
          <i>·</i>
          {cover.companions}
        </p>
      </div>
    </section>
  )
}
