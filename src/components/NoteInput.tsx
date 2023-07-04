import { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { PreventDefault, HandleChangeEvent, LocaleContextValue } from '../global/types'
import { NoteContent } from '../global/types'
import LocaleContext from '../context/LocaleContext';
import { newNote } from '../utils/content';

import '../styles/NoteInput.css'

type props = {
  addNote: (noteContent: NoteContent) => void
}

function NoteInput({ addNote }: props) {
  const { locale } = useContext(LocaleContext) as LocaleContextValue

  const DEFAULT_NOTE_STATE: NoteContent = {
    title: "",
    body: ""
  }

  const TITLE_MAX_LENGTH = 50

  const [currentNote, setCurrentNote] = useState(DEFAULT_NOTE_STATE)

  function onSubmitHandler(event: PreventDefault) {
    event.preventDefault()
    addNote(currentNote)
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
          {TITLE_MAX_LENGTH - currentNote.title.length} {newNote[locale].charLeft}
        </div>
      }
      <input
        type="text"
        placeholder={newNote[locale].title}
        onChange={handleChange}
        id="title"
        name="title"
        className={`${currentNote.title.length > 49 && 'red-border'}`}
        value={currentNote.title}
      />

      <textarea
        placeholder={newNote[locale].body}
        onChange={handleChange}
        name='body'
        id='body'
        value={currentNote.body}
      />
      <button type='submit' id='submit'>{newNote[locale].save}</button>
    </form>
  )
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired
}

export default NoteInput
