import { HandleChangeEvent } from '../global/types'
import { Link, useLocation } from 'react-router-dom'
import "../styles/Navigation.css"
import PropTypes from 'prop-types';

type props = {
  onSearchActive: (event: HandleChangeEvent) => void
  query: string
  clearQuery: () => void
}

function Navigation({ onSearchActive, query, clearQuery }: props) {
  const location = useLocation()

  const enabledSearchLocation = ["/", "/archive"]

  return (
    <header>
      <ul>
        <li>
          <Link
            onClick={() => clearQuery()}
            to="/">
            <h1>ter-<span className="cursive"> Catat</span></h1>
          </Link>
        </li>
        <div className="vertical-lines"></div>
        <li>
          <Link
            onClick={() => clearQuery()}
            to="/new"
            style={{
              color: 'orange',
              borderRadius: '5px',
              padding: '5px'
            }}
          >
            <i
              className="fa-regular fa-square-plus"
              style={{
                color: 'orange',
                paddingRight: '5px'
              }}>
            </i>
            Buat Catatan
          </Link>
        </li>
        <li>
          <Link onClick={() => clearQuery()} to="/archive">Archive</Link>
        </li>
      </ul>
      {enabledSearchLocation.includes(location.pathname) &&
        <form id='search-form'>
          <input
            type="text"
            name="search"
            id="search"
            placeholder='Cari Catatan'
            onChange={onSearchActive}
            value={query} />
          {query.length !== 0 &&
            <button onClick={() => clearQuery()}>
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
          }
        </form>
      }
    </header>
  )
}

Navigation.propTypes = {
  onSearchActive: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  clearQuery: PropTypes.func.isRequired
}

export default Navigation
