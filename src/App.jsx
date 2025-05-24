import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import EmptyPage from './EmptyPage'
import Journal from './Journal'
import Call from './Call'
import LandingPage from './LandingPage'

function App() {
  const [session, setSession] = useState(null)
  const [showLanding, setShowLanding] = useState(true)
  const [showEmptyPage, setShowEmptyPage] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [showCall, setShowCall] = useState(false)
  const [selectedCallData, setSelectedCallData] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        setShowLanding(false)
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
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
    setShowEmptyPage(false)
    setShowJournal(false)
    setShowCall(false)
  }

  const handleGoToEmptyPage = () => {
    setShowEmptyPage(true)
    setShowJournal(false)
    setShowCall(false)
  }

  const handleGoToJournal = () => {
    setShowJournal(true)
    setShowEmptyPage(false)
    setShowCall(false)
  }

  const handleViewCall = (callData) => {
    setSelectedCallData(callData)
    setShowCall(true)
    setShowJournal(false)
    setShowEmptyPage(false)
  }

  const handleBackToAccount = () => {
    setShowEmptyPage(false)
    setShowJournal(false)
    setShowCall(false)
    setSelectedCallData(null)
  }

  const handleBackToJournal = () => {
    setShowCall(false)
    setShowJournal(true)
    setSelectedCallData(null)
  }

  // Show landing page first
  if (showLanding && !session) {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  // Show call details if requested
  if (showCall && session && selectedCallData) {
    return <Call callData={selectedCallData} onBackToJournal={handleBackToJournal} />
  }

  // Show journal if requested
  if (showJournal && session) {
    return <Journal onBackToAccount={handleBackToAccount} onViewCall={handleViewCall} />
  }

  // Show empty page if requested
  if (showEmptyPage && session) {
    return <EmptyPage onBackToAccount={handleBackToAccount} />
  }

  // Then show auth or account based on session
  return (
    <div>
      {!session ? <Auth onBackToLanding={handleBackToLanding} /> : <Account session={session} onGoToEmptyPage={handleGoToEmptyPage} onGoToJournal={handleGoToJournal} />}
    </div>
  )
}

export default App