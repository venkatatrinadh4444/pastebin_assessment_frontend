'use client'

import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

export default function CreatePastePage() {
  const [content, setContent] = useState('')
  const [ttl, setTtl] = useState('')
  const [maxViews, setMaxViews] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!content.trim()) {
      setError('Content is required')
      return
    }

    setLoading(true)


    try {
      const res = await fetch(`${API_BASE}/api/pastes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: maxViews ? Number(maxViews) : undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.message || 'Failed to create paste')
      }

      const data = await res.json()
      window.location.href = data.url
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Paste</h1>

      <textarea
        className="w-full border p-2 h-40 rounded-lg border-gray-200 shadow-sm"
        placeholder="Enter text..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-4">
        <input
          type="number"
          placeholder="TTL (seconds)"
          className="border p-2 w-full rounded-lg border-gray-200 shadow-sm"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
          min={1}
        />
        <input
          type="number"
          placeholder="Max views"
          className="border p-2 w-full rounded-lg border-gray-200 shadow-sm"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
          min={1}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Creating...' : 'Create Paste'}
      </button>
    </main>
  )
}
