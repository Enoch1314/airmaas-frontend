/**
 * Photo backdrop for page headers.
 * tone: "soft" (default) | "side" (left-readable for home) | "cover" (report card)
 */
export default function PageHeroBackdrop({ src, tone = 'soft' }) {
  if (!src) return null
  return (
    <div className={`page-hero-bg page-hero-bg--${tone}`} aria-hidden="true">
      <img className="page-hero-bg__photo" src={src} alt="" draggable={false} />
      <div className="page-hero-bg__veil" />
    </div>
  )
}
