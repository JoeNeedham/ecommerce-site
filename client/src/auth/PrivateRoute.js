import React from 'react';
import { isAuthenticated } from './index';
import Signin from '../user/Signin'

function PrivateRoute({children}) {

    const isAuth =  isAuthenticated();

    return (
        isAuth ? children : <Signin />
    )
}

export default PrivateRoute
