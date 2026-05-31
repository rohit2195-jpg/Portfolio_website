import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FlapDisplay, Presets } from "react-split-flap-effect";
import { LINES } from "../data/transitMessages";

const LINE_LEN = 12;
const STATUS_LEN = 20;
const DETAIL_LEN = 72;
const CHARS = Presets.ALPHANUM + "-";
const DETAIL_CHARS = Presets.ALPHANUM + "#$%'(),-.:?";

function pad(str, len) {
  return str.slice(0, len).padEnd(len, " ");
}

function LiveClock() {
  const fmt = () => {
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map((n) => String(n).padStart(2, "0"))
      .join(":");
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="flap-station-time">{time}</span>;
}

function padDetail(str) {
  return str.toUpperCase().slice(0, DETAIL_LEN).padEnd(DETAIL_LEN, " ");
}

const ROW_CONFIG = [
  { startOffset: 0,                              interval: 10000 },
  { startOffset: Math.floor(LINES.length / 3),   interval: 13000 },
  { startOffset: Math.floor(LINES.length * 2 / 3), interval: 16000 },
];

// Synthesize the mechanical click sound — module-level so it has no closure issues
function synthFlap(ctx) {
  try {
    const numClicks = 10;
    const spread = 0.28;
    // 50ms buffer so sounds are never in the past on a freshly-created context
    const base = ctx.currentTime + 0.05;
    for (let i = 0; i < numClicks; i++) {
      const t = base + (i / numClicks) * spread;
      const dur = 0.015;
      const size = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, size, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let j = 0; j < size; j++) {
        data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (size * 0.35));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const gain = ctx.createGain();
      gain.gain.value = 0.15 + Math.random() * 0.05;
      const hpf = ctx.createBiquadFilter();
      hpf.type = "highpass";
      hpf.frequency.value = 500;
      src.connect(hpf);
      hpf.connect(gain);
      gain.connect(ctx.destination);
      src.start(t);
    }
  } catch (_) {}
}

function FlapRow({ startOffset, interval, onFlap }) {
  const [idx, setIdx] = useState(startOffset % LINES.length);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % LINES.length);
      onFlap();
    }, interval);
    return () => clearInterval(t);
  }, [interval, onFlap]);

  const entry = LINES[idx];

  return (
    <div className="flap-row">
      <span
        className="flap-row-dot"
        style={{ background: entry.color }}
        aria-hidden="true"
      />
      <div className="flap-row-cells">
        <FlapDisplay
          chars={CHARS}
          length={LINE_LEN}
          value={pad(entry.line, LINE_LEN)}
          timing={20}
          className="flap-field flap-field--line"
        />
        <FlapDisplay
          chars={CHARS}
          length={STATUS_LEN}
          value={pad(entry.status, STATUS_LEN)}
          timing={20}
          className="flap-field flap-field--status"
        />
      </div>
      <div className="flap-row-detail" aria-live="polite">
        <FlapDisplay
          chars={DETAIL_CHARS}
          length={DETAIL_LEN}
          value={padDetail(entry.detail)}
          timing={15}
          className="flap-field flap-field--detail"
        />
      </div>
      <p className="flap-row-detail-text">{entry.detail.toUpperCase()}</p>
    </div>
  );
}

export default function FlapBoard() {
  const audioCtxRef = useRef(null);
  const soundEnabledRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);

  const playFlapSound = useCallback(() => {
    if (!soundEnabledRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state !== "running") return;
    synthFlap(ctx);
  }, []);

  function toggleSound() {
    const next = !soundEnabledRef.current;
    soundEnabledRef.current = next;
    setSoundOn(next);
    if (next) {
      if (!audioCtxRef.current) {
        const AC = window.AudioContext || window["webkitAudioContext"];
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;
      // Safari requires audio to be scheduled synchronously within the user gesture.
      // Sounds scheduled on a suspended context queue up and play once resume() fires.
      if (ctx.resume) ctx.resume();
      synthFlap(ctx);
    }
  }

  return (
    <>
      <section className="page-intro page-intro-compact">
        <p className="eyebrow">
          <i className="fa-solid fa-arrow-left icon-inline" aria-hidden="true" />
          <Link to="/" state={{ scrollTo: "miscellaneous" }}>Miscellaneous</Link>
        </p>
        <h2>
          Status Board
          <span className="page-pronunciation">[stay-tuhs bord]</span>
        </h2>
        <p className="page-lead">
          Live service alerts across all RSTA lines.
        </p>
      </section>

      <div className="flap-board" role="region" aria-label="RSTA service status board">
        <div className="flap-station-strip" aria-hidden="true">
          <span className="flap-station-live">
            <span className="flap-station-live-dot" />
            LIVE
          </span>
          <span className="flap-station-sep">·</span>
          <span className="flap-station-name">RSTA DEPARTURE STATUS</span>
          <span className="flap-station-sep">·</span>
          <LiveClock />
        </div>
        <div className="flap-board-header">
          <div className="flap-board-header-labels" aria-hidden="true">
            <span className="flap-board-header-label">LINE</span>
            <span className="flap-board-header-label">STATUS</span>
          </div>
          <button
            className={`flap-sound-toggle${soundOn ? " flap-sound-toggle--on" : ""}`}
            onClick={toggleSound}
            aria-label={soundOn ? "Mute board sounds" : "Enable board sounds"}
          >
            <i className={`fa-solid ${soundOn ? "fa-volume-high" : "fa-volume-xmark"}`} />
          </button>
        </div>
        {ROW_CONFIG.map(({ startOffset, interval }, i) => (
          <FlapRow key={i} startOffset={startOffset} interval={interval} onFlap={playFlapSound} />
        ))}
      </div>

    </>
  );
}
