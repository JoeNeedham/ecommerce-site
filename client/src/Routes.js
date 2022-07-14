import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from  './user/Signin'
import Home from './core/Home'
import Menu from './core/Menu';


function AppRoutes() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/signin' exact element={<Signin />} />
                <Route path='/signup' exact element={<Signup />} />
                <Route path='/' exact element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes