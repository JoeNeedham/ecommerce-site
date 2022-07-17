import React, { useState } from 'react'
import Layout from '../core/Layout'
import { API } from '../config'


function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        sucess: false
    })

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value})
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className='text-muted' htmlFor="">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className='text-muted' htmlFor="">Email</label>
                <input onChange={handleChange('email')}  type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className='text-muted' htmlFor="">Password</label>
                <input onChange={handleChange('password')}  type="password" className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    )
    return (
        <Layout title="Signup" description="Signup to Node React E-Commerce App" className="container col-md-8 offset-md-2">
            {signUpForm()}
        </Layout>
    )
}

export default Signup