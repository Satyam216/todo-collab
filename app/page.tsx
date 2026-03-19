'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main style={styles.main}>
      <style>{globalStyles}</style>

      {/* GRID BG */}
      <div style={styles.gridBg} />
      <div style={styles.scanline} />

      {/* AMBIENT ORBS */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.orb3} />

      {/* TOP HUD BAR */}
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <span style={styles.topBarDot} />
          <span style={styles.topBarText}>TASKROOM · ONLINE</span>
        </div>
        <div style={styles.topBarCenter}>
          {['SYS', 'NET', 'AUTH', 'DB'].map((label, i) => (
            <div key={label} style={styles.topBarChip}>
              <span style={{ ...styles.chipDot, animationDelay: `${i * 0.4}s` }} />
              <span style={styles.chipLabel}>{label}</span>
            </div>
          ))}
        </div>
        <div style={styles.topBarRight}>
          <span style={styles.topBarText}>v2.4.1</span>
        </div>
      </div>

      {/* CORNER DECORATIONS */}
      <div style={styles.decorTL}>
        <div style={styles.decorCornerV} />
        <div style={styles.decorCornerH} />
      </div>
      <div style={styles.decorTR}>
        <div style={{ ...styles.decorCornerV }} />
        <div style={{ ...styles.decorCornerH, background: `linear-gradient(270deg, #00ff9d, transparent)` }} />
      </div>
      <div style={styles.decorBL}>
        <div style={{ ...styles.decorCornerV, background: `linear-gradient(0deg, #00d4ff, transparent)` }} />
        <div style={styles.decorCornerH} />
      </div>
      <div style={styles.decorBR}>
        <div style={{ ...styles.decorCornerV, background: `linear-gradient(0deg, #00ff9d, transparent)` }} />
        <div style={{ ...styles.decorCornerH, background: `linear-gradient(270deg, #00ff9d, transparent)` }} />
      </div>

      {/* HERO CONTENT */}
      <div style={styles.hero}>

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.eyebrow}
        >
          <div style={styles.eyebrowLine} />
          <span style={styles.eyebrowText}>// REAL-TIME TASK COLLABORATION</span>
          <div style={styles.eyebrowLine} />
        </motion.div>

        {/* MAIN TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={styles.titleWrap}
        >
          <p style={styles.titlePre}>WELCOME TO</p>
          <h1 style={styles.title}>
            TODO
            <span style={styles.titleAccent}>COLLAB</span>
          </h1>
          <div style={styles.titleGlowBar} />
        </motion.div>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={styles.subtitle}
        >
          Empower your team with real-time collaboration on tasks.
          <br />
          <span style={styles.subtitleAccent}>Stay organized. Stay productive.</span>
        </motion.p>

        {/* FEATURE CHIPS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={styles.features}
        >
          {[
            { icon: '◈', label: 'REAL-TIME SYNC' },
            { icon: '⬡', label: 'SHARED ROOMS' },
            { icon: '◇', label: 'TASK TRACKING' },
          ].map((f) => (
            <div key={f.label} style={styles.featureChip}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <span style={styles.featureLabel}>{f.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <button onClick={handleLogin} style={styles.ctaBtn} className="hud-cta-btn">
            {/* CORNER ACCENTS */}
            <div style={styles.ctaCornerTL} />
            <div style={styles.ctaCornerBR} />

            <span style={styles.ctaBtnIcon}>▶</span>
            <span style={styles.ctaBtnText}>INITIALIZE SESSION</span>
            <span style={styles.ctaBtnSub}>GET STARTED</span>
          </button>
        </motion.div>

        {/* BOTTOM STATUS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={styles.statusRow}
        >
          <span style={styles.statusDot} />
          <span style={styles.statusText}>ALL SYSTEMS OPERATIONAL · SECURE CONNECTION ESTABLISHED</span>
        </motion.div>
      </div>

      {/* BOTTOM HUD BAR */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomBarLine} />
        <div style={styles.bottomBarContent}>
          <span style={styles.bottomBarText}>◈ TASKROOM SYSTEM</span>
          <span style={styles.bottomBarText}>COLLABORATE · MANAGE · ACHIEVE</span>
          <span style={styles.bottomBarText}>SYS-v2.4.1</span>
        </div>
      </div>
    </main>
  );
}

