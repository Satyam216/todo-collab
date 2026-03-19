'use client';

import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard/');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
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

      {/* FLOATING CORNER DECORATIONS */}
      <div style={styles.decorTL}>
        <div style={styles.decorLine} />
        <div style={{ ...styles.decorLine, width: 60 }} />
      </div>
      <div style={styles.decorBR}>
        <div style={styles.decorLine} />
        <div style={{ ...styles.decorLine, width: 60 }} />
      </div>

      {/* LOGIN CARD */}
      <div style={styles.card} className="hud-card">
        {/* CORNER BRACKETS */}
        <div style={{ ...styles.corner, ...styles.cornerTL }} />
        <div style={{ ...styles.corner, ...styles.cornerTR }} />
        <div style={{ ...styles.corner, ...styles.cornerBL }} />
        <div style={{ ...styles.corner, ...styles.cornerBR }} />

        {/* TOP ACCENT LINE */}
        <div style={styles.cardTopBar} />

        {/* SYSTEM BADGE */}
        <div style={styles.systemBadge}>
          <span style={styles.systemDot} />
          <span style={styles.systemLabel}>SECURE ACCESS PORTAL</span>
          <span style={styles.systemDot} />
        </div>

        {/* LOGO MARK */}
        <div style={styles.logoWrap}>
          <div style={styles.logoRing}>
            <div style={styles.logoRingInner} />
            <span style={styles.logoSymbol}>◈</span>
          </div>
          <div style={styles.logoLines}>
            <div style={styles.logoLineH} />
            <div style={{ ...styles.logoLineH, width: 40, opacity: 0.4 }} />
          </div>
        </div>

        {/* TITLE */}
        <div style={styles.titleBlock}>
          <p style={styles.titleSub}>INITIALIZING</p>
          <h1 style={styles.title}>TODO COLLAB</h1>
          <div style={styles.titleUnderline} />
          <p style={styles.titleDesc}>COLLABORATE · MANAGE · ACHIEVE</p>
        </div>

        {/* DIVIDER */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>AUTHENTICATE</span>
          <div style={styles.dividerLine} />
        </div>

        {/* GOOGLE SIGN IN */}
        <button
          onClick={handleGoogleSignIn}
          style={styles.googleBtn}
          className="hud-google-btn"
        >
          <div style={styles.googleIconWrap}>
            <FcGoogle style={{ fontSize: 22 }} />
          </div>
          <span style={styles.googleBtnText}>SIGN IN WITH GOOGLE</span>
          <div style={styles.googleBtnArrow}>▶</div>

          {/* BUTTON CORNER CUTS */}
          <div style={styles.btnCornerTL} />
          <div style={styles.btnCornerBR} />
        </button>

        {/* STATUS ROW */}
        <div style={styles.statusRow}>
          <div style={styles.statusItem}>
            <span style={{ ...styles.statusDot, background: '#00ff9d', boxShadow: '0 0 6px #00ff9d' }} />
            <span style={styles.statusItemText}>ENCRYPTED</span>
          </div>
          <div style={styles.statusItem}>
            <span style={{ ...styles.statusDot, background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
            <span style={styles.statusItemText}>FIREBASE AUTH</span>
          </div>
          <div style={styles.statusItem}>
            <span style={{ ...styles.statusDot, background: '#ffb830', boxShadow: '0 0 6px #ffb830' }} />
            <span style={styles.statusItemText}>GOOGLE SSO</span>
          </div>
        </div>

        {/* TERMS */}
        <p style={styles.terms}>
          BY SIGNING IN, YOU AGREE TO OUR{' '}
          <span style={styles.termsLink} className="hud-terms-link">
            TERMS & CONDITIONS
          </span>
        </p>

        {/* BOTTOM CODE LINE */}
        <div style={styles.cardBottomBar}>
          <span style={styles.cardBottomText}>SYS-AUTH-v2.4.1 · ALL CHANNELS SECURE</span>
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
  bg: '#050d1a',
  surface: '#0a1628',
  surfaceAlt: '#0d1e35',
  border: '#0e2a44',
  borderBright: '#1a4a6e',
  text: '#c8e6f5',
  textDim: '#4a7a9b',
  font: "'Orbitron', 'Share Tech Mono', monospace",
  fontBody: "'Share Tech Mono', 'Courier New', monospace",
};

/* ─── STYLES ──────────────────────────────────────────── */

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    background: C.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: C.fontBody,
    position: 'relative',
    overflow: 'hidden',
    padding: '24px 16px',
  },

  gridBg: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
    opacity: 0.4,
    pointerEvents: 'none',
  },
  scanline: {
    position: 'fixed',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
    pointerEvents: 'none',
  },
  orb1: {
    position: 'fixed',
    top: '-15%',
    left: '-15%',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, #00d4ff0d 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'fixed',
    bottom: '-20%',
    right: '-10%',
    width: 600,
    height: 600,
    borderRadius: '50%',
    background: 'radial-gradient(circle, #00ff9d08 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orb3: {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 800,
    borderRadius: '50%',
    background: 'radial-gradient(circle, #00d4ff05 0%, transparent 60%)',
    pointerEvents: 'none',
  },

  /* FLOATING DECORATIONS */
  decorTL: {
    position: 'fixed',
    top: 24,
    left: 24,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
    opacity: 0.3,
    pointerEvents: 'none',
  },
  decorBR: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
    opacity: 0.3,
    pointerEvents: 'none',
    transform: 'rotate(180deg)',
  },
  decorLine: {
    height: 1,
    width: 80,
    background: `linear-gradient(90deg, ${C.cyan}, transparent)`,
  },

  /* CARD */
  card: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: 420,
    background: `linear-gradient(160deg, ${C.surface} 0%, ${C.surfaceAlt} 100%)`,
    border: `1px solid ${C.borderBright}`,
    padding: '0 0 28px',
    clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 0,
  },

  corner: { position: 'absolute', width: 16, height: 16 },
  cornerTL: { top: -1, left: -1, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}` },
  cornerTR: { top: -1, right: -1, borderTop: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}` },
  cornerBL: { bottom: -1, left: -1, borderBottom: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}` },
  cornerBR: { bottom: -1, right: -1, borderBottom: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}` },

  cardTopBar: {
    width: '100%',
    height: 3,
    background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.green}, transparent)`,
    marginBottom: 20,
    animation: 'shimmer 3s ease-in-out infinite',
  },

  /* SYSTEM BADGE */
  systemBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: C.bg,
    border: `1px solid ${C.border}`,
    padding: '5px 16px',
    marginBottom: 28,
    clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
  },
  systemDot: {
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: C.cyan,
    boxShadow: `0 0 6px ${C.cyan}`,
    animation: 'blink 1.5s ease-in-out infinite',
  },
  systemLabel: {
    fontSize: 9,
    letterSpacing: 4,
    color: C.textDim,
    fontFamily: C.font,
  },

  /* LOGO */
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
  },
  logoRing: {
    position: 'relative',
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRingInner: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: `1px solid ${C.cyan}44`,
    animation: 'ringPulse 2.5s ease-in-out infinite',
  },
  logoSymbol: {
    fontSize: 36,
    color: C.cyan,
    textShadow: `0 0 20px ${C.cyanGlow}, 0 0 40px ${C.cyanDim}`,
    animation: 'spinGlow 4s ease-in-out infinite',
    lineHeight: 1,
  },
  logoLines: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 5,
  },
  logoLineH: {
    height: 1,
    width: 24,
    background: `linear-gradient(90deg, ${C.cyan}, transparent)`,
  },

  /* TITLE */
  titleBlock: {
    textAlign: 'center' as const,
    padding: '0 28px',
    marginBottom: 28,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 8,
  },
  titleSub: {
    margin: 0,
    fontSize: 10,
    letterSpacing: 4,
    color: C.textDim,
    fontFamily: C.font,
  },
  title: {
    margin: 0,
    fontFamily: C.font,
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 6,
    color: C.cyan,
    textShadow: `0 0 20px ${C.cyanGlow}`,
    lineHeight: 1.1,
  },
  titleUnderline: {
    width: 60,
    height: 1,
    background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
  },
  titleDesc: {
    margin: 0,
    fontSize: 9,
    letterSpacing: 4,
    color: C.textDim,
    fontFamily: C.font,
  },

  /* DIVIDER */
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '0 28px',
    marginBottom: 20,
    boxSizing: 'border-box' as const,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: C.borderBright,
  },
  dividerText: {
    fontSize: 9,
    letterSpacing: 4,
    color: C.textDim,
    fontFamily: C.font,
    whiteSpace: 'nowrap' as const,
  },

  /* GOOGLE BUTTON */
  googleBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    width: 'calc(100% - 56px)',
    background: `linear-gradient(135deg, ${C.cyanDim}, #00d4ff18)`,
    border: `1px solid ${C.cyan}`,
    color: C.cyan,
    padding: '14px 20px',
    cursor: 'pointer',
    fontFamily: C.font,
    fontSize: 12,
    letterSpacing: 3,
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
    marginBottom: 24,
    transition: 'all 0.25s',
  },
  googleIconWrap: {
    width: 32,
    height: 32,
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${C.borderBright}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  googleBtnText: { flex: 1, textAlign: 'left' as const },
  googleBtnArrow: { fontSize: 10, opacity: 0.5 },
  btnCornerTL: {
    position: 'absolute',
    top: -1,
    left: -1,
    width: 10,
    height: 10,
    borderTop: `2px solid ${C.green}`,
    borderLeft: `2px solid ${C.green}`,
  },
  btnCornerBR: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderBottom: `2px solid ${C.green}`,
    borderRight: `2px solid ${C.green}`,
  },

  /* STATUS ROW */
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 22,
    flexWrap: 'wrap' as const,
    padding: '0 20px',
  },
  statusItem: { display: 'flex', alignItems: 'center', gap: 6 },
  statusDot: {
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    animation: 'blink 2s ease-in-out infinite',
  },
  statusItemText: { fontSize: 8, letterSpacing: 2, color: C.textDim, fontFamily: C.font },

  /* TERMS */
  terms: {
    margin: '0 0 20px',
    fontSize: 9,
    letterSpacing: 1.5,
    color: C.textDim,
    textAlign: 'center' as const,
    padding: '0 28px',
    lineHeight: 1.8,
    fontFamily: C.font,
  },
  termsLink: {
    color: C.cyan,
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  },

  /* BOTTOM BAR */
  cardBottomBar: {
    width: '100%',
    background: C.bg,
    borderTop: `1px solid ${C.border}`,
    padding: '10px 28px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  cardBottomText: {
    fontSize: 8,
    letterSpacing: 2,
    color: C.borderBright,
    fontFamily: C.font,
  },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  @keyframes spinGlow {
    0%, 100% { text-shadow: 0 0 20px #00d4ff66; }
    50% { text-shadow: 0 0 36px #00d4ffcc, 0 0 60px #00d4ff33; }
  }

  @keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.12); opacity: 0.8; }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  .hud-card {
    animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .hud-google-btn:hover {
    background: linear-gradient(135deg, #00d4ff33, #00d4ff44) !important;
    box-shadow: 0 0 30px #00d4ff33, 0 0 60px #00d4ff11;
    transform: translateY(-1px);
  }

  .hud-google-btn:active {
    transform: translateY(0px);
  }

  .hud-terms-link:hover {
    color: #00ff9d !important;
  }
`;