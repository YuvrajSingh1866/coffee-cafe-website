import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { touch } from '../animations/useLenis'
export default function Magnetic({ children, href, onClick, className = '' }) {
  const r = useRef()
  useEffect(() => {
    const el = r.current; if (touch()) return
    const x = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3' })
    const mv = (e) => { const b = el.getBoundingClientRect(); x((e.clientX - b.left - b.width / 2) * .3); y((e.clientY - b.top - b.height / 2) * .3) }
    const lv = () => { x(0); y(0) }
    el.addEventListener('mousemove', mv); el.addEventListener('mouseleave', lv)
    return () => { el.removeEventListener('mousemove', mv); el.removeEventListener('mouseleave', lv) }
  }, [])
  return <a ref={r} href={href} onClick={onClick} className={`btn ${className}`} data-cursor="link"><span>{children}</span></a>
}
