import { useContext } from 'react'
import { Link } from "react-router-dom";


import RegisterInput from "../components/RegisterInput";
import { LocaleContextValue, RegisterPayload } from "../global/types";
import { register } from "../utils";
import { registerContent } from '../utils/content';

import "../styles/Register.css"
import LocaleContext from '../context/LocaleContext';

export default function Register() {
  const { locale } = useContext(LocaleContext) as LocaleContextValue

  async function onRegisterHandler(user: RegisterPayload) {
    await register(user);
  }

  return (
    <div className="container" id="register-page">
      <h1>{registerContent[locale].header}</h1>
      <RegisterInput register={onRegisterHandler} />
      <p>{registerContent[locale].loginAction}<Link to='/'>{registerContent[locale].loginActionLink}</Link></p>
    </div>
  )
}
