import "../styles/ArchiveButton.css"
import { MdArchive, MdUnarchive } from 'react-icons/md'

import PropTypes from 'prop-types';

type props = {
  id: string,
  onArchive: (id: string, status: boolean) => Promise<void>
  archiveStatus: boolean
}

function ArchiveButton({ id, onArchive, archiveStatus }: props) {
  return (
    <button
      className='notes-item_archive'
      onClick={() => onArchive(id, archiveStatus)}>
      {archiveStatus ? <MdUnarchive className="archive-btn" /> : <MdArchive className="archive-btn" />}
    </button>
  )
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  archiveStatus: PropTypes.bool.isRequired
}

export default ArchiveButton
