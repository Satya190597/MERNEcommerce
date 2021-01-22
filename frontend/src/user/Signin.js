import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signIn, authenticate, isAuthenticated } from "../auth/helper";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    apiError: undefined,
    apiErrors: undefined,
    success: false,
  });

  const { email, password, error, loading, didRedirect, apiError, apiErrors,success } = values;

  const { user } = isAuthenticated();

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // SETUP A LOADING SCREEN.
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });
    signIn({ email, password }).then((data) => {
      if (!data.token) {
        setValues({
          ...values,
          error: true,
          apiError: data.error,
          apiErrors: data.errors,
        });
        return false;
      }
      authenticate(data, () => {
        setValues({
          ...values,
          email: "",
          password: "",
          loading: false,
          success: true
        });
      });
    });
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{display:error ? "" : "none"}}>
            {getError()}
          </div>
        </div>
      </div>
    )
  }
  
  const handleRedirect = () => {
    if(success) {
      if(isAuthenticated()) {
        return <Redirect to="/user/dashboard" />
      }
    }
  }

  const getError = () => {
    if(!apiErrors && !apiError) 
    {
      return;
    }
    if(apiError) {
      return apiError
    }
    return (
      <ul>
        {
          apiErrors.map((error) => <li>{error.msg}</li>)
        }
      </ul>
    )
  }

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-white">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={onChangeHandler("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-white">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={onChangeHandler("password")}
              />
            </div>
            <p>{JSON.stringify(values)}</p>
            <button
              className="btn btn-success btn-block form-control"
              onClick={onSubmit}
            >
              SignIn
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="SignIn Page" description="User SignIn">
      {signInForm()}
      {errorMessage()}
      {handleRedirect()}
    </Base>
  );
};

export default SignIn;
