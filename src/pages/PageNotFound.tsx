import { Link } from 'react-router-dom'
export default function PageNotFound() {
  return (
    <div className="container">
      <h1 style={{ fontSize: '6rem' }}>404</h1>
      <h2 style={{ paddingBottom: '50px' }}>Kesasar bosku?</h2>
      <p><i className="fa-solid fa-arrow-left fa-lg"></i> <Link to='/'>Balik ke Halaman Utama</Link></p>
    </div>
  )
}
