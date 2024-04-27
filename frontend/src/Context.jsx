import { createContext, useReducer, useEffect } from "react";
export const userContext = createContext([])
import {addTodo,deleteTodo,editTodo} from "./api"

function reducer(state,action){
    switch(action.type){
      case "ADD":
        return [{ id: Math.random().toString(), Todo: action.Todo }, ...state]
        // async()=>{
        //   return await addTodo({Todos:action.Todo})
        // }
      case "DELETE":
        return state.filter((data) => data.id !== action.id)
        // async()=>{
        //   return await deleteTodo(action.id)
        // }
        case "EDIT":
        return (state.map((data)=>{return data.id === action.id ? {id:action.id,Todo:action.Todo} : data}))
        // async()=>{
        //   return await editTodo(action.id,{Todos:action.Todo})
        // }
        default:
          return state
      }
  }
  
  function Context({children}) {
    const [tdlist , dispatch] = useReducer(reducer,[],()=>{return JSON.parse(localStorage.getItem('userlist'))})
    
    return (
      <userContext.Provider value={{tdlist,dispatch}}>{children}</userContext.Provider>
    )
  }
  
  export default Context