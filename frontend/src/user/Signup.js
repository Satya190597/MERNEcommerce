import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          return;
        }
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log("SOMETHING WENT WRONG IN SIGNUP");
      });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Signup Successfully.<Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    let errorList = []
    if(error) {
        errorList = error
    }
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <ul>
            {errorList.map(element => {
                return <li>{element.msg}</li>
            })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-white">Name</label>
              <input
                value={name}
                type="text"
                className="form-control"
                onChange={onChangeHandler("name")}
              />
            </div>
            <div className="form-group">
              <label className="text-white">Email</label>
              <input
                value={email}
                type="email"
                className="form-control"
                onChange={onChangeHandler("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-white">Password</label>
              <input
                value={password}
                type="password"
                className="form-control"
                onChange={onChangeHandler("password")}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signup Page" description="User Signup">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-white">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
