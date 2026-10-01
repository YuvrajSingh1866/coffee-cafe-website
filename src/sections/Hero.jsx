import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { IMG } from '../data/content'
import Split from '../components/Split'
import { reduced, touch } from '../animations/useLenis'
export default function Hero({ ready }) {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.h-cup', { clipPath: 'inset(100% 0 0 0)' }); gsap.set('.h-line .ch', { yPercent: 115 }); gsap.set('.h-fl,.h-badge,.h-scroll', { opacity: 0 })
      if (!reduced()) {
        gsap.to('.h-bg img', { scale: 1.25, duration: 20, ease: 'none' })
        gsap.to('.h-bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('.h-cup', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: r.current, start: 'top top', end: 'bottom top', scrub: true } })
        if (!touch()) {
          const tx = gsap.quickTo('.h-title', 'x', { duration: 1, ease: 'power3' }), ty = gsap.quickTo('.h-title', 'y', { duration: 1, ease: 'power3' })
          const cx = gsap.quickTo('.h-cupwrap', 'x', { duration: 1.4, ease: 'power3' }), fx = gsap.quickTo('.h-fl', 'x', { duration: 1.8, ease: 'power3' })
          r.current.onmousemove = (e) => { const a = e.clientX / innerWidth - .5, b = e.clientY / innerHeight - .5; tx(a * -30); ty(b * -20); cx(a * 50); fx(a * 90) }
        }
      }
    }, r)
    return () => ctx.revert()
  }, [])
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .3, defaults: { ease: 'power4.out' } })
      tl.fromTo('.h-bg', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0)
        .to('.h-line .ch', { yPercent: 0, stagger: .025, duration: 1.2 }, .2)
        .to('.h-cup', { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power4.inOut' }, .3)
        .to('.h-fl,.h-badge,.h-scroll', { opacity: 1, duration: 1, stagger: .15 }, 1.1)
    }, r)
    return () => ctx.revert()
  }, [ready])
  return <section ref={r} className="hero">
    <div className="h-bg"><img src={IMG.hero} alt="" fetchpriority="high" /></div><div className="h-shade" />
    <div className="h-cupwrap" data-cursor="view"><div className="h-cup"><img src={IMG.cup} alt="A cup of coffee on a dark table" /></div></div>
    <h1 className="h-title">{['COFFEE.', 'BUT', 'MAKE IT AN', 'EXPERIENCE.'].map((t, i) => <span key={i} className={`h-line l${i}`}><Split text={t} /></span>)}</h1>
    <span className="h-fl f1">Roasted this morning</span><span className="h-fl f2">Open until 10PM</span><span className="h-fl f3">Single origin, small batch</span>
    <svg className="h-badge" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="c" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <text><textPath href="#c">ROASTED WITH INTENTION • SERVED WITH SOUL • </textPath></text><circle cx="100" cy="100" r="6" /></svg>
    <div className="h-scroll"><span>SCROLL TO EXPLORE ↓</span><i /></div>
  </section>
}
