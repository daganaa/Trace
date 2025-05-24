import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import EmptyPage from './EmptyPage'
import LandingPage from './LandingPage'

function App() {
  const [session, setSession] = useState(null)
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      // If user is already logged in, skip landing page
      if (session) {
        setShowLanding(false)
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      // When user logs in, hide landing page
      if (session) {
        setShowLanding(false)
      }
    })
  }, [])

  const handleGetStarted = () => {
    setShowLanding(false)
  }

  const handleBackToLanding = () => {
    setShowLanding(true)
  }

  // Show landing page first
  if (showLanding && !session) {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  // Then show auth or account based on session
  return (
    <div>
      {!session ? <Auth onBackToLanding={handleBackToLanding} /> : <Account session={session} />}
    </div>
  )
}

export default App