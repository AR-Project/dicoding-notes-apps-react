import { Notes } from '../global/types'
import NoteList from './NoteList'
import '../styles/NotesListArea.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

type props = {
  notes: Notes,
  searchQuery: string,
  onDelete: (id: string) => Promise<void>
  onArchive: (id: string, status: boolean) => Promise<void>
  isArchivePage?: boolean
}

function NotesListArea({ notes, searchQuery, onDelete, onArchive, isArchivePage = false }: props) {
  const noResultContent = (
    <div className="splash-message">
      <h1>Aduh, nggak ketemu...</h1>
      <p>Mungkin bisa cari dengan kata kunci lain...?</p>
    </div>
  )

  const noNotesContent = (
    <div className="splash-message">
      <h1>{isArchivePage ? `Arsip` : `Catatan`} Kosong</h1>
      {!isArchivePage ?
        <p>Yuk, <Link to='/new'>buat baru!</Link> </p> :
        <p> Kembali ke <Link to='/'>halaman utama</Link></p>}
    </div>
  )

  function notesMapper(notes: Notes): JSX.Element {
    return (
      <div className="notes-container">
        <NoteList componentTitle={isArchivePage ? `Archive` : `My Notes`} notes={notes} onDelete={onDelete} onArchive={onArchive} />
      </div>
    )
  }

  function displayNotes() {
    const isSearchActive: boolean = searchQuery !== ""
    const isNotesEmpty: boolean = notes.length === 0

    const searchResult: Notes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery))

    if (isSearchActive) {
      if (searchResult.length === 0) return noResultContent
      return notesMapper(searchResult)
    }
    if (isNotesEmpty) return noNotesContent
    return notesMapper(notes)
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
      owner: PropTypes.string.isRequired
    })
  ),
  searchQuery: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  isArchivePage: PropTypes.bool
}

export default NotesListArea
