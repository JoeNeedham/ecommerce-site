import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from  './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signin' exact element={<Signin />} />
                <Route path='/signup' exact element={<Signup />} />
                <Route path='/' exact element={<Home />} />
                <Route path='/shop' exact element={<Shop />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/user/dashboard' exact element={<Dashboard />} />
                </Route>
                <Route element={<AdminRoute children={<AdminDashboard />}/>}>
                    <Route path='/admin/dashboard' exact element={<AdminDashboard />} />
                </Route>
                <Route element={<AdminRoute children={<AddCategory />}/>}>
                    <Route path='/create/category' exact element={<AddCategory />} />
                </Route>
                <Route element={<AdminRoute children={<AddProduct />}/>}>
                    <Route path='/create/product' exact element={<AddProduct />} />
                </Route>
                <Route path='/product/:productId' exact element={<Product />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes