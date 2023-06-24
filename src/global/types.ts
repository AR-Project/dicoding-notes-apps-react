export type NoteContent = {
  title: string
  body: string
}

export type NoteContentEdit = {
  id: string
  title: string
  body: string
}

export type Note = {
  id: string,
  title: string,
  body: string,
  createdAt: string
  archived: boolean
}

export type HandleChangeEvent = {
  target: {
    name: string,
    value: string,
  }
}

export type PreventDefault = {
  preventDefault: () => void
}

export type Notes = Note[]

export type SetNotes = {
  setNotes: React.Dispatch<React.SetStateAction<Notes>>
}
