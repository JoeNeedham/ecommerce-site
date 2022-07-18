import React, { Fragment } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'

function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (pathname, path) => {
        if(pathname === path){
            return { color: "#ff9900"};
        } else {
            return { color: '#ffffff'}
        }
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(location.pathname, '/')} to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(location.pathname, '/dashboard')} to='/'>Dashboard</Link>
                </li>
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(location.pathname, '/signin')} to='/signin'>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(location.pathname, '/signup')} to='/signup'>Signup</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <span className="nav-link" style={{cursor: 'pointer', color: 'white'}} onClick={() => signout(() => {
                            navigate('/')
                            })}>
                                Signout
                            </span>
                        </li>
                    </Fragment>
                )}
            </ul>
        </div>
    )
}

export default Menu