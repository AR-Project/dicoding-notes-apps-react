import RegisterInput from "../components/RegisterInput";
import { RegisterPayload } from "../global/types";
import { register } from "../utils";

export default function Register() {
  async function onRegisterHandler(user: RegisterPayload) {
    await register(user);
  }

  return (
    <div className="container">
      <RegisterInput register={onRegisterHandler} />
    </div>
  )
}
