import React,{useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";

const Signup = () => {

    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-white">Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <button className="btn btn-success btn-block form-control">Signup</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Signup Page" description="User Signup">
            {signupForm()}
        </Base>
    )
}

export default Signup;