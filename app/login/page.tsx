// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { FcGoogle } from 'react-icons/fc';

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
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
          Welcome to Todo Collab
        </h1>
        <p className="text-gray-500 mb-8">Collaborate, Manage, and Achieve Your Goals</p>
        <button 
          onClick={handleGoogleSignIn} 
          className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
        <div className="mt-6 text-sm text-gray-400">
          By signing in, you agree to our <span className="text-green-500 cursor-pointer hover:underline">Terms & Conditions</span>.
        </div>
      </div>
    </main>
  );
}
