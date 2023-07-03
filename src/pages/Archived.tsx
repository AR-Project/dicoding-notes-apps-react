import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { deleteNote, archiveNote, unarchiveNote, getArchivedNotes } from '../utils'
import NotesListArea from '../components/NotesListArea'
import LoadingSpinner from '../components/LoadingSpinner';

type props = {
  query: string,
}

function ArchivePage({ query }: props) {
  const [notes, setNotes] = useState([])
  const [initializing, setInitializing] = useState(true)

  async function onDelete(id: string): Promise<void> {
    await deleteNote(id)
    const { data } = await getArchivedNotes()
    setNotes(data)
  }

  async function onArchive(id: string, status: boolean): Promise<void> {
    status ? await unarchiveNote(id) : await archiveNote(id)
    const { data } = await getArchivedNotes()
    setNotes(data)
  }

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data)
      setInitializing(false)
    })

  }, [])

  return (
    <>
      {initializing ?
        <LoadingSpinner /> :
        <NotesListArea
          notes={notes != undefined ? notes : []}
          searchQuery={query}
          onDelete={onDelete}
          onArchive={onArchive}
          isArchivePage={true} />}
    </>
  )
}

ArchivePage.propTypes = {
  query: PropTypes.string
}

export default ArchivePage
