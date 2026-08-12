import PageHeroBackdrop from './PageHeroBackdrop'
import { pageHeroPhoto } from '../data/heroBgData'

export default function HeroSection() {
  return (
    <section className="hero" aria-label="品牌主视觉">
      <PageHeroBackdrop src={pageHeroPhoto.home} tone="side" />
      <img
        className="hero-evtol"
        src="/images/welcome/evtol.png"
        alt=""
        draggable={false}
        aria-hidden="true"
      />
      <div className="hero-copy">
        <h1 className="hero-title">把周末还给生活</h1>
        <p className="hero-subtitle">
          去一个想去的地方，
          <br />
          或者告诉我们你想怎样度过。
        </p>
      </div>
    </section>
  )
}
