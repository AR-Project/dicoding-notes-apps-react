
import { showFormattedDate } from '../utils'
import { Note } from '../global/types'
import DeleteButton from './DeleteButton'
import ArchiveButton from './ArchiveButton'

type props = {
  note: Note,
  onDelete: (id: number) => void
  onArchive: (id: number) => void
}

export default function NoteItem({ note, onDelete, onArchive }: props) {
  return (
    <div className="note">
      <h1>{note.title}</h1>
      <h3>{showFormattedDate(note.createdAt)}</h3>
      <p>{note.body}</p>
      <p>{`${note.archived}`}</p>
      <DeleteButton id={note.id} onDelete={onDelete} />
      <ArchiveButton id={note.id} onArchive={onArchive} />
    </div>
  )
}
