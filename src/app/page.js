'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleTryNow = async () => {
    await fetch('/api/auth', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          router.push('/components/Homepage');
        } else {
          router.push('/components/Login');
        }
      })
      .catch(() => {
        router.push('/components/Login');
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Create Your Shortened URLs
        </h1>

        <p className="text-white/90 mb-8">
          Quickly generate short, easy-to-share links for your websites, blogs, and more.
        </p>

        <button
          onClick={handleTryNow}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-130"
        >
          Try Now
        </button>
      </div>
    </div>
  );
}
