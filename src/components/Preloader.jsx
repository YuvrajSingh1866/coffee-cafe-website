import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Split from './Split'
import { reduced } from '../animations/useLenis'
export default function Preloader({ onDone }) {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced()) { onDone(); gsap.set(r.current, { display: 'none' }); return }
      const n = { v: 0 }
      const tl = gsap.timeline({ onComplete: () => gsap.set(r.current, { display: 'none' }) })
      tl.from('.pl-1 .ch', { yPercent: 110, stagger: .06, duration: .8, ease: 'power4.out' })
        .to(n, { v: 100, duration: 2.8, ease: 'power2.inOut', onUpdate: () => { const e = r.current?.querySelector('.pl-num'); if (e) e.textContent = String(Math.round(n.v)).padStart(3, '0') } }, 0)
        .to('.pl-bar i', { scaleX: 1, duration: 2.8, ease: 'power2.inOut' }, 0)
        .to('.pl-1 .ch', { yPercent: -110, stagger: .03, duration: .5, ease: 'power3.in' }, 1.2)
        .from('.pl-2 .ch', { yPercent: 110, stagger: .04, duration: .7, ease: 'power4.out' }, 1.7)
        .to('.pl-2 .ch', { yPercent: -110, stagger: .02, duration: .5, ease: 'power3.in' }, 3)
        .to('.pl-ui', { opacity: 0, duration: .3 }, 3)
        .to(r.current, { backgroundColor: 'transparent', duration: .01 })
        .fromTo('.pl-hole', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', duration: 1.2, ease: 'power3.inOut', onStart: onDone })
    }, r)
    return () => ctx.revert()
  }, [])
  return <div ref={r} className="preloader">
    <div className="pl-ui"><h2 className="pl-1"><Split text="BREWING" /></h2><h2 className="pl-2"><Split text="THE EXPERIENCE" /></h2>
      <div className="pl-bar"><i /></div><span className="pl-num">000</span></div>
    <div className="pl-hole" />
  </div>
}
