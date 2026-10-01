import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const touch = () => window.matchMedia('(hover: none)').matches
export default function useLenis(on) {
  useEffect(() => {
    if (reduced()) return
    const l = new Lenis({ lerp: 0.09 }); window.__lenis = l
    l.on('scroll', ScrollTrigger.update)
    const t = (time) => l.raf(time * 1000)
    gsap.ticker.add(t); gsap.ticker.lagSmoothing(0)
    if (!on) l.stop()
    return () => { gsap.ticker.remove(t); l.destroy(); window.__lenis = null }
  }, [on])
}
export const scrollTo = (hash) => { const el = document.querySelector(hash); if (!el) return; window.__lenis ? window.__lenis.scrollTo(el) : el.scrollIntoView() }
