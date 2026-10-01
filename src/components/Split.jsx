export default function Split({ text, className = '' }) {
  return <span className={`split ${className}`} aria-label={text}>{text.split(' ').map((w, i) => <span className="w" key={i} aria-hidden="true">{[...w].map((c, j) => <span className="m" key={j}><span className="ch">{c}</span></span>)}&nbsp;</span>)}</span>
}
