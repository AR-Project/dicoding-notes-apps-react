import { useState } from 'react'
import { RegisterPayload } from '../global/types'
import { PreventDefault, HandleChangeEvent } from '../global/types'

import "../styles/RegisterInputForm.css"
import { useNavigate } from 'react-router-dom'

type props = {
  register: (payload: RegisterPayload) => Promise<void>
}

export default function RegisterInput({ register }: props) {
  const navigate = useNavigate()
  const DEFAULT_REGISTER_INPUT_STATE: RegisterPayload = {
    name: "",
    email: "",
    password: "",
  }

  const [registerPayload, setRegisterPayload] = useState(DEFAULT_REGISTER_INPUT_STATE)

  function handleChange(event: HandleChangeEvent): void {
    setRegisterPayload((prevPayload: RegisterPayload) => {
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
    register(registerPayload)
    navigate('/')
  }


  return (
    <form onSubmit={onSubmitHandler} id='register-input-form'>
      <input
        type="text"
        placeholder="Nama"
        onChange={handleChange}
        id="name"
        name="name"
        value={registerPayload.name}
      />
      <input
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
        id="email"
        name="email"
        value={registerPayload.email}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete='current-password'
        id="password"
        name="password"
        value={registerPayload.password}
        onChange={handleChange} />

      <input
        type="password"
        id="confirm-password"
        placeholder="Confirm Password"
        autoComplete='current-password'
      />


      <button type='submit' id='submit'>Daftar</button>
    </form>
  )
}
