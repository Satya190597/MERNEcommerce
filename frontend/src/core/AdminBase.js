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
  
  const [navigationFlag, setNavigationFlag] = useState(false);

  // --- Toggle side navigation. ---
  const toggleSideNavigation = () => {
    setNavigationFlag(!navigationFlag);
  };

  return (
    <div className="root-container">
      {
        // --- Main Navigation ---
      }
      <Menu />
      {
        // --- Header Section ---
      }
      <div
        className="pt-3 pb-5 px-3 theme-background"
      >
        <div className="d-flex flex-row justify-content-between">
          {
            // --- Side drawer toggle button ---
          }
          <div className="align-self-start">
            <button
              className="btn btn-dark btn-lg rounded"
              onClick={toggleSideNavigation}
            >
              <span className="fa fa-bars text-white"></span>
            </button>
          </div>
          {
            // --- Title ---
          }
          <div className="align-self-center">
            <h1 className="text-center text-white">{title}</h1>
          </div>
          {
            // --- Right Extend ---
          }
          <div></div>
        </div>
        {
          // --- Description ---
        }
        <h2 className="text-center text-white mb-0">{description}</h2>
      </div>
      {
        // --- Side Navigation ---
      }
      <div
        className={
          "side-nav row col-12 " + (navigationFlag ? "" : "side-nav-close")
        }
      >
        <div className="col-3 theme-background h-100 " >
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
        <div class="col-9 side-nav-extend" onClick={toggleSideNavigation}></div>
      </div>
      {
        // --- Content from props.children ---
      }
      <div className="m-0 p-0">
        {children}
      </div>
    </div>
  );
};

export default AdminBase;
