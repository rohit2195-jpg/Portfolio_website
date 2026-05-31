import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const GLYPHS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·:";

// Number of intermediate glyphs a cell flips through before landing on target.
export function flipSequence(target, steps = 6) {
  const end = GLYPHS.indexOf(target.toUpperCase());
  const safeEnd = end < 0 ? 0 : end;
  const seq = [];
  for (let i = steps; i >= 1; i--) {
    seq.push(GLYPHS[(safeEnd - i + GLYPHS.length * 2) % GLYPHS.length]);
  }
  seq.push(GLYPHS[safeEnd]);
  return seq; // last element is always the resolved target
}

function Cell({ target, delay, reduced }) {
  const [glyph, setGlyph] = useState(reduced ? target.toUpperCase() : " ");
  const timer = useRef();
  useEffect(() => {
    if (reduced) { setGlyph(target.toUpperCase()); return; }
    const seq = flipSequence(target);
    let i = 0;
    const tick = () => {
      setGlyph(seq[i]);
      i += 1;
      if (i < seq.length) timer.current = setTimeout(tick, 45);
    };
    timer.current = setTimeout(tick, delay);
    return () => clearTimeout(timer.current);
  }, [target, delay, reduced]);
  return <span className="flap">{glyph === " " ? " " : glyph}</span>;
}

export default function SplitFlapText({ text, className = "" }) {
  const reduced = useReducedMotion();
  const chars = String(text).split("");
  return (
    <span className={`flaprow ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <Cell key={`${i}-${ch}`} target={ch} delay={i * 35} reduced={reduced} />
      ))}
    </span>
  );
}
