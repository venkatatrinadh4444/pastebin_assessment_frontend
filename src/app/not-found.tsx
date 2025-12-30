export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-bold">Paste unavailable</h1>
        <p className="text-gray-600">
          This paste may have expired, reached its view limit,
          or does not exist.
        </p>
        <a
          href="/"
          className="inline-block mt-4 text-blue-600 underline"
        >
          Create a new paste
        </a>
      </div>
    </main>
  )
}
