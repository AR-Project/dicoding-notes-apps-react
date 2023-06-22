import "../styles/ArchiveButton.css"
import PropTypes from 'prop-types';

type props = {
  id: string,
  onArchive: (id: string) => void
}

function ArchiveButton({ id, onArchive }: props) {
  return (
    <button
      className='notes-item_archive'
      onClick={() => onArchive(id)}>
      <i className="fa-solid fa-box-archive fa-2xl"></i>
    </button>
  )
}

ArchiveButton.propTypes = {
  id: PropTypes.string,
  onArchive: PropTypes.func.isRequired,
}

export default ArchiveButton
