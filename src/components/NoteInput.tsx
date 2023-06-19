import { useState } from 'react'
import { PreventDefault, HandleChangeEvent } from '../global/types'
import { NoteContent, SetNotes } from '../global/types'

export default function NoteInput({ setNotes }: SetNotes) {
  const DEFAULT_NOTE_STATE: NoteContent = {
    title: "",
    body: ""
  }

  const TITLE_MAX_LENGTH = 50

  const [currentNote, setCurrentNote] = useState(DEFAULT_NOTE_STATE)

  function onSubmitHandler(event: PreventDefault) {
    event.preventDefault()
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          id: +new Date(),
          title: currentNote.title,
          body: currentNote.body,
          createdAt: new Date().toISOString(),
          archived: false
        }
      ]
    })
    setCurrentNote(DEFAULT_NOTE_STATE);
  }

  function handleChange(event: HandleChangeEvent): void {
    setCurrentNote((prevNote: NoteContent) => {
      return ({
        ...prevNote,
        [event.target.name]: event.target.value.slice(0, TITLE_MAX_LENGTH)
      })
    })
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        value={currentNote.title}
      />
      <p>{TITLE_MAX_LENGTH - currentNote.title.length} karakter tersisa</p>

      <textarea
        placeholder='Tuliskan Catatanmu Disini'
        onChange={handleChange}
        name='body'
        value={currentNote.body}
      />
      <button type='submit'>Simpan Catatan</button>
    </form>
  )
}
