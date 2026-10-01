import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MENU } from '../data/content'
import { touch } from '../animations/useLenis'
export default function Menu() {
  const r = useRef(), f = useRef(), [act, setAct] = useState(null), t = touch()
  useEffect(() => {
    if (t) return
    const x = gsap.quickTo(f.current, 'x', { duration: .6, ease: 'power3' }), y = gsap.quickTo(f.current, 'y', { duration: .6, ease: 'power3' })
    const mv = (e) => { x(e.clientX); y(e.clientY) }
    window.addEventListener('mousemove', mv); return () => window.removeEventListener('mousemove', mv)
  }, [])
  useEffect(() => { gsap.to(f.current, { autoAlpha: act && !t ? 1 : 0, scale: act ? 1 : .6, duration: .4, ease: 'power3' }) }, [act])
  useEffect(() => {
    const ctx = gsap.context(() => gsap.utils.toArray('.m-row').forEach((e) => gsap.from(e, { clipPath: 'inset(0 0 100% 0)', y: 30, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: e, start: 'top 92%' } })), r.current)
    return () => ctx.revert()
  }, [])
  const all = Object.values(MENU).flat()
  return <section id="menu" ref={r} className="menu">
    <h2 className="m-head">THE MENU</h2>
    {Object.entries(MENU).map(([cat, items]) => <div key={cat} className="m-cat"><h3 className="serif">{cat}</h3>
      {items.map(([n, p, d, s]) => { const k = cat + n, o = act === k
        return <div key={k} className={`m-row ${o ? 'open' : ''}`} data-cursor="menu" role="button" tabIndex={0} aria-expanded={o}
          onMouseEnter={() => !t && setAct(k)} onMouseLeave={() => !t && setAct(null)} onClick={() => t && setAct(o ? null : k)} onKeyDown={(e) => e.key === 'Enter' && setAct(o ? null : k)}
          onFocus={() => setAct(k)} onBlur={() => setAct(null)}>
          <div className="m-line"><span className="m-n">{n}</span><i className="dots" /><span className="m-p">₹{p}</span></div>
          <div className="m-d"><p>{d}</p></div>{t && o && <img className="m-m" src={s} alt={n} />}</div> })}</div>)}
    <div ref={f} className="m-float" aria-hidden="true">{all.map(([n, , , s]) => { const on = act && act.endsWith(n); return <img key={n} src={s} alt="" style={{ opacity: on ? 1 : 0 }} /> })}</div>
  </section>
}
