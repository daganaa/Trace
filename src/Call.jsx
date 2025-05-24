import React from 'react'

export default function Call({ callData, onBackToJournal }) {
  if (!callData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={onBackToJournal}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back to Journal
          </button>
        </div>
        <div className="text-center">
          <p className="text-red-600">No call data provided</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBackToJournal}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          ← Back to Journal
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Call Details</h1>
          <p className="text-gray-600">Call ID: {callData?.call_id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Call Information</h3>
              <div className="mt-2 space-y-2">
                <p><strong>Start Time:</strong> {(() => {
                  const startTime = callData?.formatted_start_time || callData?.start_timestamp;
                  if (!startTime || startTime === 'N/A') return 'N/A';
                  
                  // Remove seconds from the time string
                  // This handles formats like "12:34:56 PM" -> "12:34 PM" or "2024-01-01 12:34:56" -> "2024-01-01 12:34"
                  return startTime.replace(/(:\d{2})(\s*[AP]M)?$/i, '$2');
                })()}</p>
                <p><strong>Duration:</strong> {callData?.formatted_duration || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Call Summary</h3>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900">
                  {callData?.call_summary || 'No summary available'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Full Transcript</h3>
            <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
              {callData?.transcript ? (
                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                  {callData.transcript}
                </div>
              ) : (
                <p className="text-gray-500 italic">No transcript available</p>
              )}
            </div>
          </div>
        </div>

        {callData?.recording_url && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Recording</h3>
            <audio controls className="w-full">
              <source src={callData.recording_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  )
}