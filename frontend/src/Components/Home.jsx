import React from 'react'
import { useState , useEffect} from 'react';
import { deleteEmploy, getEmployList } from '../api';
import { MdAddToPhotos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Navbar from './Navbar';

function Home() {

  const [List, setList] = useState([])
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {getEmploys()},[isloading])

  const getEmploys=async() => {
    const response=await getEmployList()
    setList(response.data)
  }

    const deleteEmployee=async(id)=>{
       await deleteEmploy(id)
       setisloading(!isloading)
    }  
    
    
  return (
    <div className="bg-teal-100 min-h-screen">
      <Navbar/>
 <h1 className="text-center pt-16 text-6xl font-extralight font-sans">Welcome  To Admin Panel</h1> 
 {List.length==0 &&   
          <div className='text-center mt-14 text-2xl'>No Employee.....</div>    
        }
          <div className='mt-5 p-3 w-4/12 bg-amber-200  rounded-se-full'>
          <Link to='/Add' className='flex'>
            <span className=' text-xl ml-10 mr-2 text-center'>Create New Employ</span>         
          <MdAddToPhotos className='relative size-6 mt-1 '/>
          </Link>
          </div>
    <div >
        <div >
        <div className='flex gap-3 bg-slate-200 mt-5 mx-5 p-3 justify-between rounded-md'>
        <div>Image</div>
        <div>Name</div> 
        <div>Email</div> 
        <div>Mobile No</div> 
        <div>Designation</div> 
        <div>Gender</div> 
        <div>Course</div> 
        <div>Create Date:</div> 
        <div>Edit/Delete</div>
        </div>
          {List.map((data) => {
            return (
            <div className='flex gap-3 bg-slate-200 mt-5 mx-5 p-3 justify-between rounded-md' key={data._id}>
              <img src={`http://localhost:3000/`+data.f_Image} alt="" className='w-20 h-20 rounded-lg'/>
             
              <div className='text-xl font-serif'>{data.f_Name}</div>
              <div className='font-normal'>{data.f_Email}</div>
              <div className='font-normal'>{data.f_Mobile}</div>
              <div className='font-normal'>{data.f_Designation}</div>
              <div className='font-normal'>{data.f_gender}</div>
              <div className='font-normal'>{data.f_Course}</div>
              <div className='font-normal'>{data.f_Createdate}</div>
             
                <div className='flex gap-4 mt-2'>
                <FiEdit className='size-5 mt-1 cursor-pointer fill-white' onClick={() => {navigate('/Edit',{ state: { data } })}}/>
                <MdDelete className='size-7 cursor-pointer fill-red-800' onClick={() => {deleteEmployee(data._id)}}/>
             </div>
              </div>)

          })}
 
        </div>
            
        </div>
      
    </div>

  )
}

export default Home