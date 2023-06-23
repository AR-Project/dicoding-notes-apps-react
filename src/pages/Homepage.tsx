import { useState } from 'react'
import { getAllNotes, deleteNote, changeNoteArchiveStatus } from '../utils'
import NotesListArea from '../components/NotesListArea'

type props = {
  query: string
}

export default function Homepage({ query }: props) {
  const [notes, setNotes] = useState(getAllNotes())

  function onDelete(id: string): void {
    deleteNote(id)
    setNotes(() => getAllNotes())
  }

  function onArchive(id: string): void {
    changeNoteArchiveStatus(id)
    setNotes(() => getAllNotes())
  }

  return (
    <>
      <NotesListArea notes={notes} searchQuery={query} onDelete={onDelete} onArchive={onArchive} />
    </>
  )
}
