'use client'
import React, { useState } from 'react'

export default function Homepage() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleShorten = async () => {
    if (!originalUrl) return
    setLoading(true)
    setCopied(false)
    setError('')

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: originalUrl })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Shorten failed')
      setShortUrl(`${window.location.origin}/shorten/${data.shortCode}`)
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setShortUrl('')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
  if (!shortUrl) return; // make sure there is text to copy

  try {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-300 p-8">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">🌈 Shorten Your URL</h1>
        <input
          type="url"
          placeholder="Enter your URL here"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/70 mb-4"
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl mb-4"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
        {error && <p className="text-red-500">{error}</p>}

        {shortUrl && (
  <div className="mt-4 p-4 bg-white/20 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center">
    <span className="text-white break-all mb-2 sm:mb-0">{shortUrl}</span>
    <button 
      onClick={handleCopy} 
      className="px-4 py-2 bg-indigo-500 rounded-xl text-white w-full sm:w-auto"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  </div>
)}

      </div>
    </div>
  )
}
