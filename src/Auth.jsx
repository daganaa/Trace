import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth({ onBackToLanding }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.error_description || error.message)
    }
    setLoading(false)
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        },
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      if (data.user && !data.user.email_confirmed_at) {
        alert('Check your email to confirm your account!')
      } else {
        alert('Account created successfully!')
      }
    }
    setLoading(false)
  }

  const handleMagicLink = async (event) => {
    event.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the magic link!')
    }
    setLoading(false)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBackToLanding}
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      
      {/* Centered Content Container */}
      <div className="flex justify-center items-center">
        <div className="max-w-md w-full space-y-10">
          {/* Logo */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-8">
              <svg width="64" height="64" viewBox="0 0 513 586" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="28" y="319" width="298" height="54" rx="13" fill="black"/>
                <path d="M67 390H286V410H67V390Z" fill="black"/>
                <rect y="427" width="353" height="159" rx="13" fill="black"/>
                <path d="M280.125 302H250L290.356 231.882C290.356 231.882 295.223 120.532 332.986 75.761C369.554 32.4062 513 1 513 1C513 1 471.108 81.9574 448 105.5C424.892 129.043 364.816 169.434 364.816 169.434H455.759C455.759 169.434 411.341 206.259 386.415 223.118C359.074 241.61 307.976 255.985 307.976 255.985L280.125 302Z" fill="black" stroke="black"/>
              </svg>
            </div>
          </div>          
            <h1 className="text-xl lg:text-2xl font-bold font-serif text-gray-900 mb-8 text-center">
              <span className="text-[3vw] lg:text-[3vw]">{isSignUp ? 'Join Libro' : 'Log in to Libro'}</span>
            </h1>

          <form className="space-y-4" onSubmit={isSignUp ? handleSignUp : handleLogin}>
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full px-4 py-3 bg-blue-200 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    required={true}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="w-full px-4 py-3 bg-blue-200 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    required={true}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  className="w-full px-4 py-3 bg-blue-200 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  required={true}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </>
            )}
            
            <input
              className="w-full px-4 py-3 bg-blue-200 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              placeholder="Email address"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              className="w-full px-4 py-3 bg-blue-200 border border-blue-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              placeholder={isSignUp ? "Password" : "Password (optional)"}
              value={password}
              required={isSignUp}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Magic Link Button - Only shows on login page */}
            {!isSignUp ? (
              // Login button
              <button 
                type="submit"
                className="w-full px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !email}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            ) : (
              // Signup button
              <button 
                type="submit"
                className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </form>

          {/* Toggle Mode Button - Shows different text based on current mode */}
          <div className="text-center">
            <button 
              type="button" 
              className="w-full px-4 py-3 border border-white rounded-lg text-gray-600 hover:text-gray-800  transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={toggleMode}
              disabled={loading}
            >
              {isSignUp ? "Already have an account? Log in→" : "Don't have an account? Sign up→"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}