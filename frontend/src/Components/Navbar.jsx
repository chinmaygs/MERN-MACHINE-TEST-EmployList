import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../api"


function Navbar() {
  const navigate = useNavigate()
  const Logout = async () => {
    await logoutUser()
    .then(localStorage.removeItem("token"));
    navigate('/')
  }
  return (

    <div>
      <div className="flex justify-between px-16 py-4 text-xl bg-teal-300">
        <Link to='/Home'>HOME</Link>
        <Link to='/Home'>Employee List</Link>
        <div className="flex gap-10">
          <div className="cursor-pointer" onClick={Logout}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
