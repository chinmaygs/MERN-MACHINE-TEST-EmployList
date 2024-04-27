import './App.css'
import Context from './Context'
import Component from './Component'
import {Route, Routes} from 'react-router-dom'

function App() {


  return (
    <>
     <Context>
      <Routes>
        <Route path='/' element={<Component/>}/>
      </Routes>
     </Context>
    </>
  )
}

export default App
