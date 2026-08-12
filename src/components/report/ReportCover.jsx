import PageHeroBackdrop from '../PageHeroBackdrop'
import { pageHeroPhoto } from '../../data/heroBgData'

export default function ReportCover({ cover }) {
  return (
    <section className={`wr-cover wr-cover--${cover.mood}`}>
      <PageHeroBackdrop src={pageHeroPhoto.reportCover} tone="cover" />
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
