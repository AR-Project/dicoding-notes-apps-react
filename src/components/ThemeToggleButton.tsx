import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { ThemeContextValue } from '../global/types'
import { FaMoon, FaSun } from 'react-icons/fa';
import "../styles/ThemeToggleButton.css"

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextValue

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>{theme === 'light' ? <FaMoon className="theme-toggle-icon" /> : <FaSun className="theme-toggle-icon" />}</button>
  )
}

export default ThemeToggleButton