/* ─── TOKENS ──────────────────────────────────────────── */

const C = {
  cyan: '#00d4ff',
  cyanDim: '#00d4ff22',
  cyanGlow: '#00d4ff66',
  green: '#00ff9d',
  greenGlow: '#00ff9d55',
  bg: '#050d1a',
  surface: '#0a1628',
  surfaceAlt: '#0d1e35',
  border: '#0e2a44',
  borderBright: '#1a4a6e',
  text: '#c8e6f5',
  textDim: '#4a7a9b',
  font: "'Orbitron', monospace",
  fontBody: "'Share Tech Mono', monospace",
};

/* ─── STYLES ──────────────────────────────────────────── */

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    background: C.bg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: C.fontBody,
    position: 'relative',
    overflow: 'hidden',
    color: C.text,
  },

  gridBg: {
    position: 'fixed', inset: 0,
    backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
    opacity: 0.4,
    pointerEvents: 'none',
  },
  scanline: {
    position: 'fixed', inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
    pointerEvents: 'none',
  },
  orb1: {
    position: 'fixed', top: '-20%', left: '-15%',
    width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, #00d4ff0e 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'fixed', bottom: '-20%', right: '-10%',
    width: 700, height: 700, borderRadius: '50%',
    background: 'radial-gradient(circle, #00ff9d08 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orb3: {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900, height: 900, borderRadius: '50%',
    background: 'radial-gradient(circle, #00d4ff04 0%, transparent 55%)',
    pointerEvents: 'none',
  },

  /* TOP BAR */
  topBar: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 24px',
    background: `${C.surface}cc`,
    borderBottom: `1px solid ${C.border}`,
    backdropFilter: 'blur(8px)',
    flexWrap: 'wrap' as const,
    gap: 8,
  },
  topBarLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  topBarCenter: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const },
  topBarRight: {},
  topBarDot: {
    display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
    background: C.green, boxShadow: `0 0 8px ${C.green}`,
    animation: 'blink 1.5s ease-in-out infinite',
  },
  topBarText: { fontSize: 10, letterSpacing: 3, color: C.textDim, fontFamily: C.font },
  topBarChip: {
    display: 'flex', alignItems: 'center', gap: 5,
    background: C.surfaceAlt,
    border: `1px solid ${C.border}`,
    padding: '3px 10px',
    clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
  },
  chipDot: {
    display: 'inline-block', width: 4, height: 4, borderRadius: '50%',
    background: C.cyan, boxShadow: `0 0 5px ${C.cyan}`,
    animation: 'blink 2s ease-in-out infinite',
  },
  chipLabel: { fontSize: 9, letterSpacing: 2, color: C.textDim, fontFamily: C.font },

  /* CORNER DECORATIONS */
  decorTL: { position: 'fixed', top: 52, left: 16, pointerEvents: 'none' },
  decorTR: { position: 'fixed', top: 52, right: 16, pointerEvents: 'none' },
  decorBL: { position: 'fixed', bottom: 40, left: 16, pointerEvents: 'none' },
  decorBR: { position: 'fixed', bottom: 40, right: 16, pointerEvents: 'none' },
  decorCornerV: {
    width: 1, height: 60,
    background: `linear-gradient(180deg, ${C.cyan}, transparent)`,
    marginBottom: 4,
  },
  decorCornerH: {
    width: 60, height: 1,
    background: `linear-gradient(90deg, ${C.cyan}, transparent)`,
  },

  /* HERO */
  hero: {
    position: 'relative', zIndex: 10,
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center', gap: 24,
    padding: '100px 24px 80px',
    maxWidth: 700, width: '100%',
    textAlign: 'center' as const,
  },

  eyebrow: {
    display: 'flex', alignItems: 'center', gap: 14,
    width: '100%', justifyContent: 'center',
  },
  eyebrowLine: { flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.borderBright})`, maxWidth: 80 },
  eyebrowText: { fontSize: 10, letterSpacing: 4, color: C.textDim, fontFamily: C.font, whiteSpace: 'nowrap' as const },

  titleWrap: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 },
  titlePre: {
    margin: 0, fontSize: 11, letterSpacing: 8,
    color: C.textDim, fontFamily: C.font,
  },
  title: {
    margin: 0, fontFamily: C.font,
    fontSize: 'clamp(44px, 10vw, 80px)',
    fontWeight: 700, letterSpacing: 8,
    color: C.cyan,
    textShadow: `0 0 30px ${C.cyanGlow}, 0 0 60px ${C.cyanDim}`,
    lineHeight: 1,
    display: 'flex', gap: 16, flexWrap: 'wrap' as const, justifyContent: 'center',
  },
  titleAccent: {
    color: C.green,
    textShadow: `0 0 30px ${C.greenGlow}, 0 0 60px #00ff9d22`,
  },
  titleGlowBar: {
    width: 120, height: 2,
    background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.green}, transparent)`,
    marginTop: 8,
    animation: 'shimmer 3s ease-in-out infinite',
  },

  subtitle: {
    margin: 0, fontSize: 14,
    color: C.textDim, letterSpacing: 1,
    lineHeight: 2, fontFamily: C.fontBody,
    maxWidth: 480,
  },
  subtitleAccent: { color: C.text, letterSpacing: 2 },

  /* FEATURE CHIPS */
  features: {
    display: 'flex', gap: 12,
    flexWrap: 'wrap' as const, justifyContent: 'center',
  },
  featureChip: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: C.surfaceAlt,
    border: `1px solid ${C.borderBright}`,
    padding: '8px 16px',
    clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
  },
  featureIcon: { fontSize: 14, color: C.cyan, textShadow: `0 0 8px ${C.cyanGlow}` },
  featureLabel: { fontSize: 9, letterSpacing: 3, color: C.textDim, fontFamily: C.font },

  /* CTA */
  ctaBtn: {
    position: 'relative',
    display: 'flex', alignItems: 'center', gap: 14,
    background: `linear-gradient(135deg, ${C.cyanDim}, #00d4ff18)`,
    border: `1px solid ${C.cyan}`,
    color: C.cyan,
    padding: '18px 40px',
    cursor: 'pointer',
    fontFamily: C.font,
    letterSpacing: 3,
    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
    transition: 'all 0.25s',
    flexDirection: 'column' as const,
  },
  ctaBtnIcon: { position: 'absolute', left: 20, fontSize: 12, opacity: 0.6 },
  ctaBtnText: { fontSize: 14, letterSpacing: 4, fontWeight: 600 },
  ctaBtnSub: { fontSize: 9, letterSpacing: 5, color: C.textDim, marginTop: 2 },
  ctaCornerTL: {
    position: 'absolute', top: -1, left: -1,
    width: 12, height: 12,
    borderTop: `2px solid ${C.green}`, borderLeft: `2px solid ${C.green}`,
  },
  ctaCornerBR: {
    position: 'absolute', bottom: -1, right: -1,
    width: 12, height: 12,
    borderBottom: `2px solid ${C.green}`, borderRight: `2px solid ${C.green}`,
  },

  /* STATUS */
  statusRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    justifyContent: 'center',
  },
  statusDot: {
    display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
    background: C.green, boxShadow: `0 0 8px ${C.green}`,
    animation: 'blink 1.5s ease-in-out infinite',
    flexShrink: 0,
  },
  statusText: { fontSize: 9, letterSpacing: 2, color: C.textDim, fontFamily: C.font },

  /* BOTTOM BAR */
  bottomBar: {
    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
    background: `${C.surface}cc`,
    backdropFilter: 'blur(8px)',
    borderTop: `1px solid ${C.border}`,
  },
  bottomBarLine: {
    height: 1,
    background: `linear-gradient(90deg, transparent, ${C.cyan}44, ${C.green}44, transparent)`,
    animation: 'shimmer 3s ease-in-out infinite',
  },
  bottomBarContent: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 24px', flexWrap: 'wrap' as const, gap: 8,
  },
  bottomBarText: { fontSize: 9, letterSpacing: 3, color: C.borderBright, fontFamily: C.font },
};

/* ─── GLOBAL CSS ──────────────────────────────────────── */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .hud-cta-btn:hover {
    background: linear-gradient(135deg, #00d4ff33, #00d4ff44) !important;
    box-shadow: 0 0 40px #00d4ff33, 0 0 80px #00d4ff11;
    transform: translateY(-2px);
    color: #fff !important;
  }

  .hud-cta-btn:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    .hud-cta-btn { padding: 14px 28px !important; }
  }
`;