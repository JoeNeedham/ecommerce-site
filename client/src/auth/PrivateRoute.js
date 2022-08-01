import React from 'react';
import { isAuthenticated } from './index';
import Dashboard from '../user/UserDashboard';
import Signin from '../user/Signin'

function PrivateRoute() {

    const isAuth =  isAuthenticated();

    return (
        isAuth ? <Dashboard /> : <Signin />
    )
}

export default PrivateRoute
