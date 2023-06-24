import { useState } from 'react'
import PropTypes from 'prop-types';

import { deleteNote, changeNoteArchiveStatus, getArchivedNotes } from '../utils'
import NotesListArea from '../components/NotesListArea'

type props = {
  query: string,
}

function ArchivePage({ query }: props) {
  const [notes, setNotes] = useState(getArchivedNotes())

  function onDelete(id: string): void {
    deleteNote(id)
    setNotes(() => getArchivedNotes())
  }

  function onArchive(id: string): void {
    changeNoteArchiveStatus(id)
    setNotes(() => getArchivedNotes())
  }

  return (
    <>
      <NotesListArea notes={notes != undefined ? notes : []} searchQuery={query} onDelete={onDelete} onArchive={onArchive} isArchivePage={true} />
    </>
  )
}

ArchivePage.propTypes = {
  query: PropTypes.string
}

export default ArchivePage
