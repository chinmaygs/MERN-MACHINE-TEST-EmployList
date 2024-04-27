import { Link , useNavigate} from "react-router-dom"
import { logoutUser } from "../api"


function Navbar() {
  const navigate = useNavigate()
    const username = JSON.parse(localStorage.getItem('user'))
    const Logout = async ()  =>{
        await logoutUser()
        navigate('/')
      }
  return (
    
    <div>
        <div className="flex justify-between px-16 py-4 text-xl bg-teal-300">
        <Link to ='./home'>HOME</Link>
        <Link to ='./list'>Employee List</Link>
        <div className="flex gap-10">
        <div className="font-serif italic ">| {username._doc.f_userName} |</div>
        <div className="cursor-pointer" onClick={Logout}>Logout</div>
        </div>
        </div>
       
    </div>
  )
}

export default Navbar
