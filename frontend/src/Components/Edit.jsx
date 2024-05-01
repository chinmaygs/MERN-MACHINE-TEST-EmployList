import { useState, useEffect } from 'react';
import { deleteEmploy, editEmploy } from '../api';
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';


function Edit() {
  const [isloading, setisloading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null)
  const { state } = useLocation()
  const { data } = state
  const navigate = useNavigate();
  const [employ, setEmploy] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    img: null
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      setEmploy({
        name: data.f_Name,
        email: data.f_Email,
        mobile: data.f_Mobile,
        designation: data.f_Designation,
        gender: data.f_gender,
        course: data.f_Course,
        img: data.f_Image
      })
    }
  }, [isloading])


  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('f_Image', employ.img);
      formdata.append('f_Name', employ.name);
      formdata.append('f_Email', employ.email);
      formdata.append('f_Mobile', employ.mobile);
      formdata.append('f_Designation', employ.designation);
      formdata.append('f_gender', employ.gender);
      employ.course.forEach(course => {
        formdata.append('f_Course', course);
      }
      )
      await editEmploy(data._id, formdata)
      navigate('/Home')
    }
    catch (error) {
      console.log(error)
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

  const deleteEmployee = async (id) => {
    await deleteEmploy(id)
    setisloading(!isloading)
    navigate('/Home')
  }
  return (
    <div>
      <Navbar />
      <div className='pt-3 pl-16 py-4 text-4xl bg-teal-300 '>Edit Employee</div>
      <div className='bg-teal-100 h-screen pt-10'>
        <div>
          <form className='flex flex-col items-start pl-24 gap-5 pt-5 pb-3  mx-96 bg-slate-200 rounded-xl text-xl relative' onSubmit={updateEmployee} encType='multipart/form-data'>
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
              <input
                className='absolute right-28 rounded-sm'
                type="text"
                value={employ.email}
                onChange={(event) => { setEmploy({ ...employ, email: event.target.value }) }} />
            </div>
            <div>
              <span className='mr-10'>Mobile No :</span>
              <input
                className='absolute right-28 rounded-sm'
                type="text"
                value={employ.mobile}
                onChange={(event) => { setEmploy({ ...employ, mobile: event.target.value }) }} />
            </div>
            <div>
              <span className='mr-10'>Designation :</span>
              <select
                name="designation"
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
                  checked={employ.gender.includes('Male')}
                  onChange={(event) => { setEmploy({ ...employ, gender: event.target.id }) }} />
                <label for="Male" >Male</label>
                <input type="radio"
                  id='Female'
                  name="gender"
                  value={employ.gender}
                  checked={employ.gender.includes('Female')}
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
              {data.f_Image && previewImage == null &&
                <div className='ml-36'>
                  <div className='text-sm text-red-800 underline'>Image Preview</div>
                  <img
                    src={`http://localhost:3000/` + data.f_Image}
                    alt="" className='w-24 h-24 rounded-lg mt-2' />
                </div>}
              <div className='text-base text-blue-800 mt-3'>Click "Browse" to Change image</div>
              <input
                className='ml-28 mt-2'
                type="file"
                id='image'
                name='image'
                accept='image/jpeg, image/png, image/jpg'
                onChange={(event) => { uploadImage(event) }} />
            </div>
            {previewImage &&
              <div className='ml-40'>
                <div className='text-sm text-red-800 underline'>Image Preview</div>
                <img src={previewImage} alt="Preview" className='w-24 h-24 rounded-lg mt-2' />
              </div>}
            <div className=' gap-52 ml-4'>
            </div>
            <div className='flex gap-20'>
              <div>
                <button className='p-2  bg-amber-200 w-28 rounded-lg ml-1' type='submit'>
                  UPDATE
                </button>
              </div>
              <div className=''>
                <MdDelete className='size-8 mt-2 ml-2 fill-red-800 cursor-pointer' onClick={() => { deleteEmployee(data._id) }} />
              </div>
              <div className=''>
                <button
                  className=' p-2  bg-fuchsia-300 w-28 rounded-lg'
                  onClick={() => { navigate('/Home') }}>
                  Discard
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
