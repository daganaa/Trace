import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { makeCall } from './makeCall'
import { getCall } from './getCall'
import { listCalls } from './listCalls'

export default function Account({ session, onGoToEmptyPage, onGoToJournal }) {
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [email, setEmail] = useState(null)
  const [createdAt, setCreatedAt] = useState(null)
  const [calls, setCalls] = useState([])
  const [callsLoading, setCallsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState('9:00 AM')
  const [reflectionText, setReflectionText] = useState('')
  const [reflections, setReflections] = useState([
    {
      id: 1,
      date: 'Wednesday, May 22, 2024',
      text: 'Today brought unexpected clarity about my writing process. The morning pages...',
      number: '04'
    },
    {
      id: 2,
      date: 'Tuesday, May 21, 2024',
      text: 'Reflection on the changing seasons and how they mirror internal growth...',
      number: '03'
    },
    {
      id: 3,
      date: 'Monday, May 20, 2024',
      text: 'A conversation with an old friend sparked new insights about creativity and...',
      number: '02'
    },
    {
      id: 4,
      date: 'Sunday, May 19, 2024',
      text: 'The garden is blooming beautifully this spring. There is something profound...',
      number: '01'
    }
  ])

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      if (!session?.user) {
        setLoading(false)
        return
      }

      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`first_name, last_name, phone_number, email, created_at`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setFirstName(data.first_name)
          setLastName(data.last_name)
          setPhoneNumber(data.phone_number)
          setEmail(data.email)
          setCreatedAt(data.created_at)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleSaveTime = () => {
    // Save the selected time logic here
    console.log('Saving time:', selectedTime)
  }

  const handleSaveReflection = () => {
    if (reflectionText.trim()) {
      // Save reflection logic here
      console.log('Saving reflection:', reflectionText)
      setReflectionText('')
    }
  }

  if (!session?.user || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-500 font-light">Loading your account...</p>
        </div>
      </div>
    )
  }

  const displayName = firstName && lastName ? `${firstName} ${lastName}` : 'Morgan Blackwood'
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'MB'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
              {initials}
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2">{displayName}</h1>
          <p className="text-gray-600 mb-1">Keeper of Thoughts • Est. March 2023</p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-px bg-gray-400"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-px bg-gray-400"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Daily Call Time Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Select Your Daily Call Time</h2>
            <div className="bg-orange-200 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">{selectedTime}</div>
                <div className="text-sm text-gray-600">Daily reflection time</div>
              </div>
            </div>
          </div>

          {/* Daily Reflection Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Your Daily Reflection</h2>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Set aside time each day to capture your thoughts, insights, and experiences. Your future self will thank you for these preserved moments.
              </p>
              <button 
                onClick={onGoToEmptyPage}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Choose A Time For A Call
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-orange-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Entries This Month</span>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div className="text-3xl font-light text-gray-900 mb-1">23</div>
            <div className="text-sm text-gray-600">8 more than last month</div>
          </div>

          <div className="bg-orange-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Longest Streak</span>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl font-light text-gray-900 mb-1">42 days</div>
            <div className="text-sm text-gray-600">Your best run yet</div>
          </div>

          <div className="bg-orange-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Next Reflection</span>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-light text-gray-900 mb-1">Today 9:00 AM</div>
            <div className="text-sm text-gray-600">Don't forget to write</div>
          </div>
        </div>

        {/* Recent Reflections */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Recent Reflections</h2>
            <button 
              onClick={onGoToJournal}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {reflections.map((reflection) => (
              <div key={reflection.id} className="bg-orange-100 rounded-2xl p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">{reflection.date}</div>
                  <p className="text-gray-900 leading-relaxed">{reflection.text}</p>
                </div>
                <div className="ml-6 flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {reflection.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleSignOut}
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}