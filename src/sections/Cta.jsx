import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Split from '../components/Split'
import Magnetic from '../components/Magnetic'
import { scrollTo } from '../animations/useLenis'
export default function Cta() {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(r.current, { backgroundColor: '#1a0f0a', color: '#efe4d2' }, { backgroundColor: '#efe4d2', color: '#1a0f0a', ease: 'none', scrollTrigger: { trigger: r.current, start: 'top 85%', end: 'top 10%', scrub: true } })
      gsap.from('.c-h .ch', { yPercent: 110, stagger: .02, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: r.current, start: 'top 40%' } })
    }, r)
    return () => ctx.revert()
  }, [])
  return <section id="cta" ref={r} className="cta">
    <h2 className="c-h"><Split text="YOUR NEXT" /><br /><Split text="COFFEE" /><br /><Split text="IS HERE." /></h2>
    <div className="c-btns"><Magnetic href="#visit" onClick={(e) => { e.preventDefault(); scrollTo('#visit') }}>VISIT US</Magnetic><Magnetic className="ghost" href="#menu" onClick={(e) => { e.preventDefault(); scrollTo('#menu') }}>VIEW MENU</Magnetic></div>
  </section>
}
