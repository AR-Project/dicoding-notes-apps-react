
import { showFormattedDate } from '../utils'
import { Note } from '../global/types'
import DeleteButton from './DeleteButton'
import ArchiveButton from './ArchiveButton'
import './NoteItem.css'
import { useState } from 'react'

type props = {
  note: Note,
  onDelete: (id: string) => void
  onArchive: (id: string) => void
}

export default function NoteItem({ note, onDelete, onArchive }: props) {
  const [warning, setWarning] = useState("")

  function onMouseEnter() {
    setWarning("red-bg")
  }

  function onMouseLeave() {
    setWarning("")
  }

  return (
    <div className={`note ${warning}`}>
      <h1>{note.title}</h1>
      <h3>{showFormattedDate(note.createdAt)}</h3>
      <p>{note.body}</p>
      <DeleteButton id={note.id} onDelete={onDelete} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <ArchiveButton id={note.id} onArchive={onArchive} />
    </div>
  )
}
