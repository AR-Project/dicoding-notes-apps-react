import { HandleChangeEvent } from '../global/types'

type props = {
  onSearchActive: (event: HandleChangeEvent) => void
  query: string
}

export default function Navigation({ onSearchActive, query }: props) {
  return (
    <header>
      <h1>aiCatat </h1>
      <form>
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
