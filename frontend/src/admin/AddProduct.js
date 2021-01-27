import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories,createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
  const { data, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: false,
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  // Preload Function.
  const preload = () => {

    // Populate Category Dropdown.
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };


  useEffect(() => {
    preload();
  }, []);

  // Submit Product Details.
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:"",loading:true})
    createProduct(data._id,token,formData).then(data => {
      if(data.error) {
          console.log(error)
      }
      setValues({
        ...values,
        name:"",
        description: "",
        price: "",
        photo:"",
        stock: "",
        loading:false,
        createdProduct: data.name
      })
    })
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success mt-3" style={{display: createProduct ? "none" : "none"}}>
        <h4>{createProduct} created successfully.</h4>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className="alert alert-danger mt-3" style={{display: createProduct ? "none" : "none"}}>
        <h4>{createProduct} created successfully.</h4>
      </div>
    )
  }

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span className="m-3">Post photo</span>
      <div className="form-group m-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group m-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group m-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group m-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group m-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((element, index) => {
              return (
                <option key={index} value={element._id}>
                  {element.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group m-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success m-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product"
      description="Create A New Product"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md text-white bg-dark m-2">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded m-2">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
