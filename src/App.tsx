import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'

import Homepage from './pages/Homepage'
import NewNote from './pages/NewNote'

import { HandleChangeEvent } from './global/types'



function App() {

  const [query, setQuery] = useState("")

  function onSearchActive(event: HandleChangeEvent): void {
    setQuery(event.target.value)
  }

  return (
    <>
      <Navigation onSearchActive={onSearchActive} query={query} />
      <main>
        <Routes>
          <Route path="/" element={<Homepage query={query} />} />
          <Route path="/new" element={<NewNote />} />
        </Routes>
      </main>
    </>
  )
}

export default App
