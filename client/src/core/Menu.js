import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Menu() {
    const location = useLocation();

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
                    <Link className="nav-link" style={isActive(location.pathname, '/signin')} to='/signin'>Signin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(location.pathname, '/signup')} to='/signup'>Signup</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu