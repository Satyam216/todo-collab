// app/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { createRoom } from '@/utils/roomActions';
import ProtectedRoute from '../protectedRoutes/ProtectedRoute';

export default function Dashboard() {
  const [roomId, setRoomId] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [customRoomId, setCustomRoomId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Join existing room
  const handleJoinRoom = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  // Create new room with custom ID
  const handleCreateRoom = async () => {
    setError('');
    if (!customRoomId.trim()) {
      setError('Room ID cannot be empty');
      return;
    }
    try {
      const id = await createRoom(customRoomId, newRoomName || 'Untitled Room');
      router.push(`/room/${id}`);
    } catch (err) {
      setError('Room ID already exists. Please choose another.');
      console.error('Error creating room:', err);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to Your Dashboard</h1>

          {/* Join Room */}
          <p className="text-center text-gray-600 mb-4">Join an existing room:</p>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleJoinRoom}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mb-8"
          >
            Join Room
          </button>

          {/* Create Room */}
          <p className="text-center text-gray-600 mb-4">Create a new room:</p>
          <input
            type="text"
            placeholder="Enter Room Name (optional)"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Enter Custom Room ID"
            value={customRoomId}
            onChange={(e) => setCustomRoomId(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-green-400"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleCreateRoom}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition mb-8"
          >
            Create Room
          </button>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </main>
    </ProtectedRoute>
  );
}
