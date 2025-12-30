'use client'

import { FaWhatsapp, FaEnvelope, FaLink } from 'react-icons/fa'

export default function ShareButtons({ shareUrl }: { shareUrl: string }) {
  return (
    <div className="flex gap-4 pt-4">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-green-600"
      >
        <FaWhatsapp />
        WhatsApp
      </a>

      <a
        href={`mailto:?subject=Shared Paste&body=${encodeURIComponent(
          shareUrl
        )}`}
        className="flex items-center gap-2 text-red-600"
      >
        <FaEnvelope />
        Gmail
      </a>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl)
          alert('Link copied to clipboard')
        }}
        className="flex items-center gap-2 text-blue-600"
      >
        <FaLink />
        Copy Link
      </button>
    </div>
  )
}
