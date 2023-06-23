import { Note, NoteContent, NoteContentEdit, Notes } from "../global/types";

let notes = [
  {
    id: 'notes-1',
    title: 'Babel',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-2',
    title: 'Functional Component',
    body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-3',
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-4',
    title: 'Lifecycle',
    body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-5',
    title: 'ESM',
    body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-6',
    title: 'Module Bundler',
    body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
];

export function getAllNotes(): Notes {
  return notes;
}

export function getNote(id: string): Note | undefined {
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote;
}

export function getActiveNotes(): Notes | undefined {
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
}

export function getArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
}

export function addNote({ title, body }: NoteContent) {
  console.log(`Note Added --- ${title}`);

  notes = [...notes, {
    id: `notes-${+new Date()}`, title: title || '(untitled)', body, createdAt: new Date().toISOString(), archived: false,
  }];
}

export function deleteNote(id: string) {
  notes = notes.filter((note) => note.id !== id);
}

export function changeNoteArchiveStatus(id: string): void {
  notes = notes.map(note => {
    return note.id === id ?
      { ...note, archived: !note.archived } : note
  })
}

export function archiveNote(id: string) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  });
}

export function unarchiveNote(id: string) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }

    return note;
  });
}

export function editNote({ id, title, body }: NoteContentEdit): void {
  const noteToEdit = notes.find((note) => note.id === id);

  if (noteToEdit !== undefined) {
    noteToEdit.title = title;
    noteToEdit.body = body;
  }

  notes = notes.map((note) => {
    if (note.id === id) {
      return note;
    }
    return note;
  });
}

export function showFormattedDate(date: string): string {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  } as const
  return new Date(date).toLocaleDateString("id-ID", options)
}
