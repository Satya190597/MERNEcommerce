import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./style/AdminBase.css";
import $ from "jquery";
import "jquery-ui";

const AdminBase = ({
  title = "Admin Panel",
  description = "",
  children = "<h1>Admin Panel<h1>",
}) => {

  const [navigationFlag,setNavigationFlag] = useState(false);  

  

  const sideNavClickHandler = () => {
    alert("Working")
  }

  const toggleSideNavigation = () => {
    alert("Hello")
    setNavigationFlag(!navigationFlag)
  }

  return (
    <div>
      {
        // --- Main Navigation ---
      }
      <Menu />
      {
        // --- Header Section ---
      }
      <div style={{ backgroundColor: "#673AB7" }} className="p-2 back-red">
        <h1 className="text-center text-white">{title}</h1>
        <h2 className="text-center text-white mb-0">{description}</h2>
        <div className="navbar navbar-dark">
          <button className="navbar-toggler navbar-light" onClick={toggleSideNavigation}>
            <span className="fa fa-bars text-white"></span>
          </button>
        </div>
      </div>
      {
        // --- Side Navigation ---
      }
      <div className="side-nav slide-nav-animation row col-12" className={ navigationFlag ? "slide-nav-open-animation" : "slide-nav-close-animation" }>
        <div className="col-3 bg-primary bg-gradient h-100">
          <div className="d-flex">
            <div className="nav flex-column">
              <Link to="/admin/create/category" className="nav-link text-white">
                Create Categories
              </Link>
              <Link
                to="/admin/manage/categories"
                className="nav-link text-white"
              >
                Manage Categories
              </Link>
              <Link to="/admin/create/product" className="nav-link text-white">
                Create Product
              </Link>
              <Link to="/admin/orders" className="nav-link text-white">
                Manage Order
              </Link>
              <Link to="/admin/products" className="nav-link text-white">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
        <div class="col-9 side-nav-close" >

        </div>
      </div>
      {
        // --- Content from props.children ---
      }
      <div className="m-0 p-0 back-red">{children}</div>
    </div>
    
  );
};

export default AdminBase;
