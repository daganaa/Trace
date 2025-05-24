import { useState, useEffect } from 'react'
import { listCalls } from './listCalls'

export default function Journal({ onBackToAccount, onViewCall }) {
  const [calls, setCalls] = useState([])
  const [callsLoading, setCallsLoading] = useState(false)

  useEffect(() => {
    // Load calls automatically when Journal component mounts
    async function loadCalls() {
      setCallsLoading(true)
      try {
        const callsData = await listCalls()
        setCalls(callsData)
        console.log('Calls loaded in Journal:', callsData)
      } catch (error) {
        console.error('Error loading calls in Journal:', error)
      } finally {
        setCallsLoading(false)
      }
    }

    loadCalls()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 justify-right">
        <button
          onClick={onBackToAccount}
          className="items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          ← Back to Account
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Call Journal</h2>
        <h3 className="text-lg font-semibold mb-4">Call History</h3>
        {callsLoading ? (
          <p>Loading calls...</p>
        ) : calls.length > 0 ? (
          <div className="space-y-4">
            {calls.map((call) => (
              <div key={call.call_id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium">{(() => {
                      const startTime = call.formatted_start_time;
                      if (!startTime || startTime === 'N/A') return 'N/A';
                      
                      // Remove seconds from the time string
                      // This handles formats like "12:34:56 PM" -> "12:34 PM" or "2024-01-01 12:34:56" -> "2024-01-01 12:34"
                      return startTime.replace(/(:\d{2})(\s*[AP]M)?$/i, '$2');
                    })()}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => onViewCall(call)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No calls found.</p>
        )}
      </div>
    </div>
  )
}