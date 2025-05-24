import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function CallTimeInput() {
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(0)
  const [ampm, setAmpm] = useState('AM')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
    
    try {
      // Save call time to Supabase
      const { data, error } = await supabase
        .from('call_times') // Replace with your actual table name
        .insert([
          {
            hours: hours,
            minutes: minutes,
            ampm: ampm,
            time_string: timeString,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            created_at: new Date().toISOString()
          }
        ])
      
      if (error) {
        throw error
      }
      
      setSubmitMessage(`Call time ${timeString} saved successfully!`)
      console.log('Call time saved:', data)
      
      // Optional: Reset form or redirect user
      // resetForm() or navigate to next step
      
    } catch (error) {
      console.error('Error saving call time:', error)
      setSubmitMessage(`Error saving call time: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setHours(12)
    setMinutes(0)
    setAmpm('AM')
    setSubmitMessage('')
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Schedule Your Call
      </h2>
      
      <p className="text-gray-600 mb-6 text-center">
        Please select your preferred call time:
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Hour
            </label>
            <select 
              value={hours} 
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <label className="text-sm font-medium text-gray-700 mb-1">
              Minute
            </label>
            <select 
              value={minutes} 
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              {[...Array(60)].map((_, i) => (
                <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          
          {/* AM/PM */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <select 
              value={ampm} 
              onChange={(e) => setAmpm(e.target.value)}
              className="px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Schedule Call'}
          </button>
          
          <button 
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
            className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </form>
      
      {submitMessage && (
        <div className={`mt-4 p-4 rounded-md text-sm ${
          submitMessage.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {submitMessage}
        </div>
      )}
    </div>
  )
}