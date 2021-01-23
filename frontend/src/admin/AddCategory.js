import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data, token } = isAuthenticated();

  const onChangeHandler = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    // Backend API Call Trigger.
    createCategory(data._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setName("");
        setSuccess(true);
      }
    });
  };
  const goBack = () => {
    return (
      <div className="">
        <Link className="btn btn-sm btn-warning m-3" to="/admin/dashboard">
          Go Back
        </Link>
      </div>
    );
  };
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success m-3">Category Created Successfully.</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger m-3">Failed To Create Category</h4>;
    }
  };
  const createCategoryForm = () => {
    return (
      <form>
        <div className="form-group m-3">
          <p className="lead">Enter the Category</p>
          <input
            className="form-control my-3"
            required            
            onChange={onChangeHandler}
            value={name}
            placeholder="Example - Summer Collection"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create A Category"
      description="Add A New T-Shirt Category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
