import { useContext } from 'react'
import LocaleContext from '../context/LocaleContext'
import { LocaleContextValue } from '../global/types'
import "../styles/LocaleToggleButton.css"

function LocaleToggleButton() {
  const { locale, toggleLocale } = useContext(LocaleContext) as LocaleContextValue

  return (
    <button
      className='locale-toggle-btn'
      onClick={toggleLocale}
    >
      {locale === 'id' ? 'ID' : 'EN'}
    </button>
  )
}

export default LocaleToggleButton