import { Notes } from '../global/types'
import NoteList from './NoteList'
import '../styles/NotesListArea.css'
import PropTypes from 'prop-types';

type props = {
  notes: Notes,
  searchQuery: string,
  onDelete: (id: string) => void
  onArchive: (id: string) => void
}

function NotesListArea({ notes, searchQuery, onDelete, onArchive }: props) {
  const noResultContent = (
    <div className="splash-message">
      <h1>Aduh, nggak ketemu...</h1>
      <p>Mungkin bisa cari dengan kata kunci lain...?</p>
    </div>
  )

  const noNotesContent = (
    <div className="splash-message">
      <h1>Catatan Kosong</h1>
      <p>Yuk, buat catatan!</p>
      <p>Isi judul, isi catatan, pencet "simpan catatan"</p>
    </div>
  )

  function notesSpliter(notes: Notes): JSX.Element {
    const activeNotes = notes.filter((note) => !note.archived)
    const archivedNotes = notes.filter((note) => note.archived)
    return (
      <div className="notes-container">
        <NoteList componentTitle='My Notes' notes={activeNotes} onDelete={onDelete} onArchive={onArchive} />
        <div className="hl"></div>
        <NoteList componentTitle='Archived' notes={archivedNotes} onDelete={onDelete} onArchive={onArchive} />
      </div>
    )
  }

  function displayNotes() {
    const isSearchActive: boolean = searchQuery !== ""
    const isNotesEmpty: boolean = notes.length === 0

    const searchResult: Notes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery))

    if (isSearchActive) {
      if (searchResult.length === 0) return noResultContent
      return notesSpliter(searchResult)
    }
    if (isNotesEmpty) return noNotesContent
    return notesSpliter(notes)
  }

  return (
    <div className="container">
      {displayNotes()}
    </div>
  )
}

NotesListArea.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ),
  searchQuery: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired
}

export default NotesListArea
