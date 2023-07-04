import { useContext } from 'react'

import { Notes } from '../global/types'
import NoteList from './NoteList'
import '../styles/NotesListArea.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { homepage, nav, splash } from '../utils/content'
import LocaleContext from '../context/LocaleContext';
import { LocaleContextValue } from '../global/types';


type props = {
  notes: Notes,
  searchQuery: string,
  onDelete: (id: string) => Promise<void>
  onArchive: (id: string, status: boolean) => Promise<void>
  isArchivePage?: boolean
}

function NotesListArea({ notes, searchQuery, onDelete, onArchive, isArchivePage = false }: props) {
  const { locale } = useContext(LocaleContext) as LocaleContextValue

  const noResultContent = (
    <div className="splash-message">
      <h1>{splash[locale].findNoNoteHeader}</h1>
      <p>{splash[locale].findNoNoteContent}</p>
    </div>
  )

  const noNotesContent = (
    <div className="splash-message">
      <h1>{isArchivePage ? splash[locale].emptyArchive : splash[locale].emptyNote}</h1>
      {!isArchivePage ?
        <p><Link to='/new'>{splash[locale].emptyNoteContent}</Link> </p> :
        <p><Link to='/'>{splash[locale].emptyArchiveContent}</Link></p>}
    </div>
  )

  function notesMapper(notes: Notes): JSX.Element {
    return (
      <div className="notes-container">
        <NoteList componentTitle={isArchivePage ? nav[locale].archive : homepage[locale].title} notes={notes} onDelete={onDelete} onArchive={onArchive} />
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
