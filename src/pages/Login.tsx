import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import LoginInput from '../components/LoginInput'
import { login } from '../utils'
import { loginContent } from '../utils/content'
import { LocaleContextValue, LoginPayload } from '../global/types'
import LocaleContext from '../context/LocaleContext'

import "../styles/Login.css"

type props = {
  loginSuccess: ({ accessToken }: { accessToken: string }) => Promise<void>
}

function Login({ loginSuccess }: props) {
  const { locale } = useContext(LocaleContext) as LocaleContextValue

  async function loginHandler({ email, password }: LoginPayload) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <div className="container" id='login-page'>

      <h1>{loginContent[locale].header}</h1>
      <LoginInput login={loginHandler} />

      <p>{loginContent[locale].noAccount}<Link to='/register'>{loginContent[locale].register}</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired
}

export default Login