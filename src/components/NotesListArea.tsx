import { Notes } from '../global/types'
import NoteList from './NoteList'
import './NotesListArea.css'

type props = {
  notes: Notes,
  searchQuery: string,
  onDelete: (id: string) => void
  onArchive: (id: string) => void
}

export default function NotesListArea({ notes, searchQuery, onDelete, onArchive }: props) {
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
        <NoteList title='My Notes' notes={activeNotes} onDelete={onDelete} onArchive={onArchive} />
        <div className="hl"></div>
        <NoteList title='Archived' notes={archivedNotes} onDelete={onDelete} onArchive={onArchive} />
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
