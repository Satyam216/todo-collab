import type { Metadata } from "next";
import { Share_Tech_Mono, Orbitron } from "next/font/google";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./globals.css";
import packageJson from "../package.json";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Todo-collab",
  description: "Collaborative Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${shareTechMono.variable}`}>
        <div style={styles.wrapper}>
          <main style={styles.main}>{children}</main>

          <footer style={styles.footer}>
            {/* TOP ACCENT LINE */}
            <div style={styles.footerAccentLine} />

            <div style={styles.footerInner}>
              {/* LEFT — VERSION */}
              <div style={styles.footerSection}>
                <div style={styles.versionBadge}>
                  <span style={styles.versionDot} />
                  <span style={styles.versionText}>
                    todo-collab&nbsp;
                    <span style={styles.versionNum}>v{packageJson.version}</span>
                  </span>
                </div>
              </div>

              {/* CENTER — MADE BY */}
              <div style={{ ...styles.footerSection, ...styles.footerCenter }}>
                <span style={styles.madeByText}>
                  CRAFTED BY&nbsp;<span style={styles.madeByName}>SJ</span>
                </span>
              </div>

              {/* RIGHT — SOCIAL LINKS */}
              <div style={{ ...styles.footerSection, ...styles.footerRight }}>
                <a
                  href="https://github.com/Satyam216"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                  className="hud-social-link"
                  title="GitHub"
                >
                  <FaGithub style={{ fontSize: 16 }} />
                  <span style={styles.socialLabel}>GITHUB</span>
                </a>
                <div style={styles.socialDivider} />
                <a
                  href="https://www.linkedin.com/in/satyam-jain-874b66143"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.socialLink, ...styles.socialLinkLinkedin }}
                  className="hud-social-link-li"
                  title="LinkedIn"
                >
                  <FaLinkedin style={{ fontSize: 16 }} />
                  <span style={styles.socialLabel}>LINKEDIN</span>
                </a>
              </div>
            </div>
          </footer>
        </div>

        <style>{globalStyles}</style>
      </body>
    </html>
  );
}

/* ─── TOKENS ──────────────────────────────────────────── */

const C = {
  cyan: '#00d4ff',
  cyanGlow: '#00d4ff55',
  green: '#00ff9d',
  bg: '#050d1a',
  surface: '#0a1628',
  border: '#0e2a44',
  borderBright: '#1a4a6e',
  textDim: '#4a7a9b',
  font: 'var(--font-orbitron), monospace',
  fontBody: 'var(--font-share-tech-mono), monospace',
};

/* ─── STYLES ──────────────────────────────────────────── */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: C.bg,
    fontFamily: C.fontBody,
  },
  main: {
    flex: 1,
  },

  /* FOOTER */
  footer: {
    position: 'relative',
    background: `${C.surface}ee`,
    borderTop: `1px solid ${C.borderBright}`,
    backdropFilter: 'blur(8px)',
    zIndex: 50,
  },
  footerAccentLine: {
    height: 1,
    background: `linear-gradient(90deg, transparent, ${C.cyan}55, ${C.green}55, transparent)`,
    animation: 'shimmer 3s ease-in-out infinite',
  },
  footerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    gap: 12,
    flexWrap: 'wrap' as const,
  },

  footerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  footerCenter: {
    justifyContent: 'center',
  },
  footerRight: {
    justifyContent: 'flex-end',
  },

  /* VERSION */
  versionBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    background: C.bg,
    border: `1px solid ${C.border}`,
    padding: '4px 12px',
    clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
  },
  versionDot: {
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: C.green,
    boxShadow: `0 0 6px ${C.green}`,
    animation: 'blink 1.5s ease-in-out infinite',
  },
  versionText: {
    fontSize: 9,
    letterSpacing: 2,
    color: C.textDim,
    fontFamily: C.font,
  },
  versionNum: {
    color: C.cyan,
    textShadow: `0 0 8px ${C.cyanGlow}`,
  },

  /* MADE BY */
  madeByText: {
    fontSize: 9,
    letterSpacing: 4,
    color: C.textDim,
    fontFamily: C.font,
  },
  madeByName: {
    color: C.cyan,
    textShadow: `0 0 10px ${C.cyanGlow}`,
    fontWeight: 700,
  },

  /* SOCIAL */
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: C.textDim,
    textDecoration: 'none',
    padding: '4px 10px',
    border: `1px solid ${C.border}`,
    transition: 'all 0.2s',
    clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)',
  },
  socialLinkLinkedin: {},
  socialLabel: {
    fontSize: 8,
    letterSpacing: 2,
    fontFamily: C.font,
  },
  socialDivider: {
    width: 1,
    height: 16,
    background: C.borderBright,
  },
};

/* ─── GLOBAL CSS ──────────────────────────────────────── */

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: #050d1a;
    color: #c8e6f5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: #00d4ff88; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .hud-social-link:hover {
    color: #00d4ff !important;
    border-color: #00d4ff !important;
    background: #00d4ff11;
    box-shadow: 0 0 12px #00d4ff22;
  }

  .hud-social-link-li:hover {
    color: #00ff9d !important;
    border-color: #00ff9d !important;
    background: #00ff9d11;
    box-shadow: 0 0 12px #00ff9d22;
  }

  @media (max-width: 480px) {
    .footer-inner {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;