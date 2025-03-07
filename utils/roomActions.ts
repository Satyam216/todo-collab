import { db } from '@/utils/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const createRoom = async (roomId: any, roomName: any) => {
  try {
    const roomRef = doc(db, 'rooms', roomId); // custom room ID
    await setDoc(roomRef, {
      roomName,
      createdAt: serverTimestamp(),
    });
    console.log('Room created with custom ID:', roomId);
    return roomId;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};
