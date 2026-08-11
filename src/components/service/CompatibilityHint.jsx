export default function CompatibilityHint({ hint }) {
  if (!hint) return null

  return (
    <div className={`ss-hint ss-hint--${hint.tone}`} role="status">
      {hint.text}
    </div>
  )
}
