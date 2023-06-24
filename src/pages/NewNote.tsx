import { useNavigate } from 'react-router-dom'

import { addNote } from '../utils'
import NoteInput from '../components/NoteInput'
import '../styles/NewNote.css'
import { NoteContent } from '../global/types'

export default function NewNote() {
  const navigate = useNavigate()

  function addNoteHandler(noteContent: NoteContent): void {
    addNote(noteContent)
    navigate('/')
  }

  return (
    <div className="container">
      <h1>Mari Mencatat</h1>
      <NoteInput addNote={addNoteHandler} />
    </div>
  )
}
