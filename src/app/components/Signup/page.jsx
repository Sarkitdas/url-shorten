'use client'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // ✅ Loading state

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Start loading

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok && data.status) {
        toast.success('Signup successful!')
        window.location.href = '/components/Login'
      } else {
        toast.error(data.message || 'Signup failed')
      }
    } catch {
      toast.error('Server error')
    } finally {
      setLoading(false) // Stop loading
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-8 sm:p-10 transition-all duration-300"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-8">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition-all duration-300 shadow-lg flex justify-center items-center gap-2`}
          disabled={loading} // Disable while signing up
        >
          {loading ? (
            <>
              {/* Spinner */}
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Signing up...
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6">
          Already have an account?{' '}
          <Link
            href="/components/Login"
            className="font-semibold underline underline-offset-4 hover:text-indigo-200 transition"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
