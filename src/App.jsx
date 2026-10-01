import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLenis from './animations/useLenis'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Story from './sections/Story'
import Process from './sections/Process'
import Menu from './sections/Menu'
import Brew from './sections/Brew'
import Gallery from './sections/Gallery'
import Location from './sections/Location'
import Cta from './sections/Cta'
import Footer from './sections/Footer'
export default function App() {
  const [ready, setReady] = useState(false)
  useLenis(ready)
  useEffect(() => { const f = () => ScrollTrigger.refresh(); window.addEventListener('load', f); return () => window.removeEventListener('load', f) }, [])
  return <>
    <Cursor /><div className="grain" /><Preloader onDone={() => setReady(true)} /><Navbar ready={ready} />
    <main id="top"><Hero ready={ready} /><Story /><Process /><Menu /><Brew /><Gallery /><Location /><Cta /></main><Footer />
  </>
}
