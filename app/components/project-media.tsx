"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ProjectMedia({ cover, video, title }: { cover: string; video?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) void element.play().catch(() => {})
      else element.pause()
    })
    const visibility = () => {
      if (document.hidden) element.pause()
      else if (element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < window.innerHeight) void element.play().catch(() => {})
    }
    observer.observe(element)
    document.addEventListener("visibilitychange", visibility)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); element.pause() }
  }, [video, reducedMotion, failed])
  if (video && !reducedMotion && !failed) {
    return <video ref={ref} src={video} poster={cover} autoPlay muted loop playsInline controls={false} preload="metadata" aria-label={`${title} project preview`} onError={() => setFailed(true)} />
  }
  return <Image src={cover} alt={`${title} website preview`} fill priority sizes="(max-width: 767px) 100vw, 46vw" />
}
