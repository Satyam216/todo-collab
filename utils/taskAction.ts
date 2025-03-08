import { db } from '@/utils/firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

type Task = {
  id: string;
  task: string;
  completed: boolean;
  createdAt?: any; // Firestore timestamp ko handle karne ke liye
};

// Add a new task
export const addTask = async (roomId: string, task: string) => {
  if (!roomId || !task.trim()) {
    throw new Error('Room ID and task are required');
  }

  try {
    const tasksRef = collection(doc(db, 'rooms', roomId), 'tasks');
    const newTask = await addDoc(tasksRef, {
      task,
      completed: false,
      createdAt: serverTimestamp(),
    });
    return { id: newTask.id, task, completed: false };
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Get all tasks for a room
export const getTasks = async (roomId: string): Promise<Task[] | null> => {
  if (!roomId) {
    throw new Error('Room ID is required');
  }

  try {
    const tasksRef = collection(doc(db, 'rooms', roomId), 'tasks');
    const snapshot = await getDocs(tasksRef);
    return snapshot.docs.map((doc) => { 
      const data = doc.data();
      return {
      id: doc.id,
      task: data.task || '', // Default empty string
      completed: data.completed ?? false, // Default false
      createdAt: data.createdAt || null,
    }; });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return null ;
  }
};

// Edit an existing task
export const editTask = async (roomId: string, taskId: string, updatedTask: string) => {
  if (!roomId || !taskId || !updatedTask.trim()) {
    throw new Error('Room ID, task ID, and updated task are required');
  }

  try {
    const taskRef = doc(db, 'rooms', roomId, 'tasks', taskId);
    await updateDoc(taskRef, {
      task: updatedTask,
    });
    console.log('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Mark task as complete/incomplete
export const toggleTaskCompletion = async (roomId: string, taskId: string, isCompleted: boolean) => {
  if (!roomId || !taskId) {
    throw new Error('Room ID and task ID are required');
  }

  try {
    const taskRef = doc(db, 'rooms', roomId, 'tasks', taskId);
    await updateDoc(taskRef, {
      completed: isCompleted,
    });
    console.log('Task status updated successfully');
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (roomId: string, taskId: string) => {
  if (!roomId || !taskId) {
    throw new Error('Room ID and task ID are required');
  }

  try {
    const taskRef = doc(db, 'rooms', roomId, 'tasks', taskId);
    await deleteDoc(taskRef);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
