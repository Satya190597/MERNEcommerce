import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children = "<h1>Hello World</h1>",
}) => {
  return (
    <div className="flex-container">
      <div className="flex-row-top">
        <Menu />
        <div className="container-fluid">
          <div className="jumbotron bg-dark text-white text-center">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
          </div>
        </div>
        <div className={className} style={{marginBottom:'10px'}}>{children}</div>
      </div>
      <div className="flex-row-bottom">
        <footer className="p-3">
          <div className="container-fluid bg-success text-white text-center">
            <h1>If you got any questions, feel free to reach out!</h1>
            <button className="btn btn-warning btn-log">Contact Us</button>
          </div>
          <div className="container">
            <span className="text-muted">An amazing place to buy T-shirt.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Base;
