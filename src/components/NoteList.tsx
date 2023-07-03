import { Notes } from '../global/types'
import NoteItem from './NoteItem'
import PropTypes from 'prop-types';

type props = {
  componentTitle: string,
  notes: Notes,
  onDelete: (id: string) => void
  onArchive: (id: string, status: boolean) => Promise<void>
}

function NoteList({ componentTitle, notes, onDelete, onArchive }: props) {
  function notesMapper(notes: Notes): JSX.Element[] {
    return notes.map((note) => (
      <div key={note.id} >
        <NoteItem note={note} onDelete={onDelete} onArchive={onArchive} />
      </div>
    ))
  }

  return (
    <>
      <h1>{componentTitle}</h1>
      <div className="notes">
        {notesMapper(notes)}
      </div>
    </>
  )
}

NoteList.propTypes = {
  componentTitle: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired
}

export default NoteList
