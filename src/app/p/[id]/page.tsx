import { notFound } from 'next/navigation'
import { FaWhatsapp, FaEnvelope, FaLink } from 'react-icons/fa'
import ShareButtons from './ShareButtons'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

function escapeHtml(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

function formatDateTimeWithSeconds(iso: string) {
    const d = new Date(iso)
    return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    })
}

export default async function PasteViewPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const res = await fetch(`${API_BASE}/api/pastes/${id}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        notFound()
    }

    const data = await res.json()
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/p/${id}`

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-xl font-bold">Paste</h1>

            <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-200 shadow-sm">
                {escapeHtml(data.content)}
            </pre>

            <div className="text-sm text-gray-600 space-y-1">
                {data.remaining_views !== null && (
                    <p>Remaining views: {data.remaining_views}</p>
                )}
                {data.expires_at && (
                    <p>
                        Expires at:{' '}
                        <strong>
                            {formatDateTimeWithSeconds(data.expires_at)}
                        </strong>
                    </p>
                )}
            </div>

            {/* Client-side interactivity */}
            <ShareButtons shareUrl={shareUrl} />
        </main>
    )
}
