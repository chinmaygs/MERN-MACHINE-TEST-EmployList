import axios from "axios"
axios.defaults.withCredentials = true;

const ListUrl = "http://localhost:3000/api/List"

export const getEmployList = async (id) => {
    id = id || ''
    return await axios.get(`${ListUrl}/${id}`)
}

export const addEmploy = async (Note) => {
    console.log(Note)
    return await axios.post(`${ListUrl}`, Note)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const deleteEmploy = async (id) => {
    return await axios.delete(`${ListUrl}/${id}`)
}

export const editEmploy = async (id, Note) => {
    console.log(Note)
    return await axios.patch(`${ListUrl}/${id}`, Note)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const AuthUrl = "http://localhost:3000/api/Auth"

export const addUser = async (user) => {
    return await axios.post(`${AuthUrl}/register`, user)
    
}

export const loginUser = async (user) => {
    return await axios.post(`${AuthUrl}/login`, user);

}

export const logoutUser = async () => {
    return await axios.post(`${AuthUrl}/logout`)
        .then(res => localStorage.removeItem("user"))
        .catch(err => console.log(err))
}

