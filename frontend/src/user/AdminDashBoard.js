import React from "react";
import AdminBase from "../core/AdminBase";
import { isAuthenticated } from "../auth/helper/index";
import {Link} from "react-router-dom"
import "../core/style/AdminBase.css"

const AdminDashboard = () => {
  const {
    data: { name, email, role },
  } = isAuthenticated();

  const adminLeftLayout = () => {
    return (
        <ul className="nav row">
            <li className="nav-item">
                <Link to="/admin/create/category" className="nav-link text-white">Create Categories</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/manage/categories" className="nav-link text-white">Manage Categories</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/create/product" className="nav-link text-white">Create Product</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/orders" className="nav-link text-white">Manage Order</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/products" className="nav-link text-white">Manage Products</Link>
            </li>
        </ul>
    );
  };
  const adminRightLayout = () => {
      return (
          <div className="card mb-4"> 
              <h4 className="card-header">Admin Information</h4>
              <ul className="list-group">
                <li className="list-group-item">
                   <span className="badge bg-success mr-2">Name :</span> {name}
                </li>
                <li className="list-group-item">
                   <span className="badge bg-success mr-2">Email :</span> {email}
                </li>
                <li className="list-group-item">
                   <span className="badge bg-danger mr-2">Admin Dashboard</span>
                </li>
              </ul>
          </div>
      )
  };
  return (
    <AdminBase
      title="Admin Dashboard"
      description="Manage All Of Your Product"
      className="container bg-success p-4"
    >
      <div className="row m-0" style={{height: "100vh"}}>
        <div className="col-3" style={{backgroundColor:"#673AB7"}}>{adminLeftLayout()}</div>
        <div className="col-9" style={{backgroundColor:"#B39DDB"}}>{adminRightLayout()}</div>
      </div>
    </AdminBase>
  );
};

export default AdminDashboard;
