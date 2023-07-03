import { useState } from 'react'
import PropTypes from 'prop-types'
import { HandleChangeEvent, PreventDefault } from '../global/types'
import { LoginPayload } from '../global/types'

import "../styles/LoginInputForm.css"

type props = {
  login({ email, password }: LoginPayload): Promise<void>
}

function LoginInput({ login }: props) {
  const DEFAULT_LOGIN_PAYLOAD_STATE: LoginPayload = {
    email: "",
    password: "",
  }

  const [loginPayload, setLoginPayload] = useState(DEFAULT_LOGIN_PAYLOAD_STATE)

  function handleChange(event: HandleChangeEvent): void {
    setLoginPayload((prevPayload: LoginPayload) => {
      const name = event.target.name
      const value = event.target.value
      return ({
        ...prevPayload,
        [name]: value
      })
    })
  }
  function onSubmitHandler(event: PreventDefault) {
    event.preventDefault()
    login(loginPayload)
  }

  return (
    <form onSubmit={onSubmitHandler} id='login-input-form'>
      <input
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
        id="email"
        name="email"
        value={loginPayload.email}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete='current-password'
        id="password"
        name="password"
        value={loginPayload.password}
        onChange={handleChange} />

      <button type='submit' id='submit'>Masuk</button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginInput