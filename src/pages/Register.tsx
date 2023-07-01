import RegisterInput from "../components/RegisterInput";
import { RegisterPayload } from "../global/types";
import { register } from "../utils";
import { Link } from "react-router-dom";

import "../styles/Register.css"

export default function Register() {
  async function onRegisterHandler(user: RegisterPayload) {
    await register(user);
  }

  return (
    <div className="container" id="register-page">
      <h1>Buat Akun Baru</h1>
      <RegisterInput register={onRegisterHandler} />
      <p>Mau Login? <Link to='/'>Kembali ke halaman login</Link></p>
    </div>
  )
}
