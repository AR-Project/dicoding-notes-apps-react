import { useState, useEffect } from 'react'
import { Note } from '../global/types'
import { Link, useParams, useNavigate } from 'react-router-dom'
import DeleteButton from '../components/DeleteButton'
import ArchiveButton from '../components/ArchiveButton'
import { getNote, showFormattedDate, deleteNote, unarchiveNote, archiveNote } from "../utils"
import "../styles/NoteDetails.css"
import NoteNotFound from '../components/NoteNotFound'
import LoadingSpinner from '../components/LoadingSpinner'
import { MdOutlineArrowBack } from 'react-icons/md'

export default function NoteDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [initializing, setInitializing] = useState(true)

  async function onDelete(id: string): Promise<void> {
    await deleteNote(id)
    navigate('/')
  }
  async function onArchive(id: string, status: boolean): Promise<void> {
    setInitializing(true)
    status ? await unarchiveNote(id) : await archiveNote(id)
    getNote(id).then(({ data }) => {
      setNote(data)
      setInitializing(false)
    })
  }

  useEffect(() => {
    if (id !== undefined) {
      getNote(id).then(({ data }) => {
        setNote(data)
        setInitializing(false)
      })
    }
  }, [id])

  if (initializing === true) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    )
  }

  if (note !== null) {
    return (
      <div className='container'>
        <article>
          <Link to="/" className="back-btn-container">
            <MdOutlineArrowBack className="back-btn" />
            Back to Note List
          </Link>
          <h1>{note.title}</h1>
          <h3>{showFormattedDate(note.createdAt)} {note.archived ? " - Archived Note" : ""}</h3>
          <p>{note.body}</p>
          <div className="note-action">
            <DeleteButton id={note.id} onDelete={onDelete} />
            <ArchiveButton id={note.id} onArchive={onArchive} archiveStatus={note.archived} />
          </div>
        </article>
      </div>
    )
  }


  return (
    <NoteNotFound />
  )
}
