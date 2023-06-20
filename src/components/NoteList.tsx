import React from 'react'
import { Notes } from '../global/types'
import NoteItem from './NoteItem'

type props = {
  title: string,
  notes: Notes,
  onDelete: (id: number) => void
  onArchive: (id: number) => void
}


export default function NoteList({ title, notes, onDelete, onArchive }: props) {

  function notesMapper(notes: Notes): JSX.Element[] {
    return notes.map((note) => (
      <NoteItem note={note} onDelete={onDelete} onArchive={onArchive} />
    ))
  }

  return (
    <>
      <h1>{title}</h1>
      <div className="notes">
        {notesMapper(notes)}
      </div>
    </>
  )
}
