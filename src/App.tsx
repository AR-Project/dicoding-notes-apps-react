import './App.css'
import { useState } from 'react'
import { getAllNotes } from './utils'
import NotesListArea from './components/NotesListArea'
import NoteInput from './components/NoteInput'
import Navigation from './components/Navigation'
import { HandleChangeEvent, NoteContent } from './global/types'


function App() {

  const [notes, setNotes] = useState(getAllNotes())
  const [query, setQuery] = useState("")

  function onDelete(id: string): void {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  function addNote(noteContent: NoteContent) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          id: (+new Date()).toString(),
          title: noteContent.title,
          body: noteContent.body,
          createdAt: new Date().toISOString(),
          archived: false
        }
      ]
    })
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
        <NoteInput addNote={addNote} />
      </div>
      <NotesListArea notes={notes} searchQuery={query} onDelete={onDelete} onArchive={onArchive} />
    </>
  )
}

export default App
