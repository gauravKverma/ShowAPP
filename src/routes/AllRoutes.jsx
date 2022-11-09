import React,{useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Search from '../pages/Search'

const AllRoutes = () => {
  const [jwt,setToken]=useState("");
  const change = (a) => {
    setToken(a)
  }
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/login"} element={<Login change={change}/>}/>
            <Route path={"/search"} element={<Search jwt={jwt}/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes