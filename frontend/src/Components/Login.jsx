import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
function Login() {
  const [error, setError] = useState(null)
  const [IsLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await loginUser({
        username: username,
        password: password
      })
      if (res.status === 401) {
        console.log(res)
      }
      else {
        localStorage.setItem("token", JSON.stringify(res.data))
        console.log(res.data)
        navigate('/Home')
      }
    }
    catch (err) {
      console.log(err)
      setError(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="bg-teal-100 min-h-screen">
      <h1 className="text-center pt-16 text-6xl font-extralight font-sans">Admin Login</h1>
      <div className="flex flex-col">
        <form className="flex flex-col items-center justify-center h-80" onSubmit={handleSubmit}>
          <input className="p-3 my-5 rounded-md placeholder:italic font-mono "
            name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input className="p-3 my-5 rounded-md placeholder:italic font-mono"
            name="password" type="password" placeholder="Password" />
          <button className="mt-2 p-3 bg-amber-200 w-28 rounded-lg"
            disabled={IsLoading}>Login</button>
          {error !== null ? <span className="text-red-400 transition-colors">{error}</span> : ""}
          <Link className="mt-5 font-light"
            to="/Register">Don't have an account ? <h1 className="text-center font-normal">Register Here</h1></Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
