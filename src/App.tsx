import { HandleChangeEvent, IauthedUser, accessTokenPayload } from './global/types'
import './App.css'
import { useState, useEffect, useMemo } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'

import { putAccessToken, getUserLogged } from './utils'

import Navigation from './components/Navigation'
import LoadingSpinner from './components/LoadingSpinner'

import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import NewNote from './pages/NewNote'
import NoteDetails from './pages/NoteDetails'
import ArchivePage from './pages/Archived'
import PageNotFound from './pages/PageNotFound'

import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [authedUser, setAuthedUser] = useState<IauthedUser | null>(null)
  const [initializing, setInitializing] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  const [query, setQuery] = useState(title !== null ? title : "")

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

  async function onLoginSuccess({ accessToken }: accessTokenPayload) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged(); // Fetch user info
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('')
  }

  function toggleTheme() {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme);
      return newTheme
    })
  }

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme
    };
  }, [theme])

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false)
    })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  if (initializing === true) {
    return <>
      <ThemeProvider value={themeContextValue}>
        <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} authedUser={authedUser} onLogout={onLogout} />
        <main>
          <div className="container">
            <LoadingSpinner />
          </div>
        </main>
      </ThemeProvider>
    </>
  }

  if (authedUser == null) {
    return (
      <>
        <ThemeProvider value={themeContextValue}>
          <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} authedUser={authedUser} onLogout={onLogout} />
          <main>
            <Routes>
              <Route path='/*' element={<Login loginSuccess={onLoginSuccess} />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </main>
        </ThemeProvider>
      </>
    )
  }

  return (
    <>
      <ThemeProvider value={themeContextValue}>
        <Navigation onSearchActive={onSearchActive} query={query} clearQuery={clearQuery} authedUser={authedUser} onLogout={onLogout} username={authedUser.name} />
        <main>
          <Routes>
            <Route path="/" element={<Homepage query={query} />} />
            <Route path="/new" element={<NewNote />} />
            <Route path="/note/:id" element={<NoteDetails />} />
            <Route path="/archive" element={<ArchivePage query={query} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </ThemeProvider>
    </>
  )
}

export default App
