import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BREW } from '../data/content'
const G = [['roast', 'ROAST'], ['style', 'STYLE'], ['mood', 'MOOD']]
export default function Brew() {
  const r = useRef(), [c, setC] = useState({ roast: 'Medium', style: 'Smooth', mood: 'Slow Morning' }), first = useRef(true)
  const [name, why] = BREW.pick(c.roast, c.style, c.mood)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    gsap.fromTo('.b-name', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8, ease: 'power4.out' })
    gsap.fromTo('.b-why', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8, delay: .15 })
  }, [name])
  return <section ref={r} className="brew">
    <h2>CHOOSE YOUR BREW</h2>
    <div className="b-grid"><div>{G.map(([k, l]) => <fieldset key={k}><legend>{l}</legend><div>{BREW[k].map((o) => <button key={o} className={c[k] === o ? 'on' : ''} aria-pressed={c[k] === o} data-cursor="link" onClick={() => setC({ ...c, [k]: o })}>{o}</button>)}</div></fieldset>)}</div>
      <div className="b-res" aria-live="polite"><small>YOUR PERFECT CUP</small><div className="b-mask"><h3 className="b-name serif">{name}</h3></div><p className="b-why">{why}</p></div></div>
  </section>
}
