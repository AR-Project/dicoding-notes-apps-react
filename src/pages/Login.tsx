import { Link } from 'react-router-dom'
import LoginInput from '../components/LoginInput'
import PropTypes from 'prop-types'
import { login } from '../utils'
import "../styles/Login.css"
import { LoginPayload } from '../global/types'

type props = {
  loginSuccess: ({ accessToken }: { accessToken: string }) => Promise<void>
}

function Login({ loginSuccess }: props) {

  async function loginHandler({ email, password }: LoginPayload) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <div className="container" id='login-page'>

      <h1>Login</h1>
      <LoginInput login={loginHandler} />

      <p>Belum punya akun? <Link to='/register'>Daftar</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired
}

export default Login