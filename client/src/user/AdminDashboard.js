import React from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const {
        // eslint-disable-next-line
        user: {_id, name, email, role}
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className='card-header'>Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/create/product'>
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/orders'>
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/products'>
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered'}</li>
                </ul>
            </div>
        )
    };

    return (
        <Layout className='container' title='Dashboard' description="User Dashboard">
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard