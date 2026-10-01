import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CAFE } from '../data/content'
import Split from '../components/Split'
import Magnetic from '../components/Magnetic'
export default function Location() {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.l-h .ch', { yPercent: 110, stagger: .03, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.l-h', start: 'top 80%' } })
      gsap.from('.l-map path', { strokeDashoffset: 600, duration: 2.4, ease: 'power2.out', scrollTrigger: { trigger: '.l-map', start: 'top 80%' } })
      gsap.from('.l-info > *', { opacity: 0, y: 24, stagger: .12, duration: 1, scrollTrigger: { trigger: '.l-info', start: 'top 85%' } })
    }, r)
    return () => ctx.revert()
  }, [])
  const L = []; for (let i = 0; i <= 12; i++) L.push(<path key={'v' + i} d={`M${i * 50} 0V600`} />, <path key={'h' + i} d={`M0 ${i * 50}H600`} />)
  return <section id="visit" ref={r} className="loc">
    <div className="l-info"><h2 className="l-h"><Split text="FIND YOUR" /><br /><Split text="TABLE." /></h2><p className="serif">{CAFE.address}</p>
      <dl>{CAFE.hours.map(([d, h]) => <div key={d}><dt>{d}</dt><dd>{h}</dd></div>)}</dl><Magnetic href={CAFE.maps}>GET DIRECTIONS →</Magnetic></div>
    <svg className="l-map" viewBox="0 0 600 600" aria-hidden="true"><g className="grid">{L}</g>
      <path className="road" strokeDasharray="600" d="M0 420C120 400 180 300 300 300S480 180 600 160" /><path className="road" strokeDasharray="600" d="M180 600C200 480 280 400 300 300S340 100 380 0" />
      <circle className="pulse" cx="300" cy="300" r="10" /><circle className="pulse p2" cx="300" cy="300" r="10" /><circle className="pin" cx="300" cy="300" r="9" /></svg>
  </section>
}
