import { useEffect, useState } from 'react'

export default function InstallHint() {
  const [deferred, setDeferred] = useState(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true

    if (standalone) {
      setHidden(true)
      return undefined
    }

    const onPrompt = (event) => {
      event.preventDefault()
      setDeferred(event)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (hidden) return null

  const handleInstall = async () => {
    if (!deferred) return
    deferred.prompt()
    try {
      await deferred.userChoice
    } catch {
      // ignore
    }
    setDeferred(null)
  }

  return (
    <section className="pf-install" aria-label="安装到手机">
      {deferred ? (
        <button type="button" className="pf-install__btn" onClick={handleInstall}>
          安装 AirMaaS 到手机
        </button>
      ) : (
        <p className="pf-install__text">
          安装 AirMaaS 到手机：可通过浏览器菜单选择「添加到主屏幕」
        </p>
      )}
    </section>
  )
}
