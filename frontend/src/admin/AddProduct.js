import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const AddProduct = () => {
  return (
    <Base
      title="Add Product"
      description="Create A New Product"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md text-white bg-dark">Admin Home</Link>
    </Base>
  );
};

export default AddProduct;
