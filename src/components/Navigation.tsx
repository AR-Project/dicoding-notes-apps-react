import { HandleChangeEvent, IauthedUser } from '../global/types'
import { Link, useLocation } from 'react-router-dom'
import "../styles/Navigation.css"
import PropTypes from 'prop-types';

type props = {
  onSearchActive: (event: HandleChangeEvent) => void
  query: string
  clearQuery: () => void
  authedUser: null | IauthedUser
  onLogout: () => void
  username?: string
}

function Navigation({ onSearchActive, query, clearQuery, authedUser, onLogout, username }: props) {
  const location = useLocation()

  const enabledSearchLocation = ["/", "/archive"]

  function displaySearchBox() {
    if (authedUser === null) return <></>
    if (enabledSearchLocation.includes(location.pathname)) {
      return (
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
      )
    }
  }

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
            <p>Hallo, {username}!</p>
            <li>
              <Link onClick={() => clearQuery()} to="/new" className='new-note-btn' >
                <i className="fa-regular fa-square-plus"></i>
                Buat Catatan
              </Link>
            </li>
            <li>
              <Link onClick={() => clearQuery()} to="/archive">Archive</Link>
            </li>
            <li><button className='logout-btn' onClick={onLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Keluar
            </button></li>
          </>
        }
      </ul>
      {displaySearchBox()}
    </header>
  )
}

Navigation.propTypes = {
  onSearchActive: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  clearQuery: PropTypes.func.isRequired,
  authedUser: PropTypes.any,
  onLogout: PropTypes.func.isRequired
}

export default Navigation
