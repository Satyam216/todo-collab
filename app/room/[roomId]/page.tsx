"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase"; // Ensure correct path to your firebase config
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
    if (typeof window === "undefined") return; // Ensure only runs on client
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
    return <p className="text-center mt-10">Loading...</p>;
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
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Sign Out
      </button>

      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Room: {clientRoomId}</h1>

        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 border rounded-lg shadow-sm ${
                task.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow p-2 border rounded-lg"
                />
              ) : (
                <span
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.task}
                </span>
              )}
              <div className="flex space-x-2">
                {editingTask === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleToggleComplete(task.id, task.completed)}
                  className={`px-3 py-2 rounded-lg text-white ${
                    task.completed ? "bg-yellow-500" : "bg-green-600"
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg"
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
