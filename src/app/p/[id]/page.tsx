import { notFound } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

function escapeHtml(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

export default async function PasteViewPage({
    params,
}: {
    params: { id: string }
}) {
    const res = await fetch(`${API_BASE}/api/pastes/${params.id}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        notFound()
    }

    const data = await res.json()

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-xl font-bold">Paste</h1>

            <pre className="whitespace-pre-wrap border p-4 bg-gray-50">
                {escapeHtml(data.content)}
            </pre>

            <div className="text-sm text-gray-600">
                {data.remaining_views !== null && (
                    <p>Remaining views: {data.remaining_views}</p>
                )}
                {data.expires_at && (
                    <p>Expires at: {new Date(data.expires_at).toLocaleString()}</p>
                )}
            </div>
        </main>
    )
}
