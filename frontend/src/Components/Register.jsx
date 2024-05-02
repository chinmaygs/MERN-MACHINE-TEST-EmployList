
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api";


function Register() {
  const [error, setError] = useState("")
  const [IsLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await addUser({
        f_Email: email,
        f_userName: username,
        f_Pwd: password
      })
      navigate("/")
    } catch (err) {
      console.log(err)
      setError(err.response.data.messsage)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="bg-teal-100 min-h-screen">
      <h1 className="text-center pt-16 pb-6 text-6xl font-extralight font-sans">Create an Account</h1>
      <div className="formContaineflex flex-col">
        <form className="flex flex-col items-center justify-center h-80" onSubmit={handleSubmit}>
          <input className="p-2 my-5 rounded-md placeholder:italic font-mono "
            name="email" type="text" placeholder="Email Id..." />
          <input className="p-2 my-5 rounded-md placeholder:italic font-mono "
            name="username" type="text" placeholder="Username..." />
          <input className="p-2 my-5 rounded-md placeholder:italic font-mono"
            name="password" type="password" placeholder="Password..." />
          <button className="mt-2 p-2 bg-amber-200 w-28 rounded-lg"
            disabled={IsLoading}>Register</button>
          <Link className="mt-5 font-light"
            to="/">Already Have an account.<h1 className="text-center font-normal">Login Here!</h1> </Link>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
