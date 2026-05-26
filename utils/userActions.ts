import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const recordUserAgreement = async (uid: string, email: string | null, displayName: string | null) => {
  if (!uid) {
    throw new Error('User UID is required');
  }

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      email,
      displayName,
      agreedToTerms: true,
      agreedAt: new Date(),
    }, { merge: true });
    console.log('User agreement recorded in Firestore successfully');
  } catch (error) {
    console.error('Error recording user agreement:', error);
    throw error;
  }
};
