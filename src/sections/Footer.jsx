import { CAFE } from '../data/content'
export default function Footer() {
  return <footer className="foot"><div className="f-row"><span className="logo">{CAFE.name}</span>
    <nav><a href={CAFE.insta} target="_blank" rel="noreferrer" data-cursor="link">Instagram</a><a href={CAFE.maps} target="_blank" rel="noreferrer" data-cursor="link">Google Maps</a><a href={CAFE.email} data-cursor="link">Contact</a></nav>
    <span className="serif">Brewed daily.</span></div><div className="f-big" aria-hidden="true">BREWED DAILY.</div></footer>
}
