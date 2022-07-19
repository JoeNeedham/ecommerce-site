import React, { Component } from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom'
import { isAuthenticated } from './index';
import Dashboard from '../user/UserDashboard';
import Signin from '../user/Signin'

function PrivateRoute() {

    const navigate = useNavigate();
    const isAuth =  isAuthenticated();

    return (
        isAuth ? <Dashboard /> : <Signin />
    )
}

export default PrivateRoute
