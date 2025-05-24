import React, { useState } from 'react'
import { supabase } from './supabaseClient'

export default function CallTimeInput({ onBackToAccount }) {
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(0)
  const [ampm, setAmpm] = useState('AM')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleGoBack = () => {
    if (onBackToAccount) {
      onBackToAccount()
    } else {
      window.history.back()
    }
  }

  const convertToTimestamp = () => {
    // Get tomorrow's date in local timezone
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    // Convert 12-hour to 24-hour format for proper time setting
    let hour24 = hours
    if (ampm === 'PM' && hours !== 12) {
      hour24 = hours + 12
    } else if (ampm === 'AM' && hours === 12) {
      hour24 = 0
    }
    
    // Create a new date object for tomorrow with the selected time
    const scheduledDate = new Date(tomorrow)
    scheduledDate.setHours(hour24, minutes, 0, 0)
    
    // Get timezone offset and adjust to prevent UTC conversion
    const timezoneOffset = scheduledDate.getTimezoneOffset() * 60000
    const localTime = new Date(scheduledDate.getTime() - timezoneOffset)
    
    return localTime.toISOString()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
    
    try {
      // Get the current user first
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error('You must be logged in to schedule a call')
      }
      
      // Use the convertToTimestamp function to get the proper scheduled time
      const scheduledTime = convertToTimestamp(hours, minutes, ampm)
      
      // Save call time to your existing call_schedules table
      const { data, error } = await supabase
        .from('call_schedules')
        .insert([
          {
            user_id: user.id,
            scheduled_time: scheduledTime,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: 'pending',
          }
        ])
      
      if (error) {
        throw error
      }
      
      setSubmitMessage(`Call time ${timeString} scheduled successfully!`)
      console.log('Call scheduled:', data)
      
    } catch (error) {
      console.error('Error scheduling call:', error)
      setSubmitMessage(`Error scheduling call: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative">
      {/* Back Button - Top Left */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        type="button"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Schedule Your Call
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please select your preferred call time:
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 mb-1 text-center">
                Hour
              </label>
              <select 
                value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                disabled={isSubmitting}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <span className="text-2xl font-bold text-gray-400 mt-6">:</span>
            
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 mb-1 text-center">
                Minute
              </label>
              <select 
                value={minutes} 
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                className="px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                disabled={isSubmitting}
              >
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </div>
            
            {/* AM/PM */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 mb-1 text-center">
                Period
              </label>
              <select 
                value={ampm} 
                onChange={(e) => setAmpm(e.target.value)}
                className="px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                disabled={isSubmitting}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center border-2 ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed border-gray-400' 
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Schedule Call'}
            </button>
          
          </div>
        </form>
        
        {submitMessage && (
          <div className={`mt-4 p-4 rounded-md text-sm text-center ${
            submitMessage.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  )
}
