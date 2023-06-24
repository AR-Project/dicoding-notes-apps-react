import './App.css'
import { useState } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Navigation from './components/Navigation'

import Homepage from './pages/Homepage'
import NewNote from './pages/NewNote'
import NoteDetails from './pages/NoteDetails'
import ArchivePage from './pages/Archived'
import PageNotFound from './pages/PageNotFound'

import { HandleChangeEvent } from './global/types'

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  const [query, setQuery] = useState(title !== null ? title : "")


  function changeSearchParams(keyword: string) {
    setSearchParams({ title: keyword })
  }

  function onSearchActive(event: HandleChangeEvent): void {
    setQuery(event.target.value)
    changeSearchParams(event.target.value)
  }

  function clearQuery() {
    setQuery("")
  }


  return (
    <>
      <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} />
      <main>
        <Routes>
          <Route path="/" element={<Homepage query={query} />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/note/:id" element={<NoteDetails />} />
          <Route path="/archive" element={<ArchivePage query={query} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
