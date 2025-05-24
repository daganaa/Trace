import React from 'react'

function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Trace
          </h1>
          <p className="text-gray-600 mb-8">
            Your personal journaling companion powered by AI
          </p>
          <button
            onClick={onGetStarted}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage