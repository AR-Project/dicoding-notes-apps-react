import "./DeleteButton.css"
import PropTypes from 'prop-types';

type props = {
  id: string,
  onDelete: (id: string) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function DeleteButton({ id, onDelete, onMouseEnter, onMouseLeave }: props) {
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

DeleteButton.proptypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
}

export default DeleteButton
