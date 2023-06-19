type props = {
  id: number,
  onDelete: (id: number) => void
}

export default function DeleteButton({ id, onDelete }: props) {
  return (
    <button
      className='notes-item_delete'
      onClick={() => onDelete(id)}>Hapus</button>
  )
}
