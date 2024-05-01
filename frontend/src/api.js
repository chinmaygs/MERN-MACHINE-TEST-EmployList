import axios from "axios"
axios.defaults.withCredentials = true;

const NoteUrl = "http://localhost:3000/api/Note"

export const getEmployList = async (id) => {
    id = id || ''
    return await axios.get(`${NoteUrl}/${id}`)
}

export const addEmploy = async (Note) => {
    console.log(Note)
    return await axios.post(`${NoteUrl}`, Note)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const deleteEmploy = async (id) => {
    return await axios.delete(`${NoteUrl}/${id}`)
}

export const editEmploy = async (id, Note) => {
    console.log(Note)
    return await axios.patch(`${NoteUrl}/${id}`, Note)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

const AuthUrl = "http://localhost:3000/api/Auth"

export const addUser = async (user) => {
    return await axios.post(`${AuthUrl}/register`, user)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const loginUser = async (user) => {
    return await axios.post(`${AuthUrl}/login`, user);

}

export const logoutUser = async () => {
    return await axios.post(`${AuthUrl}/logout`)
        .then(res => localStorage.removeItem("user"))
        .catch(err => console.log(err))
}

