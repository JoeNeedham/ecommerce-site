import React, { useState, Fragment } from 'react'
import Layout from '../core/Layout'
import { signin, authenticate } from '../auth'
import { useNavigate } from 'react-router-dom'


function Signin() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    })

    const navigate = useNavigate();


    const {email, password, loading, error, redirectToReferrer } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className='text-muted' htmlFor="">Email</label>
                <input onChange={handleChange('email')}  type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className='text-muted' htmlFor="">Password</label>
                <input onChange={handleChange('password')}  type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div
        className="alert alert-danger"
        style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div
            className="alert alert-info"
            >
                <h2>Loading...</h2>
            </div>
        )
        
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            navigate('/') 
        }
    }

    return (
        <Layout title="Signin" description="Signin to Node React E-Commerce App" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin