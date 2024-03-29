import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import {read, update, updateUser} from './apiUser';
import { useNavigate } from 'react-router-dom'

const Profile = (match) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const navigate = useNavigate();

    const {token} = isAuthenticated()

// eslint-disable-next-line
    const {name, email, password, error, success} = values

    const init = (userId) => {
        read(userId, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
    };

    useEffect(() => {
        init(match.params.userId)
        // eslint-disable-next-line
    },[])

    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        update(match.parmas.userId, token, {name, email, password}).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                })
            }
        })
    };

    const redirectUser = (success) => {
        if(success) {
            return navigate('/cart')
        }
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange('name')}
                    className="form-control"
                    value={name} 
                    />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email} 
                    />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange('password')}
                    className="form-control"
                    value={password} 
                    />

                    <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </div>
        </form>
    )

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className="container-fluid"
        >
            <h2 className="mb-4">Profile update</h2>

            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );
};

export default Profile;