import { HandleChangeEvent } from '../global/types'
import "./Navigation.css"
import PropTypes from 'prop-types';

type props = {
  onSearchActive: (event: HandleChangeEvent) => void
  query: string
}

function Navigation({ onSearchActive, query }: props) {
  return (
    <header>
      <h1>ter- <span className="cursive"> Catat</span> </h1>
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
