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
        // Add this to skip email confirmation in development
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      // Check if user needs email confirmation
      if (data.user && !data.user.email_confirmed_at) {
        alert('Check your email to confirm your account!')
      } else {
        alert('Account created successfully!')
      }
    }
    setLoading(false)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    // Clear form when switching modes
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBackToLanding}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      
      {/* Centered Content Container */}
      <div className="flex justify-center items-center">
        <div className="max-w-md w-full space-y-8 lg:max-w-2xl">
          {/* Desktop Layout - Two Column */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Column - Welcome Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {isSignUp ? 'Join Trace' : 'Welcome Back'}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {isSignUp 
                    ? 'Start your journaling journey with AI-powered insights and voice conversations that help you reflect and grow.'
                    : 'Continue your journaling journey. Sign in to access your conversations and insights.'
                  }
                </p>
              </div>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>AI-powered voice conversations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Automatic transcription & analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Personal insights & growth tracking</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleLogin}>
                <div className="space-y-4">
                  {isSignUp && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          required={true}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          required={true}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        required={true}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </>
                  )}
                  
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <button 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  )}
                </button>
                
                <div className="text-center">
                  <p className="text-gray-600">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button 
                      type="button" 
                      className="ml-2 text-blue-600 hover:text-blue-500 font-medium focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      onClick={toggleMode}
                      disabled={loading}
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Mobile Layout - Single Column */}
          <div className="lg:hidden">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Create your account to start journaling'
                  : 'Sign in to your account'
                }
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleLogin}>
              <div className="space-y-4">
                {isSignUp && (
                  <>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      required={true}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      required={true}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      required={true}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </>
                )}
                
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                )}
              </button>
              
              <div className="text-center">
                <p className="text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button 
                    type="button" 
                    className="ml-2 text-blue-600 hover:text-blue-500 font-medium focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={toggleMode}
                    disabled={loading}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}