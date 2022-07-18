import React, { Component } from 'react';
import { Route, useNavigate } from 'react-router-dom'
import { isAuthenticated } from './index';

function PrivateRoute({ component: Component, ...rest}) {

    const navigate = useNavigate();

    return (
        <Route {...rest} render={props => isAuthenticated() ? (
            <Component {...props} />
            ) : (
                navigate('./signin')
            )
        } 
        
        />
    )
}

export default PrivateRoute
