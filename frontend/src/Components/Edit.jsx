
import { useState , useEffect} from 'react';
import { deleteEmploy, editEmploy} from '../api';
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useLocation } from 'react-router-dom';



function Edit() 
{
    const [isloading, setisloading] = useState(false);
    const {state}= useLocation()
    const {data}=state
    const navigate = useNavigate();

        const [employ, setEmploy] = useState({
        name:"",
        email:"",
        mobile:"",
        designation:"",
        gender:"",
        course:[],
        img:null
      });

  
    useEffect(() => {
      setEmploy({
                name:data.f_Name,
                email:data.f_Email,
                mobile:data.f_Mobile,
                designation:data.f_Designation,
                gender:data.f_gender,
                course:data.f_Course,
                img:data.f_Image
              })
 },[isloading])
  
  
    const updateEmployee=async()=>{
      await editEmploy(data._id,{f_Name: employ.name,
    f_Email:employ.email,
    f_Mobile:employ.mobile,
    f_Designation:employ.designation,  
    f_gender:employ.gender,
    f_Course:employ.course,})
    navigate('/Home')
      }
  
  
      const deleteEmployee=async(id)=>{
         await deleteEmploy(id)
         setisloading(!isloading)
         navigate('/Home')
      }
  return (
    <div>
       <div className='pt-3 pl-16 py-4 text-4xl bg-teal-300 '>Edit Employee</div>
    <div  className='bg-teal-100 h-screen pt-10'>
       <div>
           <form className='flex flex-col items-start pl-24 gap-5 pt-5 pb-3  mx-96 bg-slate-200 rounded-xl text-xl relative'>
            <div>
            <span className='mr-10'>Name :</span>
            <input 
             className='absolute right-28 rounded-sm' 
            type="text" 
            value={employ.name} 
            onChange={(event)=>{setEmploy({...employ,name:event.target.value})}}/>
            </div>
            <div>
            <span className='mr-10'>Email :</span>
            <input 
             className='absolute right-28 rounded-sm' 
            type="text" 
            value={employ.email} 
            onChange={(event)=>{setEmploy({...employ,email:event.target.value})}}/>
            </div>
            <div>
            <span className='mr-10'>Mobile No :</span>
            <input 
             className='absolute right-28 rounded-sm' 
            type="text" 
            value={employ.mobile} 
            onChange={(event)=>{setEmploy({...employ,mobile:event.target.value})}}/>
            </div>
            <div>
            <span className='mr-10'>Designation :</span>
            <select 
            name="designation" 
            id="designation"
            value={employ.designation} 
            className='bg-white absolute right-28 pl-4 py-1 rounded-sm'
            onChange={(event)=>{setEmploy({...employ,designation:event.target.value})}}
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
            id='male' 
            name="gender" 
            value={employ.gender} 
            checked={employ.gender.includes('male')}
            onChange={(event)=>{setEmploy({...employ,gender:event.target.id})}}/>
            <label for="male" >Male</label>
            <input type="radio" 
            id='female' 
            name="gender" 
            value={employ.gender}
            checked={employ.gender.includes('female')} 
            onChange={(event)=>{setEmploy({...employ,gender:event.target.id})}}/>
            <label for='female' >Female</label>
            </div>
            </div>
            <div className='flex gap-3'>
            <span className='mr-10'>Course :</span>
            <input
              type="checkbox"
              id="mca"
              name="course"
              checked={employ.course.includes('mca')}
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
            <label htmlFor="mca">MCA</label>
            <input
              type="checkbox"
              id="bca"
              name="course"
              checked={employ.course.includes('bca')}
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
            <label htmlFor="bca">BCA</label>
            <input
              type="checkbox"
              id="bsc"
              name="course"
              checked={employ.course.includes('bsc')}
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
            <label htmlFor="bsc">B.Sc</label>
            </div>
            <div>
            <span  className='mr-10'>Img Upload</span>
            <input 
            type="file" 
            id='image' 
            name='image' 
            accept='image/jpeg, image/png, image/jpg' 
            onChange={(event)=>{setEmploy({...employ,img:event.target.files[0]})}}/>
            </div>
            <img src={`http://localhost:3000/`+data.f_Image} alt="" className='w-24 h-24 rounded-lg '/>
            <div className='flex justify-start gap-20'>
            <Link to='/Home'>
        <div>     
        <button className='p-2  bg-amber-200 w-20 rounded-lg '
          onClick={updateEmployee}>
          UPDATE
        </button>
        </div>
        </Link>
        <div className=''>
        <MdDelete className='size-8 mt-2 ml-2 fill-red-800 cursor-pointer' onClick={() => {deleteEmployee(data._id)}}/>
        </div>
        <div className=''>
        <button 
        className=' p-2  bg-fuchsia-300 w-28 rounded-lg'
        onClick={()=>{navigate('/Home')}}>
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