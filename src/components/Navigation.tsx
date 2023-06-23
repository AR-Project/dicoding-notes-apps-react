import { HandleChangeEvent } from '../global/types'
import { Link } from 'react-router-dom'
import "../styles/Navigation.css"
import PropTypes from 'prop-types';

type props = {
  onSearchActive: (event: HandleChangeEvent) => void
  query: string
}

function Navigation({ onSearchActive, query }: props) {
  return (
    <header>
      <ul>
        <li><Link to="/"><h1>ter-<span className="cursive"> Catat</span></h1></Link></li>
        <div className="vertical-lines"></div>
        <li><Link to="/new">Buat Catatan</Link>  </li>
      </ul>

      <form id='search-form'>
        <input
          type="text"
          name="search"
          id="search"
          placeholder='Cari Catatan'
          onChange={onSearchActive}
          value={query} />
      </form>
    </header>
  )
}

Navigation.propTypes = {
  onSearchActive: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default Navigation
