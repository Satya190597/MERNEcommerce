import React, { useState } from "react";
import AdminBase from "../core/AdminBase";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data, token } = isAuthenticated();

  // On change handler.
  const onChangeHandler = (event) => {
    setError(false);
    setValidationError(false);
    setName(event.target.value);
  };

  // On Submit handler - trigger create category api call.
  const onSubmit = (event) => {
    event.preventDefault();

    // Validate - Category Name.
    if (name.length <= 3) {
      setValidationError(true);
      return;
    }

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

  // Back navigation button.
  const goBack = () => {
    return (
      <div className="">
        <Link
          className="btn btn-sm btn-warning m-3 bg-gradient rounded"
          to="/admin/dashboard"
        >
          Go Back
        </Link>
      </div>
    );
  };

  // --- Validation and success messages ---
  //#region
  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success m-3">Category Created Successfully.</h4>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger m-3">Failed To Create Category</h4>;
    }
  };
  const validationMessage = () => {
    if (validationError) {
      return (
        <h4 className="text-danger m-3">
          Category name must be 3 characters long.
        </h4>
      );
    }
  };
  //#endregion

  const createCategoryForm = () => {
    return (
      <form>
        <div className="form-group m-3">
          <p className="lead text-white">Enter category name.</p>
          <input
            className="form-control my-3"
            onChange={onChangeHandler}
            value={name}
            placeholder="Example - Summer Collection"
          />
          <button
            onClick={onSubmit}
            className="btn btn-outline-success rounded"
          >
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <AdminBase
      title="Create A Category"
      description="Add A New T-Shirt Category"
      className="container bg-info p-4"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {successMessage()}
          {errorMessage()}
          {validationMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </AdminBase>
  );
};

export default AddCategory;
