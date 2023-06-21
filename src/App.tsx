import './App.css'
import { useState } from 'react'
import { getAllNotes } from './utils'
import NotesListArea from './components/NotesListArea'
import NoteInput from './components/NoteInput'
import Navigation from './components/Navigation'
import { HandleChangeEvent } from './global/types'


function App() {

  const [notes, setNotes] = useState(getAllNotes())
  const [query, setQuery] = useState("")

  function onDelete(id: string): void {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  function onArchive(id: string): void {
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
      <div className="container">
        <NoteInput setNotes={setNotes} />
      </div>
      <NotesListArea notes={notes} searchQuery={query} onDelete={onDelete} onArchive={onArchive} />
    </>
  )
}

export default App
