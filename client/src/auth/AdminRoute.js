import React from 'react';
import { isAuthenticated } from './index';
import Signin from '../user/Signin'

function AdminRoute({children}) {

    const isAuth =  isAuthenticated();

    return (
        isAuth && isAuth.user.role === 1 ? children : <Signin />
    )
}

export default AdminRoute
