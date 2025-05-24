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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-blue-600">
                    {firstName && lastName ? `${firstName[0]}${lastName[0]}` : session.user.email[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {firstName && lastName ? `${firstName} ${lastName}` : 'Welcome'}
                  </h1>
                  <p className="text-gray-600">{email || session.user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            {isEditing ? (
              <form onSubmit={updateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName || ''}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName || ''}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber || ''}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">First Name</h3>
                    <p className="mt-1 text-lg text-gray-900">{firstName || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Name</h3>
                    <p className="mt-1 text-lg text-gray-900">{lastName || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</h3>
                  <p className="mt-1 text-lg text-gray-900">{email || session.user.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone Number</h3>
                  <p className="mt-1 text-lg text-gray-900">{phoneNumber || 'Not provided'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Member Since</h3>
                  <p className="mt-1 text-lg text-gray-900">
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
      </div>
      
      {/* Update the button section at the bottom */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ready to Start Journaling?</h3>
            <p className="text-gray-600 mb-6">Access your journaling workspace and begin your reflection journey.</p>
            <div className="space-y-4">
              <button
                onClick={onGoToJournal}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Go to Journal
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              {/* Make Call Button */}
              <button
                onClick={handleMakeCall}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ml-4"
              >
                Make Call
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              
              {/* Get Call Button */}
              <button
                onClick={handleGetCall}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ml-4"
              >
                Get Call
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </button>
              {/* List Call Button */}
              <button
                onClick={handleListCalls}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ml-4"
              >
                List All Calls
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </button>
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
