import React from 'react'
import { useState, useEffect } from 'react';
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/')
    }
    getEmploys();
  }
    , [isloading])

  const getEmploys = async () => {
    try {
      const res = await getEmployList()
      console.log(res)
      setList(res.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteEmployee = async (id) => {
    await deleteEmploy(id)
    setisloading(!isloading)
  }


  return (
    <div className="bg-teal-100 min-h-screen">
      <Navbar />
      <h1 className="text-center pt-16 text-6xl font-extralight font-sans">Welcome  To Admin Panel</h1>
      
      <div className='flex justify-between'>
        <div className='mt-5 p-3 w-4/12 bg-amber-200  rounded-se-full'>
          <Link to='/Add' className='flex'>
            <span className=' text-xl ml-10 mr-2 text-center'>Create New Employ</span>
            <MdAddToPhotos className='relative size-6 mt-1 ' />
          </Link>
        </div>
      </div>
      <div >
        <div >
        {List.length == 0 ?
        <div className='text-center mt-14 text-2xl text-amber-800'>No Employee........   </div> :
      
          <div className='grid grid-flow-col-dense grid-cols-9 gap-3 bg-slate-200 mt-5  p-3 justify-between rounded-md font-serif text-amber-800 underline'>
            <div className='text-2xl flex justify-center'>Image</div>
            <div className='text-2xl flex justify-center'>Name</div>
            <div className='text-2xl flex justify-center'>Email</div>
            <div className='text-2xl flex justify-center'>Mobile No</div>
            <div className='text-2xl flex justify-center'>Designation</div>
            <div className='text-2xl flex justify-center'>Gender</div>
            <div className='text-2xl flex justify-center'>Course</div>
            <div className='text-2xl flex justify-center'>Created On</div>
            <div className='text-2xl flex justify-center'>Edit / Delete</div>
          </div>
}
          {List.map((data) => {
            return (
              <div className='grid grid-flow-col-dense grid-cols-9  bg-slate-200 mt-5 p-3 justify-between rounded-md items-center' key={data._id}>
                <img src={`http://localhost:3000/` + data.f_Image} alt="" className='w-20 h-20 rounded-lg flex justify-center ml-8' />
                <div className='text-xl font-sans flex justify-center'>{data.f_Name}</div>
                <div className='font-sans truncate flex justify-center'>{data.f_Email}</div>
                <div className='font-sans flex justify-center'>{data.f_Mobile}</div>
                <div className='font-sans flex justify-center'>{data.f_Designation}</div>
                <div className='font-sans flex justify-center'>{data.f_gender}</div>
                <div>
                  {data.f_Course.map(course => <div className='font-sans flex justify-center'>{course}</div>)}</div>
                <div className='font-sans flex justify-center'  >{data.f_Createdate.substring(0, 10)}</div>
                <div className='flex gap-10 mt-2 ml-8'>
                  <FiEdit className='size-5 mt-1 cursor-pointer fill-gray-200' onClick={() => { navigate('/Edit', { state: { data } }) }} />
                  <MdDelete className='size-7 cursor-pointer fill-red-800' onClick={() => { deleteEmployee(data._id) }} />
                </div>
              </div>)
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
