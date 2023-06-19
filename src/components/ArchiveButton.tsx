type props = {
  id: number,
  onArchive: (id: number) => void
}

export default function ArchiveButton({ id, onArchive }: props) {
  return (
    <button
      className='notes-item_archive'
      onClick={() => onArchive(id)}>Arsip</button>
  )
}
