import { Link } from 'react-router-dom'

import { showFormattedDate } from '../utils'
import { Note } from '../global/types'
import DeleteButton from './DeleteButton'
import ArchiveButton from './ArchiveButton'
import '../styles/NoteItem.css'
import { useState } from 'react'
import PropTypes from 'prop-types';

type props = {
  note: Note,
  onDelete: (id: string) => Promise<void>
  onArchive: (id: string, status: boolean) => Promise<void>
}

function NoteItem({ note, onDelete, onArchive }: props) {
  const [warning, setWarning] = useState("")

  function onMouseEnter() {
    setWarning("red-bg")
  }

  function onMouseLeave() {
    setWarning("")
  }

  return (
    <div className={`note ${warning}`}>
      <h1><Link to={`/note/${note.id}`}>{note.title}</Link></h1>
      <h3>{showFormattedDate(note.createdAt)}</h3>
      <p>{note.body}</p>
      <DeleteButton id={note.id} onDelete={onDelete} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <ArchiveButton id={note.id} onArchive={onArchive} archiveStatus={note.archived} />
    </div>
  )
}

NoteItem.propTypes = {
  note: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired
}

export default NoteItem
