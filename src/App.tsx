import './App.css'
import { useState } from 'react'
import { getInitialData } from './utils'
import NotesList from './components/NotesList'
import NoteInput from './components/NoteInput'
import Navigation from './components/Navigation'
import { HandleChangeEvent, NoteContent, Notes } from './global/types'


function App() {

  const [notes, setNotes] = useState(getInitialData())
  const [query, setQuery] = useState("")

  function onDelete(id: number): void {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  function onArchive(id: number): void {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id ?
        { ...note, archived: !note.archived } : note
    }))
  }

  function onSearchActive(event: HandleChangeEvent): void {
    setQuery(event.target.value)
  }

  return (
    <>
      <Navigation onSearchActive={onSearchActive} query={query} />
      <NoteInput setNotes={setNotes} />
      <NotesList notes={notes} searchQuery={query} onDelete={onDelete} onArchive={onArchive} />
    </>
  )
}

export default App
