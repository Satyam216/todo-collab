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

export default function RoomPage() {
  const { roomId } = useParams();
  const router = useRouter();
  const [clientRoomId, setClientRoomId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (roomId) {
      setClientRoomId(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (!clientRoomId) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks(clientRoomId);
        setTasks(data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [clientRoomId]);

  if (!clientRoomId || loading) {
    return <p className="text-center mt-10 text-xl font-semibold text-blue-500 animate-pulse">Loading...</p>;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleAddTask = async () => {
    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      const newTask = await addTask(clientRoomId, task);
      if (newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      setTask("");
      setError("");
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(clientRoomId, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleToggleComplete = async (taskId: string, isCompleted: boolean) => {
    try {
      await toggleTaskCompletion(clientRoomId, taskId, !isCompleted);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !isCompleted } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task.id);
    setEditText(task.task);
  };

  const handleSaveEdit = async (taskId: string) => {
    if (!editText.trim()) return;

    try {
      await editTask(clientRoomId, taskId, editText);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, task: editText } : task
        )
      );
      setEditingTask(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to edit task:", err);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Beautiful Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 bg-white text-blue-600 px-6 py-2 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
      >
        <span>Sign Out</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Main Container */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">Room: {clientRoomId}</h1>

        {/* Add Task Section */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 border border-blue-200 rounded-lg shadow-md transition-all ${
                task.completed ? "bg-green-50" : "bg-white"
              }`}
            >
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow p-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <span
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-500" : "text-blue-900"
                  }`}
                >
                  {task.task}
                </span>
              )}
              <div className="flex space-x-2">
                {editingTask === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 shadow-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 shadow-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleToggleComplete(task.id, task.completed)}
                  className={`px-3 py-2 rounded-lg text-white ${
                    task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                  } shadow-md`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 shadow-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}