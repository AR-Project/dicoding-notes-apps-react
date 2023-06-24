import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import DeleteButton from '../components/DeleteButton'
import ArchiveButton from '../components/ArchiveButton'
import { getNote, showFormattedDate, deleteNote, changeNoteArchiveStatus } from "../utils"
import "../styles/NoteDetails.css"
import NoteNotFound from '../components/NoteNotFound'

export default function NoteDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [note] = useState(id !== undefined ? getNote(id) : undefined)

  function onDelete(id: string): void {
    deleteNote(id)
    navigate('/')
  }
  function onArchive(id: string): void {
    changeNoteArchiveStatus(id)
  }

  return (
    <>
      {
        note !== undefined ?
          <div className='container'>
            <article>
              <Link to="/"><i className="fa-solid fa-arrow-left fa-lg"></i>Back to Note List</Link>
              <h1>{note.title}</h1>
              <h3>{showFormattedDate(note.createdAt)}</h3>
              <p>{note.body}</p>
              <div className="note-action">
                <DeleteButton id={note.id} onDelete={onDelete} />
                <ArchiveButton id={note.id} onArchive={onArchive} />
              </div>
            </article>
          </div>
          :
          <NoteNotFound />
      }
    </>
  )
}
