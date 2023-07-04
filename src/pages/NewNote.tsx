import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { addNote } from '../utils'
import { newNote } from '../utils/content'
import NoteInput from '../components/NoteInput'
import '../styles/NewNote.css'
import { LocaleContextValue, NoteContent } from '../global/types'
import LocaleContext from '../context/LocaleContext'

export default function NewNote() {
  const navigate = useNavigate()
  const { locale } = useContext(LocaleContext) as LocaleContextValue

  function addNoteHandler(noteContent: NoteContent): void {
    addNote(noteContent)
    navigate('/')
  }

  return (
    <div className="container">
      <h1>{newNote[locale].header}</h1>
      <NoteInput addNote={addNoteHandler} />
    </div>
  )
}
