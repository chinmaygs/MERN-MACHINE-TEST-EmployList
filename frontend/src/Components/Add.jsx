import React, { useEffect } from 'react'
import { useState } from 'react';
import { addEmploy } from '../api';
import { useNavigate } from "react-router-dom";
import { getEmployList } from '../api';
import Navbar from './Navbar';


function Add() {
  const [previewImage, setPreviewImage] = useState(null)
  const [employ, setEmploy] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    img: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('f_Image', employ.img);
      formData.append('f_Name', employ.name);
      formData.append('f_Email', employ.email);
      formData.append('f_Mobile', employ.mobile);
      formData.append('f_Designation', employ.designation);
      formData.append('f_gender', employ.gender);
      employ.course.forEach(course => {
        formData.append('f_Course', course);
      }
      );

      await addEmploy(formData);
      navigate("/Home");
    }

    catch (err) {
      console.log(err)
    }
  }

  const uploadImage = (event) => {

    const file = event.target.files[0];
    if (file) {
      setEmploy({ ...employ, img: file })

      const reader = new FileReader();
      reader.onload = () => {
        console.log('File loaded successfully');
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <Navbar />
      <div className='pl-16 pt-3 py-4 text-4xl bg-teal-300 '>Create Employee</div>
      <div className='bg-teal-100 h-screen pt-10'>
        <form className='flex flex-col items-start pl-24 gap-5 py-14  mx-96 bg-slate-200 rounded-xl text-xl relative' onSubmit={handleSubmit}>
          <div>
            <span className='mr-10'>Name :</span>
            <input
              className='absolute right-28 rounded-sm'
              type="text"
              value={employ.name}
              onChange={(event) => { setEmploy({ ...employ, name: event.target.value }) }} />
          </div>
          <div>
            <span className='mr-10'>Email :</span>
            <input type="text"
              className='absolute right-28 rounded-sm'
              value={employ.email}
              onChange={(event) => { setEmploy({ ...employ, email: event.target.value }) }} />
          </div>
          <div>
            <span className='mr-10'>Mobile No :</span>
            <input type="text"
              className='absolute right-28 rounded-sm'
              value={employ.mobile}
              onChange={(event) => { setEmploy({ ...employ, mobile: event.target.value }) }} />
          </div>
          <div>
            <span className='mr-10'>Designation :</span>
            <select name="designation"
              id="designation"
              value={employ.designation}
              className='bg-white absolute right-28 pl-4 py-1 rounded-sm'
              onChange={(event) => { setEmploy({ ...employ, designation: event.target.value }) }}
            >
              <option value="" selected disabled>Please select an option...</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className='flex'>
            <span className='mr-10'>Gender :</span>
            <div className='flex gap-5 ml-5 '>
              <input type="radio"
                id='Male'
                name="gender"
                value={employ.gender}
                onChange={(event) => { setEmploy({ ...employ, gender: event.target.id }) }} />
              <label for="Male" >Male</label>
              <input type="radio"
                id='Female'
                name="gender"
                value={employ.gender}
                onChange={(event) => { setEmploy({ ...employ, gender: event.target.id }) }} />
              <label for='Female' >Female</label>
            </div>
          </div>
          <div className='flex gap-3'>
            <span className='mr-10'>Course :</span>
            <input
              type="checkbox"
              id="MCA"
              name="course"
              checked={employ.course.includes('MCA')}
              onChange={(event) => {
                if (event.target.checked) {
                  setEmploy({ ...employ, course: [...employ.course, event.target.id] });
                } else {
                  setEmploy({
                    ...employ,
                    course: employ.course.filter((item) => item !== event.target.id),
                  });
                }
              }}
            />
            <label htmlFor="MCA">MCA</label>
            <input
              type="checkbox"
              id="BCA"
              name="course"
              checked={employ.course.includes('BCA')}
              onChange={(event) => {
                if (event.target.checked) {
                  setEmploy({ ...employ, course: [...employ.course, event.target.id] });
                } else {
                  setEmploy({
                    ...employ,
                    course: employ.course.filter((item) => item !== event.target.id),
                  });
                }
              }}
            />
            <label htmlFor="BCA">BCA</label>
            <input
              type="checkbox"
              id="B.Sc"
              name="course"
              checked={employ.course.includes('B.Sc')}
              onChange={(event) => {
                if (event.target.checked) {
                  setEmploy({ ...employ, course: [...employ.course, event.target.id] });
                } else {
                  setEmploy({
                    ...employ,
                    course: employ.course.filter((item) => item !== event.target.id),
                  });
                }
              }}
            />
            <label htmlFor="B.Sc">B.Sc</label>
          </div>
          <div>
            <span className='mr-10'>Img Upload :</span>
            <input
              type="file"
              id='image'
              name='image'
              accept='image/jpeg, image/png, image/jpg'
              onChange={(event) => { uploadImage(event) }} />
            {previewImage &&
              <div className='ml-40 mt-5'>
                <img src={previewImage} alt="Preview" className='w-24 h-24 rounded-lg ' />
                <div className='text-sm text-red-800 mt-2 underline'>Image Preview</div>
              </div>}
          </div>
          <button className=' p-2  bg-amber-200 w-28 rounded-lg' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Add