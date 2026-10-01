import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMG } from '../data/content'
import { reduced } from '../animations/useLenis'
const P = [['a', IMG.e, 'g1', -18, 0, -3], ['b', IMG.a, 'g2', -45, 0, 4], ['c', IMG.d, 'g3', -10, 0, -2], ['d', IMG.c, 'g4', -60, 0, 3], ['e', IMG.b, 'g5', 0, -14, -4]]
export default function Gallery() {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      P.forEach(([, , c, y, x, rot]) => { const el = `.${c}`
        gsap.fromTo(el + ' img', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', rotate: 0 }, { clipPath: 'inset(0 0 0% 0)', rotate: rot, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
        gsap.to(el, { yPercent: y, xPercent: x, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top bottom', end: 'bottom top', scrub: 1 } }) })
      gsap.fromTo('.g-t1', { xPercent: 12 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.g-t1', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.g-t2', { xPercent: -12 }, { xPercent: 12, ease: 'none', scrollTrigger: { trigger: '.g-t2', start: 'top bottom', end: 'bottom top', scrub: true } })
      if (!reduced()) { const sk = gsap.quickTo('.g-sk', 'skewY', { duration: .5, ease: 'power3' })
        ScrollTrigger.create({ trigger: r.current, start: 'top bottom', end: 'bottom top', onUpdate: (s) => sk(gsap.utils.clamp(-5, 5, s.getVelocity() / -400)), onLeave: () => sk(0), onLeaveBack: () => sk(0) }) }
    }, r)
    return () => ctx.revert()
  }, [])
  return <section ref={r} className="gal">
    <div className="g-sk">{P.map(([k, s, c]) => <figure key={k} className={`g ${c}`} data-cursor="view"><img loading="lazy" src={s} alt="Inside the café" /></figure>)}
      <h2 className="g-t g-t1">STAY</h2><h2 className="g-t g-t2 serif">A LITTLE</h2><h2 className="g-t g-t3">LONGER.</h2></div>
  </section>
}
