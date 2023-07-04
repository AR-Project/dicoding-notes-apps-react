import { HandleChangeEvent, IauthedUser } from '../global/types'
import { Link, useLocation } from 'react-router-dom'
import "../styles/Navigation.css"
import PropTypes from 'prop-types';
import ThemeToggleButton from './ThemeToggleButton';
import { MdAdd, MdPersonPin } from 'react-icons/md'

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
      <div className="header-left-container">
        <div className="logo ">
          <Link
            onClick={() => clearQuery()}
            to="/">
            <h1>ter-<span className="cursive"> Catat</span></h1>
          </Link>
        </div>
        <ul>
          {authedUser === null ?
            <>
              <Link to="/register">Register</Link>
            </> :
            <>
              <li>
                <Link onClick={() => clearQuery()} to="/new" className='new-note-btn' >
                  <MdAdd className="new-note-btn-icon" /> Baru
                </Link>
              </li>
              <li>
                <Link onClick={() => clearQuery()} to="/archive">Archive</Link>
              </li>

            </>
          }
        </ul>
      </div>

      <div className="header-right-container">
        {authedUser !== null && <div className='user-info'>
          <p><MdPersonPin />{username}</p>
          <div className="group"></div>
          <li><button className='logout-btn' onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button></li>
        </div>}

        <div className="web-utils">
          {displaySearchBox()}
          <ThemeToggleButton />
        </div>

      </div>
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
