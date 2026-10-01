import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { IMG } from '../data/content'
import Split from '../components/Split'
export default function Story() {
  const r = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s-big .ch', { yPercent: 110, stagger: .02, ease: 'power4.out', duration: 1, scrollTrigger: { trigger: '.s-big', start: 'top 80%' } })
      gsap.fromTo('.s-sm .ch', { opacity: .12 }, { opacity: 1, stagger: .03, scrollTrigger: { trigger: '.s-sm', start: 'top 80%', end: 'bottom 45%', scrub: true } })
      gsap.fromTo('.s-big', { scale: 1.1, xPercent: -4 }, { scale: .9, xPercent: 4, ease: 'none', scrollTrigger: { trigger: '.s-top', start: 'top bottom', end: 'bottom top', scrub: true } })
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1px)', () => {
        const t = r.current.querySelector('.s-track'), d = () => t.scrollWidth - innerWidth
        gsap.to(t, { x: () => -d(), ease: 'none', scrollTrigger: { trigger: '.s-strip', start: 'top top', end: () => '+=' + d(), pin: true, scrub: 1, invalidateOnRefresh: true } })
        gsap.utils.toArray('.s-track figure img').forEach((im) => gsap.fromTo(im, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: im, containerAnimation: null, start: 'top bottom', end: 'bottom top', scrub: true } }))
      })
    }, r)
    return () => ctx.revert()
  }, [])
  const f = [[IMG.e, 'Corner table, 4PM'], [IMG.a, 'First pour'], [IMG.b, 'Green to dark'], [IMG.d, 'Foam, still moving'], [IMG.f, 'Last light']]
  return <section id="story" ref={r} className="story">
    <div className="s-top"><h2 className="s-big"><Split text="WE DON'T JUST" /><br /><Split text="SERVE COFFEE." /></h2>
      <p className="s-sm serif"><Split text="WE CREATE A PLACE" /><br /><Split text="YOU WANT TO STAY." /></p></div>
    <div className="s-strip"><div className="s-track">{f.map(([s, c], i) => <figure key={i} className={`k${i % 3}`} data-cursor="view"><div><img loading="lazy" src={s} alt={c} /></div><figcaption>{c}</figcaption></figure>)}</div></div>
  </section>
}
