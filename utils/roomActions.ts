import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// CREATE ROOM
export const createRoom = async (roomId: string, roomName: string) => {
  const roomRef = doc(db, 'rooms', roomId);

  const roomSnap = await getDoc(roomRef);

  if (roomSnap.exists()) {
    throw new Error('Room already exists');
  }

  await setDoc(roomRef, {
    name: roomName,
    createdAt: new Date(),
  });

  return roomId;
};

// CHECK ROOM EXISTS
export const checkRoomExists = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);
  return roomSnap.exists();
};