import { useState } from 'react'
import { PreventDefault, HandleChangeEvent } from '../global/types'
import { NoteContent, SetNotes } from '../global/types'
import PropTypes from 'prop-types';
import '../styles/NoteInput.css'

function NoteInput({ setNotes }: SetNotes) {
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
          id: (+new Date()).toString(),
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
      const isTitleChanged = event.target.name === 'title'
      const value = event.target.value
      return ({
        ...prevNote,
        [event.target.name]: isTitleChanged ? value.slice(0, TITLE_MAX_LENGTH) : value
      })
    })
  }

  return (
    <form onSubmit={onSubmitHandler} id='note-input-form'>
      {currentNote.title.length > 5 &&
        <div className={`warning ${currentNote.title.length > 40 && 'red'}`}>
          {TITLE_MAX_LENGTH - currentNote.title.length} karakter tersisa
        </div>
      }
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        id="title"
        name="title"
        className={`${currentNote.title.length > 49 && 'red-border'}`}
        value={currentNote.title}
      />

      <textarea
        placeholder='Tuliskan Catatanmu Disini'
        onChange={handleChange}
        name='body'
        id='body'
        value={currentNote.body}
      />
      <button type='submit' id='submit'>Simpan Catatan</button>
    </form>
  )
}

NoteInput.propTypes = {
  setNotes: PropTypes.func.isRequired
}

export default NoteInput
