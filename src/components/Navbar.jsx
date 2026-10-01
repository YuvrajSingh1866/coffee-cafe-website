import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CAFE, NAV } from '../data/content'
import { scrollTo } from '../animations/useLenis'
const C0 = 'circle(0% at calc(100% - 44px) 44px)'
export default function Navbar({ ready }) {
  const nav = useRef(), menu = useRef(), first = useRef(true), [open, setOpen] = useState(false)
  useEffect(() => {
    const a = ScrollTrigger.create({ start: 60, end: 'max', onToggle: (s) => nav.current.classList.toggle('solid', s.isActive) })
    const b = ScrollTrigger.create({ trigger: '#cta', start: 'top 60px', end: 'bottom 60px', onToggle: (s) => nav.current.classList.toggle('inv', s.isActive) })
    return () => { a.kill(); b.kill() }
  }, [])
  useEffect(() => { if (ready) gsap.to(nav.current, { yPercent: 0, duration: 1, ease: 'power3.out', delay: .6 }) }, [ready])
  useEffect(() => {
    if (first.current) { first.current = false; return }
    gsap.to(menu.current, { clipPath: open ? 'circle(150% at calc(100% - 44px) 44px)' : C0, duration: .9, ease: 'power3.inOut' })
    if (open) gsap.fromTo('.m-link', { yPercent: 110 }, { yPercent: 0, stagger: .08, duration: .8, delay: .35, ease: 'power4.out' })
    window.__lenis?.[open ? 'stop' : 'start']?.()
  }, [open])
  const go = (h) => (e) => { e.preventDefault(); const was = open; setOpen(false); setTimeout(() => scrollTo(h), was ? 600 : 0) }
  return <>
    <header ref={nav} className="nav" style={{ transform: 'translateY(-120%)' }}>
      <a href="#top" className="logo" data-cursor="link" onClick={go('#top')}>{CAFE.name}</a>
      <nav className="nav-links">{NAV.map(([l, h]) => <a key={l} href={h} data-cursor="link" onClick={go(h)}>{l}</a>)}</nav>
      <button className={`burger ${open ? 'x' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-cursor="link"><i /><i /></button>
    </header>
    <div ref={menu} className="fs-menu" style={{ clipPath: C0 }} aria-hidden={!open}>
      {NAV.map(([l, h]) => <div className="m-mask" key={l}><a className="m-link" href={h} tabIndex={open ? 0 : -1} onClick={go(h)}>{l}</a></div>)}
      <p>{CAFE.address}</p>
    </div>
  </>
}
