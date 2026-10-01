import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { touch } from '../animations/useLenis'
export default function Cursor() {
  const r = useRef(), [label, setLabel] = useState('')
  const off = touch()
  useEffect(() => {
    if (off) return
    const el = r.current
    const x = gsap.quickTo(el, 'x', { duration: .35, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: .35, ease: 'power3' })
    const mv = (e) => { x(e.clientX); y(e.clientY) }
    const over = (e) => {
      const k = e.target.closest?.('[data-cursor]')?.dataset.cursor
      gsap.to(el, { scale: k === 'view' ? 4.5 : k === 'menu' ? 6 : k === 'link' ? 2.6 : 1, duration: .4, ease: 'power3' })
      el.classList.toggle('on', !!k); setLabel(k === 'view' ? 'VIEW' : '')
    }
    window.addEventListener('mousemove', mv); window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseover', over) }
  }, [])
  return off ? null : <div ref={r} className="cursor"><i>{label}</i></div>
}
