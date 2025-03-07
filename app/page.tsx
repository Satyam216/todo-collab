// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-6 drop-shadow-lg text-center"
      >
        Welcome to <span className="bg-white text-transparent bg-clip-text">Todo Collab</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl mb-8 max-w-lg text-center leading-relaxed"
      >
        Empower your team with real-time collaboration on tasks. Stay organized, stay productive.
      </motion.p>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={handleLogin} 
        className="bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white font-bold py-3 px-10 rounded-full shadow-xl transform hover:scale-105 transition-all"
      >
        Get Start
      </motion.button>
    </main>
  );
}
