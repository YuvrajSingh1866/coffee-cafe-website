import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { STEPS } from '../data/content'
export default function Process() {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = gsap.utils.toArray('.p-stage'), im = gsap.utils.toArray('.p-img')
      gsap.set(st.slice(1), { opacity: 0, yPercent: 20 }); gsap.set(im.slice(1), { clipPath: 'inset(100% 0 0 0)' })
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut', duration: 1 }, scrollTrigger: { trigger: r.current, start: 'top top', end: '+=450%', pin: true, scrub: 1 } })
      tl.to('.p-bar i', { scaleY: 1, duration: STEPS.length - 1, ease: 'none' }, 0)
      for (let i = 1; i < STEPS.length; i++) tl.to(st[i - 1], { opacity: 0, yPercent: -20 }, i - .5).to(st[i], { opacity: 1, yPercent: 0 }, i - .4).to(im[i], { clipPath: 'inset(0% 0 0 0)' }, i - .5).to(im[i - 1].firstChild, { scale: 1.2 }, i - .5)
    }, r)
    return () => ctx.revert()
  }, [])
  return <section id="experience" ref={r} className="proc">
    <div className="p-imgs">{STEPS.map(([n, , s]) => <div key={n} className="p-img"><img loading="lazy" src={s} alt={n} /></div>)}</div>
    <div className="p-bar"><i /></div>
    {STEPS.map(([n, d], i) => <div key={n} className="p-stage"><span className="p-no">0{i + 1}</span><h2>{n}</h2><p>{d}</p></div>)}
  </section>
}
