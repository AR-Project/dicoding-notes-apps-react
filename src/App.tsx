import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Navigation from './components/Navigation'

import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import NewNote from './pages/NewNote'
import NoteDetails from './pages/NoteDetails'
import ArchivePage from './pages/Archived'
import PageNotFound from './pages/PageNotFound'

import { HandleChangeEvent, IauthedUser } from './global/types'

import { putAccessToken, getUserLogged } from './utils'

function App() {
  const [authedUser, setAuthedUser] = useState<IauthedUser | null>(null)
  const [initializing, setInitializing] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  const [query, setQuery] = useState(title !== null ? title : "")

  const username = authedUser !== null ? authedUser.name : ''

  function changeSearchParams(keyword: string) {
    setSearchParams({ title: keyword })
  }

  function onSearchActive(event: HandleChangeEvent): void {
    setQuery(event.target.value)
    changeSearchParams(event.target.value)
  }

  function clearQuery() {
    setQuery("")
  }

  async function onLoginSuccess({ accessToken }: { accessToken: string }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('')
  }

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false)
    })

  }, [])

  if (initializing === true) {
    return <>
      <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} authedUser={authedUser} onLogout={onLogout} />
      <div className="container">
        <h1>loading</h1>

      </div>
    </>
  }

  if (authedUser == null) {
    return (
      <>
        <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} authedUser={authedUser} onLogout={onLogout} />
        <Routes>
          <Route path='/*' element={<Login loginSuccess={onLoginSuccess} />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </>

    )
  }

  return (
    <>
      <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} authedUser={authedUser} onLogout={onLogout} username={username} />
      <main>
        <Routes>
          <Route path='/' element={<div className='container'><h2>Dalam pengembangan</h2></div>} />
          {/* <Route path="/" element={<Homepage query={query} />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/note/:id" element={<NoteDetails />} />
          <Route path="/archive" element={<ArchivePage query={query} />} />
           */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
