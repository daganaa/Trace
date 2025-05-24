import { useState, useEffect } from 'react'

export default function EmptyPage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch data from FastAPI backend
    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div className="container">
      <h1>Empty Page</h1>
      <p>{message}</p>
    </div>
  )
}