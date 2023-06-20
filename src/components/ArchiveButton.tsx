import "./ArchiveButton.css"

type props = {
  id: number,
  onArchive: (id: number) => void
}

export default function ArchiveButton({ id, onArchive }: props) {
  return (
    <button
      className='notes-item_archive'
      onClick={() => onArchive(id)}>
      <i className="fa-solid fa-box-archive fa-2xl"></i>
    </button>
  )
}
