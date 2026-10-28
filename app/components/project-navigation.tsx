"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import { createPortal } from "react-dom"
import styles from "./project-navigation.module.css"

type Cover = { src: string; rect: DOMRect; radius: string; background: string; name: string }
type Pending = { cover: Cover | null; path: string; timer: number }
const Navigation = createContext<(href: string, link: HTMLAnchorElement) => void>(() => {})

export function ProjectNavigation({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const pending = useRef<Pending | null>(null)
  const cleanup = useRef<(() => void) | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => () => {
    if (pending.current) window.clearTimeout(pending.current.timer)
    cleanup.current?.()
  }, [])

  useLayoutEffect(() => {
    const request = pending.current
    if (!request || pathname !== request.path) return
    pending.current = null
    window.clearTimeout(request.timer)
    const source = request.cover
    const target = source && document.querySelector<HTMLElement>(`[data-project-media="${source.name}"]`)
    if (!source || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoading(false)
      return
    }

    // Animate only the cover, after the route commits. Never freeze the page while fetching.
    const overlay = document.createElement("div")
    overlay.className = styles.morph
    overlay.setAttribute("aria-hidden", "true")
    Object.assign(overlay.style, {
      left: `${source.rect.left}px`, top: `${source.rect.top}px`,
      width: `${source.rect.width}px`, height: `${source.rect.height}px`,
      borderRadius: source.radius, background: source.background,
    })
    const image = document.createElement("img")
    image.src = source.src
    image.alt = ""
    overlay.append(image)
    document.body.append(overlay)
    const previousVisibility = target.style.visibility
    target.style.visibility = "hidden"
    let cancelled = false
    function finish() {
      cancelled = true
      overlay.remove()
      target!.style.visibility = previousVisibility
      setLoading(false)
    }
    cleanup.current = finish
    const frame = requestAnimationFrame(() => {
      if (cancelled) return
      const destination = target.getBoundingClientRect()
      const animation = overlay.animate([
        { left: `${source.rect.left}px`, top: `${source.rect.top}px`, width: `${source.rect.width}px`, height: `${source.rect.height}px`, borderRadius: source.radius },
        { left: `${destination.left}px`, top: `${destination.top}px`, width: `${destination.width}px`, height: `${destination.height}px`, borderRadius: getComputedStyle(target).borderRadius },
      ], { duration: 420, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "forwards" })
      const targetImage = target.querySelector("img")
      const decoded = targetImage?.decode().catch(() => {}) ?? Promise.resolve()
      let decodeTimer: number
      const decodeLimit = new Promise<void>(resolve => { decodeTimer = window.setTimeout(resolve, 650) })
      void Promise.all([animation.finished.catch(() => {}), Promise.race([decoded, decodeLimit])]).then(() => {
        window.clearTimeout(decodeTimer)
        if (!cancelled) finish()
      })
    })
    return () => {
      cancelAnimationFrame(frame)
      finish()
      cleanup.current = null
    }
  }, [pathname])

  function navigate(href: string, link: HTMLAnchorElement) {
    const path = new URL(href, window.location.href).pathname
    if (path === pathname) { router.push(href); return }
    cleanup.current?.()
    if (pending.current) window.clearTimeout(pending.current.timer)
    const media = link.parentElement?.querySelector<HTMLElement>("[data-project-media]")
    const image = media?.querySelector("img")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const cover = media && image?.complete && image.naturalWidth && !reduced ? {
      src: image.currentSrc || image.src, rect: media.getBoundingClientRect(),
      radius: getComputedStyle(media).borderRadius, background: getComputedStyle(media).backgroundColor,
      name: media.dataset.projectMedia!,
    } : null
    setLoading(true)
    pending.current = { cover, path, timer: window.setTimeout(() => { pending.current = null; setLoading(false) }, 15000) }
    router.push(href)
  }

  return <Navigation.Provider value={navigate}>
    {children}
    {loading && createPortal(<div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.progress} aria-hidden="true" />
      <span className={styles.label}><span className={styles.spinner} aria-hidden="true" /> Opening project…</span>
    </div>, document.body)}
  </Navigation.Provider>
}

export function ProjectLink({ href, onClick, onMouseEnter, onFocus, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const navigate = useContext(Navigation)
  const router = useRouter()
  return <Link {...props} href={href}
    onMouseEnter={event => { onMouseEnter?.(event); router.prefetch(href) }}
    onFocus={event => { onFocus?.(event); router.prefetch(href) }}
    onClick={event => {
      onClick?.(event)
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank") return
      event.preventDefault()
      navigate(href, event.currentTarget)
    }} />
}
