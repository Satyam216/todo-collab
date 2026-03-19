'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { createRoom, checkRoomExists } from '@/utils/roomActions';
import ProtectedRoute from '../protectedRoutes/ProtectedRoute';
import { LogIn, Plus, LogOut, Hash, Tag, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [roomId, setRoomId] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [customRoomId, setCustomRoomId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleJoinRoom = async () => {
    setError('');
    if (!roomId.trim()) return;
    const exists = await checkRoomExists(roomId);
    if (!exists) {
      setError('Room does not exist');
      return;
    }
    router.push(`/room/${roomId}`);
  };

  const handleCreateRoom = async () => {
    setError('');
    setSuccess('');
    if (!customRoomId.trim()) {
      setError('Room ID cannot be empty');
      return;
    }
    try {
      const id = await createRoom(customRoomId, newRoomName || 'Untitled Room');
      setSuccess('Room created successfully!');
      setTimeout(() => {
        router.push(`/room/${id}`);
      }, 1000);
    } catch (err) {
      setError('Room ID already exists. Please choose another.');
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <style>{globalStyles}</style>

      <main style={styles.main}>
        {/* GRID BG */}
        <div style={styles.gridBg} />
        <div style={styles.scanline} />

        {/* AMBIENT GLOW ORBS */}
        <div style={styles.orb1} />
        <div style={styles.orb2} />

        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.logoMark}>◈</div>
            <div>
              <p style={styles.logoSub}>SYSTEM</p>
              <p style={styles.logoTitle}>TODO COLLAB</p>
            </div>
          </div>

          <div style={styles.statusBar}>
            <span style={styles.statusDot} />
            <span style={styles.statusText}>ONLINE</span>
          </div>

          <button onClick={handleSignOut} style={styles.signOutBtn} className="hud-btn-logout">
            <LogOut size={15} />
            <span>LOGOUT</span>
          </button>
        </header>

        {/* WELCOME STRIP */}
        <div style={styles.welcomeStrip}>
          <div style={styles.welcomeInner}>
            <div style={styles.welcomeAccentLine} />
            <div>
              <p style={styles.welcomeLabel}>DASHBOARD INTERFACE</p>
              <h1 style={styles.welcomeTitle}>WELCOME, OPERATOR</h1>
            </div>
            <div style={styles.welcomeCode}>SYS-v2.4.1</div>
          </div>
        </div>

        {/* PANELS GRID */}
        <div style={styles.grid}>

          {/* ── JOIN ROOM PANEL ── */}
          <section style={styles.panel} className="hud-panel">
            <div style={{ ...styles.corner, ...styles.cornerTL }} />
            <div style={{ ...styles.corner, ...styles.cornerTR }} />
            <div style={{ ...styles.corner, ...styles.cornerBL }} />
            <div style={{ ...styles.corner, ...styles.cornerBR }} />

            <div style={styles.panelHeader}>
              <div style={styles.panelHeaderAccent} />
              <div style={styles.panelHeaderIcon}>
                <LogIn size={16} color={C.cyan} />
              </div>
              <div>
                <p style={styles.panelIndex}>01</p>
                <h2 style={styles.panelTitle}>JOIN ROOM</h2>
              </div>
            </div>

            <p style={styles.panelDesc}>Enter an existing room ID to connect.</p>

            <div style={styles.fieldWrap}>
              <label style={styles.fieldLabel}>
                <Hash size={11} /> ROOM ID
              </label>
              <div style={styles.inputGroup}>
                <div style={styles.inputAccent} />
                <input
                  type="text"
                  placeholder="ENTER ROOM ID..."
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                  style={styles.input}
                  className="hud-input"
                />
              </div>
            </div>

            <button onClick={handleJoinRoom} style={styles.btnCyan} className="hud-btn-cyan">
              <LogIn size={16} />
              <span>CONNECT TO ROOM</span>
              <div style={styles.btnArrow}>▶</div>
            </button>
          </section>

          {/* ── CREATE ROOM PANEL ── */}
          <section style={{ ...styles.panel, ...styles.panelGreen }} className="hud-panel">
            <div style={{ ...styles.corner, ...styles.cornerTLG }} />
            <div style={{ ...styles.corner, ...styles.cornerTRG }} />
            <div style={{ ...styles.corner, ...styles.cornerBLG }} />
            <div style={{ ...styles.corner, ...styles.cornerBRG }} />

            <div style={styles.panelHeader}>
              <div style={{ ...styles.panelHeaderAccent, background: C.green }} />
              <div style={{ ...styles.panelHeaderIcon, borderColor: C.green + '55' }}>
                <Plus size={16} color={C.green} />
              </div>
              <div>
                <p style={styles.panelIndex}>02</p>
                <h2 style={{ ...styles.panelTitle, color: C.green }}>CREATE ROOM</h2>
              </div>
            </div>

            <p style={styles.panelDesc}>Initialize a new room with a custom ID.</p>

            <div style={styles.fieldWrap}>
              <label style={styles.fieldLabel}>
                <Tag size={11} /> ROOM NAME <span style={styles.optional}>(optional)</span>
              </label>
              <div style={styles.inputGroup}>
                <div style={{ ...styles.inputAccent, background: `linear-gradient(180deg, ${C.green}, transparent)` }} />
                <input
                  type="text"
                  placeholder="ROOM NAME..."
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  style={styles.input}
                  className="hud-input hud-input-green"
                />
              </div>
            </div>

            <div style={styles.fieldWrap}>
              <label style={styles.fieldLabel}>
                <Hash size={11} /> ROOM ID
              </label>
              <div style={styles.inputGroup}>
                <div style={{ ...styles.inputAccent, background: `linear-gradient(180deg, ${C.green}, transparent)` }} />
                <input
                  type="text"
                  placeholder="CUSTOM ROOM ID..."
                  value={customRoomId}
                  onChange={(e) => setCustomRoomId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateRoom()}
                  style={styles.input}
                  className="hud-input hud-input-green"
                />
              </div>
            </div>

            <button onClick={handleCreateRoom} style={styles.btnGreen} className="hud-btn-green">
              <Plus size={16} />
              <span>INITIALIZE ROOM</span>
              <div style={styles.btnArrow}>▶</div>
            </button>
          </section>
        </div>

        {/* ALERT / SUCCESS MESSAGES */}
        {error && (
          <div style={styles.alertError} className="hud-alert">
            <AlertTriangle size={15} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div style={styles.alertSuccess} className="hud-alert">
            <CheckCircle2 size={15} />
            <span>{success}</span>
          </div>
        )}

        {/* FOOTER */}
        <footer style={styles.footer}>
          <span style={styles.footerText}>◈ TASKROOM SYSTEM · ALL CHANNELS SECURE</span>
        </footer>
      </main>
    </ProtectedRoute>
  );
}

const C = {
  cyan: '#00d4ff',
  cyanDim: '#00d4ff22',
  cyanGlow: '#00d4ff66',
  green: '#00ff9d',
  greenDim: '#00ff9d22',
  greenGlow: '#00ff9d55',
  red: '#ff4d6d',
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


const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    background: C.bg,
    fontFamily: C.fontBody,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 16px 60px',
    color: C.text,
  },

  gridBg: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
    opacity: 0.4,
    pointerEvents: 'none',
    zIndex: 0,
  },
  scanline: {
    position: 'fixed',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  orb1: {
    position: 'fixed',
    top: '-20%',
    left: '-10%',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, #00d4ff0a 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
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
    zIndex: 0,
  },

  header: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0 0',
    gap: 12,
    flexWrap: 'wrap' as const,
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  logoMark: {
    fontSize: 28,
    color: C.cyan,
    textShadow: `0 0 16px ${C.cyanGlow}`,
    lineHeight: 1,
    animation: 'spinGlow 4s ease-in-out infinite',
  },
  logoSub: { fontSize: 9, letterSpacing: 5, color: C.textDim, margin: 0, fontFamily: C.font },
  logoTitle: { fontSize: 14, letterSpacing: 3, color: C.cyan, margin: 0, fontFamily: C.font, textShadow: `0 0 10px ${C.cyanGlow}` },

  statusBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: C.surfaceAlt,
    border: `1px solid ${C.borderBright}`,
    padding: '6px 14px',
    clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: C.green,
    boxShadow: `0 0 8px ${C.green}`,
    animation: 'blink 1.5s ease-in-out infinite',
    display: 'inline-block',
  },
  statusText: { fontSize: 10, letterSpacing: 4, color: C.green, fontFamily: C.font },

  signOutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'transparent',
    border: `1px solid ${C.red}`,
    color: C.red,
    padding: '9px 18px',
    cursor: 'pointer',
    fontFamily: C.font,
    fontSize: 11,
    letterSpacing: 2,
    clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%)',
    transition: 'all 0.2s',
  },


  welcomeStrip: {
    position: 'relative',
    zIndex: 5,
    width: '100%',
    maxWidth: 900,
    margin: '28px 0 0',
    background: C.surfaceAlt,
    border: `1px solid ${C.borderBright}`,
    borderLeft: `3px solid ${C.cyan}`,
    padding: '18px 24px',
  },
  welcomeInner: { display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' as const },
  welcomeAccentLine: {
    width: 2,
    height: 44,
    background: `linear-gradient(180deg, ${C.cyan}, transparent)`,
    flexShrink: 0,
  },
  welcomeLabel: { margin: 0, fontSize: 10, letterSpacing: 3, color: C.textDim },
  welcomeTitle: { margin: 0, fontFamily: C.font, fontSize: 22, color: C.cyan, letterSpacing: 4, textShadow: `0 0 14px ${C.cyanGlow}` },
  welcomeCode: { marginLeft: 'auto', fontSize: 10, letterSpacing: 3, color: C.borderBright, fontFamily: C.font },

  grid: {
    position: 'relative',
    zIndex: 5,
    width: '100%',
    maxWidth: 900,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
    marginTop: 24,
  },

  panel: {
    background: `linear-gradient(160deg, ${C.surface}, ${C.surfaceAlt})`,
    border: `1px solid ${C.borderBright}`,
    padding: '28px 24px',
    position: 'relative',
    clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
  },
  panelGreen: {
    borderColor: C.green + '44',
  },

  /* CORNER BRACKETS */
  corner: { position: 'absolute', width: 14, height: 14 },
  cornerTL: { top: -1, left: -1, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}` },
  cornerTR: { top: -1, right: -1, borderTop: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}` },
  cornerBL: { bottom: -1, left: -1, borderBottom: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}` },
  cornerBR: { bottom: -1, right: -1, borderBottom: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}` },
  cornerTLG: { top: -1, left: -1, borderTop: `2px solid ${C.green}`, borderLeft: `2px solid ${C.green}` },
  cornerTRG: { top: -1, right: -1, borderTop: `2px solid ${C.green}`, borderRight: `2px solid ${C.green}` },
  cornerBLG: { bottom: -1, left: -1, borderBottom: `2px solid ${C.green}`, borderLeft: `2px solid ${C.green}` },
  cornerBRG: { bottom: -1, right: -1, borderBottom: `2px solid ${C.green}`, borderRight: `2px solid ${C.green}` },

  panelHeader: { display: 'flex', alignItems: 'center', gap: 14 },
  panelHeaderAccent: {
    width: 3,
    height: 36,
    background: `linear-gradient(180deg, ${C.cyan}, transparent)`,
    flexShrink: 0,
  },
  panelHeaderIcon: {
    width: 36,
    height: 36,
    border: `1px solid ${C.cyan}44`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: C.bg,
    flexShrink: 0,
  },
  panelIndex: { margin: 0, fontSize: 10, letterSpacing: 3, color: C.textDim, fontFamily: C.font },
  panelTitle: { margin: 0, fontFamily: C.font, fontSize: 15, color: C.cyan, letterSpacing: 3 },
  panelDesc: { margin: 0, fontSize: 11, color: C.textDim, letterSpacing: 1, lineHeight: 1.6 },

  /* FIELDS */
  fieldWrap: { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  fieldLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 10,
    letterSpacing: 3,
    color: C.textDim,
    fontFamily: C.font,
  },
  optional: { color: C.borderBright, fontSize: 9, letterSpacing: 1 },

  inputGroup: { position: 'relative' },
  inputAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: `linear-gradient(180deg, ${C.cyan}, transparent)`,
    zIndex: 1,
  },
  input: {
    width: '100%',
    background: C.bg,
    border: `1px solid ${C.borderBright}`,
    borderLeft: 'none',
    color: C.text,
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 13,
    padding: '12px 14px 12px 18px',
    outline: 'none',
    letterSpacing: 1,
    boxSizing: 'border-box' as const,
  },

  /* BUTTONS */
  btnCyan: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: `linear-gradient(135deg, ${C.cyanDim}, ${C.cyan}33)`,
    border: `1px solid ${C.cyan}`,
    color: C.cyan,
    padding: '13px 20px',
    cursor: 'pointer',
    fontFamily: C.font,
    fontSize: 11,
    letterSpacing: 2,
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
    width: '100%',
    justifyContent: 'center',
    transition: 'all 0.2s',
    marginTop: 4,
  },
  btnGreen: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: `linear-gradient(135deg, ${C.greenDim}, ${C.green}33)`,
    border: `1px solid ${C.green}`,
    color: C.green,
    padding: '13px 20px',
    cursor: 'pointer',
    fontFamily: C.font,
    fontSize: 11,
    letterSpacing: 2,
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
    width: '100%',
    justifyContent: 'center',
    transition: 'all 0.2s',
    marginTop: 4,
  },
  btnArrow: { marginLeft: 'auto', fontSize: 10, opacity: 0.6 },

  /* ALERTS */
  alertError: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    maxWidth: 900,
    width: '100%',
    background: '#ff4d6d11',
    border: `1px solid ${C.red}`,
    borderLeft: `3px solid ${C.red}`,
    color: C.red,
    padding: '12px 18px',
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: C.fontBody,
    animation: 'fadeIn 0.3s ease',
  },
  alertSuccess: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    maxWidth: 900,
    width: '100%',
    background: '#00ff9d11',
    border: `1px solid ${C.green}`,
    borderLeft: `3px solid ${C.green}`,
    color: C.green,
    padding: '12px 18px',
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: C.fontBody,
    animation: 'fadeIn 0.3s ease',
  },

  /* FOOTER */
  footer: {
    position: 'relative',
    zIndex: 5,
    marginTop: 'auto',
    paddingTop: 40,
  },
  footerText: { fontSize: 10, letterSpacing: 3, color: C.borderBright },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  @keyframes spinGlow {
    0%, 100% { text-shadow: 0 0 16px #00d4ff66; }
    50% { text-shadow: 0 0 28px #00d4ffcc; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hud-input::placeholder { color: #4a7a9b; letter-spacing: 2px; font-size: 12px; }
  .hud-input:focus { border-color: #00d4ff !important; box-shadow: 0 0 0 1px #00d4ff22 inset; }
  .hud-input-green:focus { border-color: #00ff9d !important; box-shadow: 0 0 0 1px #00ff9d22 inset; }

  .hud-btn-logout:hover { background: #ff4d6d22 !important; box-shadow: 0 0 16px #ff4d6d33; }

  .hud-btn-cyan:hover {
    background: linear-gradient(135deg, #00d4ff33, #00d4ff55) !important;
    box-shadow: 0 0 24px #00d4ff33;
  }
  .hud-btn-green:hover {
    background: linear-gradient(135deg, #00ff9d33, #00ff9d55) !important;
    box-shadow: 0 0 24px #00ff9d33;
  }

  .hud-panel { transition: border-color 0.3s; }
  .hud-panel:hover { border-color: #1a4a6e; }

  .hud-alert { transition: all 0.3s; }

  @media (max-width: 480px) {
    .hud-btn-cyan span, .hud-btn-green span { font-size: 10px; }
  }
`;