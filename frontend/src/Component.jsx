import { useContext } from 'react';
import './App.css';
import { useState , useReducer, useEffect} from 'react';
import { userContext } from './Context';
import { addTodo, deleteTodo } from './api';

function Component() {
  const [id, setid] = useState("")
  const [Todo, setTodo] = useState("")
//   const [tdlist, dispatch] = useReducer(reducer,[])
  const [update,setupdate] = useState(false)

  const {tdlist, dispatch} = useContext(userContext)

  useEffect(()=>{localStorage.setItem('userlist',JSON.stringify(tdlist))},[tdlist])


  function addUser() {
    addTodo({name : newTodo})
    dispatch({type:"ADD",Todo:Todo})
    setTodo("")
  }

  function Deletetodo(id) {
    deleteTodo(id)
    dispatch({type:"DELETE",id: id})
  }

function updateTodo(id,Todo){
setid(id)
setTodo(Todo)
setupdate(true)
}

function updateUser(){
dispatch({type:"EDIT",Todo:Todo,id:id})
setupdate(false)
setTodo("")
}

  return (
    <div className="lg:App">
      {/* input section */}
      <div>
        <div>
          <h1 className='text-cyan-500 font-sans'>TODO APP</h1>
          <input
            className='bg-slate-50'
            type="text"
            placeholder="create a new todo"
            value={Todo}
            onChange={(event) => { setTodo(event.target.value) }} />
          {update ?
          (<button className='bg-green-500'
            onClick={updateUser}>
            UPDATE
          </button>) : 
          (<button className='bg-green-500'
            onClick={addUser}>
            ADD
          </button>)
}

          {/* Display Section */}
          <div
          type="checkbox">
            {tdlist.map((data) => {
              return (
              <div key={data.id}>
                <div className='flex'>
                <div>{data.Todo}</div>
                <div>{data.id}</div>
                <button className='bg-orange-500'
                  onClick={() => {updateTodo(data.id,data.Todo)}}>Edit</button>
                <button className='bg-red-500'
                  onClick={() => { Deletetodo(data.id) }}>Delete</button>
                  </div>
                </div>)

            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
