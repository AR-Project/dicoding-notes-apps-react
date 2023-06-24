import { useState } from 'react'
import PropTypes from 'prop-types';

import { deleteNote, changeNoteArchiveStatus, getActiveNotes } from '../utils'
import NotesListArea from '../components/NotesListArea'

type props = {
  query: string,
}

function Homepage({ query }: props) {
  const [notes, setNotes] = useState(getActiveNotes())

  function onDelete(id: string): void {
    deleteNote(id)
    setNotes(() => getActiveNotes())
  }

  function onArchive(id: string): void {
    changeNoteArchiveStatus(id)
    setNotes(() => getActiveNotes())
  }

  return (
    <>
      <NotesListArea notes={notes != undefined ? notes : []} searchQuery={query} onDelete={onDelete} onArchive={onArchive} />
    </>
  )
}

Homepage.propTypes = {
  query: PropTypes.string
}

export default Homepage
