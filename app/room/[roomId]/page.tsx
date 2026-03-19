"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import {
  addTask,
  getTasks,
  deleteTask,
  toggleTaskCompletion,
  editTask,
} from "@/utils/taskAction";
import { checkRoomExists } from "@/utils/roomActions";
import { Copy, Check, ArrowLeft, LogOut, Plus, Pencil, Trash2, CheckCircle, RotateCcw } from "lucide-react";

interface Task {
  id: string;
  task: string;
  completed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
}

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();

  const [clientRoomId, setClientRoomId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [roomValid, setRoomValid] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (roomId) setClientRoomId(roomId);
  }, [roomId]);

  useEffect(() => {
    if (!clientRoomId) return;
    const verifyRoom = async () => {
      const exists = await checkRoomExists(clientRoomId);
      if (!exists) {
        alert("Invalid Room ❌");
        router.push("/dashboard");
      } else {
        setRoomValid(true);
      }
    };
    verifyRoom();
  }, [clientRoomId, router]);

  useEffect(() => {
    if (!clientRoomId || !roomValid) return;
    const fetchTasks = async () => {
      setLoading(true);
      const data = await getTasks(clientRoomId);
      setTasks(data ?? []);
      setLoading(false);
    };
    fetchTasks();
  }, [clientRoomId, roomValid]);

  if (!clientRoomId || loading || !roomValid) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingInner}>
          <div style={styles.loadingBar} />
          <p style={styles.loadingText}>INITIALIZING ROOM PROTOCOL...</p>
        </div>
        <style>{loadingAnim}</style>
      </div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (date: any) => {
    if (!date) return "";
    const d =
    typeof date === "object" && date !== null && "toDate" in date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (date as any).toDate()
      : new Date(date as string);

  return d.toLocaleString();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleAddTask = async () => {
    if (!task.trim()) {
      setError("⚠ INPUT CANNOT BE EMPTY");
      return;
    }
    const newTask = await addTask(clientRoomId, task);
    if (newTask) setTasks((prev) => [...prev, newTask]);
    setTask("");
    setError("");
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(clientRoomId, id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await toggleTaskCompletion(clientRoomId, id, !completed);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditText(task.task);
  };

  const handleSaveEdit = async (id: string) => {
    await editTask(clientRoomId, id, editText);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, task: editText } : t))
    );
    setEditingTask(null);
    setEditText("");
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <main style={styles.main}>
      <style>{globalStyles}</style>

      {/* GRID BACKGROUND */}
      <div style={styles.gridBg} />
      <div style={styles.scanline} />

      {/* TOP BAR */}
      <div style={styles.topBar}>
        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/dashboard")}
          style={styles.backBtn}
          className="hud-btn-back"
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span style={styles.backBtnText}>BACK</span>
          <div style={styles.backBtnCornerTL} />
          <div style={styles.backBtnCornerBR} />
        </button>

        {/* ROOM ID BADGE */}
        <div style={styles.roomBadge}>
          <div style={styles.roomBadgeGlow} />
          <span style={styles.roomBadgeLabel}>ROOM ID</span>
          <span style={styles.roomBadgeId}>{clientRoomId}</span>
          <div style={styles.roomBadgeDot} />
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => signOut(auth).then(() => router.push("/"))}
          style={styles.logoutBtn}
          className="hud-btn-logout"
          title="Logout"
        >
          <LogOut size={16} />
          <span style={styles.logoutText}>LOGOUT</span>
        </button>
      </div>

      {/* MAIN PANEL */}
      <div style={styles.panel}>
        {/* PANEL CORNER ACCENTS */}
        <div style={{ ...styles.corner, ...styles.cornerTL }} />
        <div style={{ ...styles.corner, ...styles.cornerTR }} />
        <div style={{ ...styles.corner, ...styles.cornerBL }} />
        <div style={{ ...styles.corner, ...styles.cornerBR }} />

        {/* STATS ROW */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{tasks.length}</span>
            <span style={styles.statLabel}>TOTAL</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={{ ...styles.statNum, color: "#00ff9d" }}>{completedCount}</span>
            <span style={styles.statLabel}>DONE</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={{ ...styles.statNum, color: "#ff6b6b" }}>{tasks.length - completedCount}</span>
            <span style={styles.statLabel}>PENDING</span>
          </div>
        </div>

        {/* ADD TASK INPUT */}
        <div style={styles.inputRow}>
          <div style={styles.inputWrapper}>
            <div style={styles.inputAccent} />
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              placeholder="// ENTER NEW TASK..."
              style={styles.input}
              className="hud-input"
            />
          </div>
          <button onClick={handleAddTask} style={styles.addBtn} className="hud-add-btn">
            <Plus size={20} strokeWidth={2.5} />
            <span>ADD</span>
          </button>
        </div>

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        {/* TASK LIST */}
        <ul style={styles.taskList}>
          {tasks.length === 0 && (
            <li style={styles.emptyState}>
              <span style={styles.emptyIcon}>◈</span>
              <span>NO TASKS LOADED — SYSTEM IDLE</span>
            </li>
          )}

          {tasks.map((t, i) => (
            <li key={t.id} style={styles.taskItem} className="task-item">
              {/* LEFT PANEL TAG */}
              <div style={styles.taskTag}>
                <span style={styles.taskIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div style={styles.taskTagDots}>
                  <span style={{ ...styles.dot, background: t.completed ? "#00ff9d" : "#00d4ff" }} />
                  <span style={styles.dot} />
                  <span style={styles.dot} />
                </div>
              </div>

              {/* CONTENT */}
              <div style={styles.taskContent}>
                {editingTask === t.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={styles.editInput}
                    className="hud-input"
                    autoFocus
                  />
                ) : (
                  <span
                    style={{
                      ...styles.taskText,
                      ...(t.completed ? styles.taskTextDone : {}),
                    }}
                  >
                    {t.task}
                  </span>
                )}
                {t.createdAt && (
                  <span style={styles.taskDate}>{formatDate(t.createdAt)}</span>
                )}
              </div>

              {/* ACTIONS */}
              <div style={styles.taskActions}>
                <button
                  onClick={() => handleCopy(t.task, t.id)}
                  style={styles.actionBtn}
                  className="hud-icon-btn"
                  title="Copy"
                >
                  {copiedId === t.id ? <Check size={15} color="#00ff9d" /> : <Copy size={15} />}
                </button>

                {editingTask === t.id ? (
                  <button onClick={() => handleSaveEdit(t.id)} style={{ ...styles.actionBtn, ...styles.actionSave }} className="hud-icon-btn">
                    <Check size={15} />
                    <span style={styles.actionLabel}>SAVE</span>
                  </button>
                ) : (
                  <button onClick={() => handleEditTask(t)} style={{ ...styles.actionBtn, ...styles.actionEdit }} className="hud-icon-btn" title="Edit">
                    <Pencil size={15} />
                  </button>
                )}

                <button
                  onClick={() => handleToggleComplete(t.id, t.completed)}
                  style={{ ...styles.actionBtn, ...(t.completed ? styles.actionUndo : styles.actionDone) }}
                  className="hud-icon-btn"
                  title={t.completed ? "Undo" : "Done"}
                >
                  {t.completed ? <RotateCcw size={15} /> : <CheckCircle size={15} />}
                </button>

                <button
                  onClick={() => handleDeleteTask(t.id)}
                  style={{ ...styles.actionBtn, ...styles.actionDelete }}
                  className="hud-icon-btn"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* CORNER CUTS */}
              <div style={styles.taskCornerTR} />
              <div style={styles.taskCornerBL} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

/* ─── STYLES ─────────────────────────────────────────── */

const C = {
  cyan: "#00d4ff",
  cyanDim: "#00d4ff33",
  cyanGlow: "#00d4ff88",
  green: "#00ff9d",
  red: "#ff4d6d",
  amber: "#ffb830",
  bg: "#050d1a",
  surface: "#0a1628",
  surfaceAlt: "#0d1e35",
  border: "#0e2a44",
  borderBright: "#1a4a6e",
  text: "#c8e6f5",
  textDim: "#4a7a9b",
  font: "'Orbitron', 'Share Tech Mono', monospace",
  fontBody: "'Share Tech Mono', 'Courier New', monospace",
};

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: C.bg,
    fontFamily: C.fontBody,
    position: "relative",
    overflow: "hidden",
    padding: "0 0 60px",
    color: C.text,
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
    opacity: 0.4,
    pointerEvents: "none",
    zIndex: 0,
  },
  scanline: {
    position: "fixed",
    inset: 0,
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)",
    pointerEvents: "none",
    zIndex: 1,
  },
  loadingScreen: {
    minHeight: "100vh",
    background: C.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: C.font,
  },
  loadingInner: { textAlign: "center" as const },
  loadingBar: {
    width: 200,
    height: 2,
    background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
    margin: "0 auto 16px",
    animation: "scanPulse 1.2s ease-in-out infinite",
  },
  loadingText: { color: C.cyan, fontSize: 13, letterSpacing: 4, opacity: 0.8 },

  topBar: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px 0",
    flexWrap: "wrap" as const,
    gap: 12,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: `1px solid ${C.cyan}`,
    color: C.cyan,
    padding: "9px 18px",
    cursor: "pointer",
    fontFamily: C.font,
    fontSize: 12,
    letterSpacing: 3,
    position: "relative",
    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
    transition: "all 0.2s",
  },
  backBtnText: { fontSize: 11, letterSpacing: 3 },
  backBtnCornerTL: {
    position: "absolute",
    top: -1,
    left: -1,
    width: 8,
    height: 8,
    borderTop: `2px solid ${C.cyan}`,
    borderLeft: `2px solid ${C.cyan}`,
  },
  backBtnCornerBR: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 8,
    height: 8,
    borderBottom: `2px solid ${C.cyan}`,
    borderRight: `2px solid ${C.cyan}`,
  },
  roomBadge: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: C.surfaceAlt,
    border: `1px solid ${C.borderBright}`,
    padding: "8px 20px",
    position: "relative",
    clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
    flex: 1,
    justifyContent: "center",
    maxWidth: 420,
    margin: "0 auto",
  },
  roomBadgeGlow: {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(90deg, transparent, ${C.cyanDim}, transparent)`,
    pointerEvents: "none",
  },
  roomBadgeLabel: {
    fontSize: 10,
    letterSpacing: 4,
    color: C.textDim,
    fontFamily: C.font,
  },
  roomBadgeId: {
    fontSize: 15,
    fontFamily: C.font,
    color: C.cyan,
    letterSpacing: 2,
    textShadow: `0 0 12px ${C.cyanGlow}`,
    wordBreak: "break-all" as const,
  },
  roomBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: C.green,
    boxShadow: `0 0 8px ${C.green}`,
    animation: "blink 1.5s ease-in-out infinite",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: `1px solid ${C.red}`,
    color: C.red,
    padding: "9px 18px",
    cursor: "pointer",
    fontFamily: C.font,
    fontSize: 11,
    letterSpacing: 3,
    clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)",
    transition: "all 0.2s",
  },
  logoutText: { fontSize: 11, letterSpacing: 2 },

  panel: {
    position: "relative",
    zIndex: 5,
    maxWidth: 780,
    margin: "28px auto 0",
    background: `linear-gradient(160deg, ${C.surface}, ${C.surfaceAlt})`,
    border: `1px solid ${C.borderBright}`,
    padding: "32px 28px",
    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
  },
  corner: {
    position: "absolute",
    width: 16,
    height: 16,
  },
  cornerTL: { top: -1, left: -1, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}` },
  cornerTR: { top: -1, right: -1, borderTop: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}` },
  cornerBL: { bottom: -1, left: -1, borderBottom: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}` },
  cornerBR: { bottom: -1, right: -1, borderBottom: `2px solid ${C.cyan}`, borderRight: `2px solid ${C.cyan}` },

  statsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    marginBottom: 28,
    background: C.bg,
    border: `1px solid ${C.border}`,
    padding: "14px 0",
  },
  statBox: { display: "flex", flexDirection: "column" as const, alignItems: "center", flex: 1, gap: 4 },
  statNum: { fontFamily: C.font, fontSize: 24, color: C.cyan, textShadow: `0 0 10px ${C.cyanGlow}`, lineHeight: 1 },
  statLabel: { fontSize: 10, letterSpacing: 3, color: C.textDim },
  statDivider: { width: 1, height: 40, background: C.borderBright },

  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 8,
    flexWrap: "wrap" as const,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    minWidth: 200,
  },
  inputAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: `linear-gradient(180deg, ${C.cyan}, transparent)`,
  },
  input: {
    width: "100%",
    background: C.bg,
    border: `1px solid ${C.borderBright}`,
    borderLeft: "none",
    color: C.text,
    fontFamily: C.fontBody,
    fontSize: 14,
    padding: "13px 16px 13px 20px",
    outline: "none",
    letterSpacing: 1,
    boxSizing: "border-box" as const,
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: `linear-gradient(135deg, ${C.cyan}22, ${C.cyan}44)`,
    border: `1px solid ${C.cyan}`,
    color: C.cyan,
    padding: "13px 22px",
    cursor: "pointer",
    fontFamily: C.font,
    fontSize: 12,
    letterSpacing: 2,
    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
    whiteSpace: "nowrap" as const,
    transition: "all 0.2s",
  },
  error: {
    color: C.red,
    fontFamily: C.fontBody,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 12,
    paddingLeft: 4,
  },

  taskList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 10 },
  emptyState: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 12,
    padding: "48px 0",
    color: C.textDim,
    fontSize: 13,
    letterSpacing: 3,
  },
  emptyIcon: { fontSize: 32, color: C.borderBright },

  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    background: C.bg,
    border: `1px solid ${C.borderBright}`,
    position: "relative",
    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
    transition: "border-color 0.2s",
    overflow: "hidden",
  },
  taskTag: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "14px 14px",
    background: C.surfaceAlt,
    borderRight: `1px solid ${C.borderBright}`,
    minWidth: 52,
    alignSelf: "stretch" as const,
  },
  taskIndex: { fontFamily: C.font, fontSize: 11, color: C.cyan, letterSpacing: 1 },
  taskTagDots: { display: "flex", flexDirection: "column" as const, gap: 3 },
  dot: { display: "block", width: 4, height: 4, borderRadius: "50%", background: C.borderBright },

  taskContent: {
    flex: 1,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
    minWidth: 0,
  },
  taskText: {
    fontFamily: C.fontBody,
    fontSize: 14,
    color: C.text,
    letterSpacing: 0.5,
    wordBreak: "break-word" as const,
  },
  taskTextDone: {
    textDecoration: "line-through",
    color: C.textDim,
    opacity: 0.7,
  },
  taskDate: { fontSize: 10, color: C.textDim, letterSpacing: 1 },

  editInput: {
    background: C.surfaceAlt,
    border: `1px solid ${C.cyan}`,
    color: C.text,
    fontFamily: C.fontBody,
    fontSize: 14,
    padding: "6px 10px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  },

  taskActions: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "8px 12px",
    flexShrink: 0,
    flexWrap: "wrap" as const,
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: "transparent",
    border: `1px solid ${C.borderBright}`,
    color: C.textDim,
    padding: "7px 10px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: 11,
    fontFamily: C.font,
    letterSpacing: 1,
  },
  actionLabel: { fontSize: 10, letterSpacing: 1 },
  actionSave: { borderColor: C.green, color: C.green },
  actionEdit: { borderColor: C.amber, color: C.amber },
  actionDone: { borderColor: C.green, color: C.green },
  actionUndo: { borderColor: C.textDim, color: C.textDim },
  actionDelete: { borderColor: C.red, color: C.red },

  taskCornerTR: {
    position: "absolute",
    top: -1,
    right: -1,
    width: 10,
    height: 10,
    borderTop: `2px solid ${C.cyan}`,
    borderRight: `2px solid ${C.cyan}`,
  },
  taskCornerBL: {
    position: "absolute",
    bottom: -1,
    left: -1,
    width: 10,
    height: 10,
    borderBottom: `2px solid ${C.cyan}`,
    borderLeft: `2px solid ${C.cyan}`,
  },
};

const loadingAnim = `
  @keyframes scanPulse {
    0%, 100% { opacity: 0.3; transform: scaleX(0.6); }
    50% { opacity: 1; transform: scaleX(1); }
  }
`;

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .hud-input::placeholder { color: #4a7a9b; letter-spacing: 2px; }
  .hud-input:focus { border-color: #00d4ff !important; box-shadow: 0 0 0 1px #00d4ff33; }

  .hud-btn-back:hover { background: #00d4ff22 !important; box-shadow: 0 0 16px #00d4ff33; }
  .hud-btn-logout:hover { background: #ff4d6d22 !important; box-shadow: 0 0 16px #ff4d6d33; }
  .hud-add-btn:hover { background: linear-gradient(135deg, #00d4ff33, #00d4ff66) !important; box-shadow: 0 0 20px #00d4ff44; }

  .task-item:hover { border-color: #1a4a6e !important; }
  .hud-icon-btn:hover { background: #0d1e35 !important; }

  @media (max-width: 600px) {
    .task-item { flex-wrap: wrap; }
  }
`;