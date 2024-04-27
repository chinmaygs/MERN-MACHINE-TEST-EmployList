import './App.css';
import Add from './Components/Add';
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Edit from './Components/Edit';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {



  return (

    <Routes>
    <Route path="/Home" element={<Home/>} />
    <Route path="/Add" element={<Add/>} />
    <Route path="/Edit" element={<Edit/>} />
    <Route path="/" element={<Login/>} />
    <Route path="/Register" element={<Register/>} />
    </Routes>
   
  );
}

export default App;
