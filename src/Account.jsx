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
  const [isEditing, setIsEditing] = useState(false)
  const [calls, setCalls] = useState([])
  const [callsLoading, setCallsLoading] = useState(false)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      // Check if session and user exist before proceeding
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

  async function updateProfile(event) {
    event.preventDefault()

    // Check if session and user exist before proceeding
    if (!session?.user) {
      return
    }

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setIsEditing(false)
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  // Show loading if session is not available yet
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-500 font-light">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-500 font-light">Loading your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-semibold text-white">
                  {firstName && lastName ? `${firstName[0]}${lastName[0]}` : session.user.email[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-light text-gray-900 mb-2">
                  {firstName && lastName ? `${firstName} ${lastName}` : 'Welcome'}
                </h1>
                <p className="text-lg text-gray-500 font-light">{email || session.user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Account Information */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">Account Information</h2>
              <p className="text-gray-500 font-light">Manage your personal details and preferences</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            {isEditing ? (
              <form onSubmit={updateProfile} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-3">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName || ''}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-3">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName || ''}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber || ''}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">First Name</h3>
                    <p className="text-xl font-light text-gray-900">{firstName || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Last Name</h3>
                    <p className="text-xl font-light text-gray-900">{lastName || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Email</h3>
                  <p className="text-xl font-light text-gray-900">{email || session.user.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Phone Number</h3>
                  <p className="text-xl font-light text-gray-900">{phoneNumber || 'Not provided'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Member Since</h3>
                  <p className="text-xl font-light text-gray-900">
                    {createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : new Date(session.user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-gray-900 mb-4">Ready to Start Journaling?</h3>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">Transform conversations into insights through AI-powered voice journaling. Speak freely, reflect deeply.</p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className={`grid grid-cols-1 ${email === 'nathanj.thai2@gmail.com' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-1 lg:grid-cols-1'} gap-4`}>
              <button
                onClick={onGoToJournal}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <span>Go to Journal</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
              
              {email === 'nathanj.thai2@gmail.com' && (
                <>
                  <button
                    onClick={handleMakeCall}
                    className="group px-6 py-4 border border-gray-200 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Make Call</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={handleGetCall}
                    className="group px-6 py-4 border border-gray-200 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      <span>Get Call</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={handleListCalls}
                    className="group px-6 py-4 border border-gray-200 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <span>List All Calls</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const handleMakeCall = async () => {
  try {
    console.log('Initiating call...');
    const result = await makeCall();
    console.log('Call initiated successfully:', result);
    alert('Call initiated! Check console for details.');
  } catch (error) {
    console.error('Failed to make call:', error);
    alert('Failed to make call. Check console for error details.');
  }
};

const handleGetCall = async () => {
  try {
    // You'll need to replace this with an actual call ID from a previous call
    const callId = prompt('Enter Call ID to retrieve:');
    if (!callId) {
      alert('Call ID is required');
      return;
    }
    
    console.log('Retrieving call...');
    const result = await getCall({call_id: callId});
    console.log('Call retrieved successfully:', result);
    alert('Call retrieved! Check console for details.');
  } catch (error) {
    console.error('Failed to retrieve call:', error);
    alert('Failed to retrieve call. Check console for error details.');
  }
};

const handleListCalls = async () => {
  try {
    const calls = await listCalls();
    
    if (calls && calls.length > 0) {
      // Format the calls data for display
      const callsInfo = calls.map(call => 
        `Call ID: ${call.call_id}\nStatus: ${call.call_status || 'N/A'}\nFrom: ${call.from_number || 'N/A'}\nTo: ${call.to_number || 'N/A'}\nCreated: ${call.created_at ? new Date(call.created_at).toLocaleString() : 'N/A'}`
      ).join('\n\n');
      
      alert(`All Calls (${calls.length} total):\n\n${callsInfo}`);
      console.log('All calls:', calls);
    } else {
      alert('No calls found in your account.');
    }
  } catch (error) {
    console.error('Failed to list calls:', error);
    alert(`Failed to list calls: ${error.message}`);
  }
};

// Add this section in your JSX where you want to display the calls
