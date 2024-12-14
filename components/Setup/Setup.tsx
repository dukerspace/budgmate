import { useState } from 'react'

const SetUp = () => {
  const [dbUrl, setDbUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbUrl })
      })

      if (!response.ok) throw new Error('Failed to save configuration.')
      setSuccess(true)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-semibold mb-4">Initial Setup</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Configuration saved successfully!</p>}

        <label className="block mb-2">
          Database URL
          <input
            type="text"
            value={dbUrl}
            onChange={(e) => setDbUrl(e.target.value)}
            placeholder="postgresql://user:password@localhost:5432/mydb"
            className="input input-bordered w-full mt-1"
            required
          />
        </label>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Save Configuration
        </button>
      </form>
    </div>
  )
}

export default SetUp
