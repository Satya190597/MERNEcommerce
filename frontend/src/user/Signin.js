import React,{useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";

const SignIn = () => {
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-white">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <button className="btn btn-success btn-block form-control">SignIn</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="SignIn Page" description="User SignIn">
            {signInForm()}
        </Base>
    )
}

export default SignIn;