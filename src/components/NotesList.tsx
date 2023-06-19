import { Notes } from '../global/types'
import NoteItem from './NoteItem'

type props = {
  notes: Notes,
  searchQuery: string,
  onDelete: (id: number) => void
  onArchive: (id: number) => void
}

export default function NotesList({ notes, searchQuery, onDelete, onArchive }: props) {
  const isSearchActive: boolean = searchQuery !== ""
  const isNotesEmpty: boolean = notes.length === 0

  const searchResult: Notes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery))

  function notesSpliter(notes: Notes) {
    const activeNotes = notes.filter((note) => !note.archived)
    const archivedNotes = notes.filter((note) => note.archived)
    return (
      <>
        <h1>ACTIVE NOTES</h1>
        {activeNotes.map((note) => (
          <NoteItem note={note} onDelete={onDelete} onArchive={onArchive} />
        ))}
        <h1>ARCHIVED NOTES</h1>
        {archivedNotes.map((note) => (
          <NoteItem note={note} onDelete={onDelete} onArchive={onArchive} />
        ))}
      </>
    )

  }

  function displayNotes() {
    if (isSearchActive) {
      if (searchResult.length === 0) return (<h1>Tidak Menemukan Hasil</h1>)
      return notesSpliter(searchResult)
    }

    if (isNotesEmpty) {
      return (<h1>Catatan Kosong</h1>)
    }
    return notesSpliter(notes)
  }

  return (
    <div className="notes">
      {displayNotes()}
    </div>
  )
}
