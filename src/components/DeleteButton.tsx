import "./DeleteButton.css"

type props = {
  id: number,
  onDelete: (id: number) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function DeleteButton({ id, onDelete, onMouseEnter, onMouseLeave }: props) {
  return (
    <button
      className='notes-item_delete'
      onClick={() => onDelete(id)}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}>
      <i className="fa-solid fa-trash fa-lg" ></i>
    </button>
  )
}
