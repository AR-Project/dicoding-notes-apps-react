import { HandleChangeEvent } from '../global/types'
import { Link, useLocation } from 'react-router-dom'
import "../styles/Navigation.css"
import PropTypes from 'prop-types';

type props = {
  onSearchActive: (event: HandleChangeEvent) => void
  query: string
  clearQuery: () => void
  authedUser: null | string
}

function Navigation({ onSearchActive, query, clearQuery, authedUser }: props) {
  const location = useLocation()

  const enabledSearchLocation = ["/active", "/archive"]

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

        {authedUser === null ?
          <>
            <Link to="/register">Register</Link>
          </> :
          <>
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
          </>
        }

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
  clearQuery: PropTypes.func.isRequired,
  authedUser: PropTypes.any
}

export default Navigation
