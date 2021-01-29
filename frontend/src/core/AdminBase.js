import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./style/AdminBase.css";

const AdminBase = ({
  title = "Admin Panel",
  description = "",
  children = "<h1>Admin Panel<h1>",
}) => {
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
          <button className="navbar-toggler navbar-light">
            <span className="fa fa-bars text-white"></span>
          </button>
        </div>
      </div>
      {
        // --- Side Navigation ---
      }
      <div class="side-nav row col-12">
        <div class="col-3 bg-primary bg-gradient h-100">
          <div class="d-flex">
            <div class="nav flex-column">
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
