import axios from "axios"

const NoteUrl="http://localhost:3000/api/Note"

export const getEmployList=async(id)=>{
    id=id || ''
return await axios.get(`${NoteUrl}/${id}`)
}

export const addEmploy= async(Note)=>{
    return await axios.post(`${NoteUrl}`,Note)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}

export const deleteEmploy= async(id)=>{
    return await axios.delete(`${NoteUrl}/${id}`)
}

export const editEmploy= async(id,Note)=>{
    return await axios.patch(`${NoteUrl}/${id}`,Note)
}

const AuthUrl="http://localhost:3000/api/Auth"

export const addUser= async(user)=>{
    return await axios.post(`${AuthUrl}/register`,user)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}

export const loginUser = async(user)=>{
    try {
        const response = await axios.post(`${AuthUrl}/login`, user);
        return response; 
    } catch (err) {
        console.log(err);
        throw err; 
    }

}

export const logoutUser = async()=>{
    return await axios.post(`${AuthUrl}/logout`)
    .then(res=>localStorage.removeItem("user"))
    .catch(err=>console.log(err))
}