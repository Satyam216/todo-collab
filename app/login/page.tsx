// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export default function Login() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard/'); // Redirect to a sample room or dashboard
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Login to Todo Collab</h1>
      <button 
        onClick={handleGoogleSignIn} 
        className="bg-white text-blue-600 hover:bg-blue-700 hover:text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
      >
        Sign in with Google
      </button>
    </main>
  );
}
