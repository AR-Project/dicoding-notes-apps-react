import { Link } from 'react-router-dom'

export default function NoteNotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <h2 style={{ marginBottom: "20px" }}>
        Wah, catatannya dimakan buaya
      </h2>
      <p
        style={{
          padding: "10px 25px",
          borderRadius: "5px",
          backgroundColor: "rgba(128, 128, 128, 0.101)"
        }}
      >
        <Link to="/">
          <i className="fa-solid fa-arrow-left fa-lg"></i>
          Lihat catatan yang lain aja yuk
        </Link>
      </p>
    </div>)
}
