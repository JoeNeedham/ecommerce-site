import React from 'react';
import { isAuthenticated } from './index';
import Signin from '../user/Signin'
import AdminDashboard from '../user/AdminDashboard';

function AdminRoute({children}) {

    const isAuth =  isAuthenticated();
    console.log(isAuth.user.role)

    return (
        isAuth && isAuth.user.role === 1 ? children : <Signin />
    )
}

export default AdminRoute
