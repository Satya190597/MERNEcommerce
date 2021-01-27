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
        
        <div className="">
          <div className="text-white text-center">
            <div>
              <div style={{backgroundColor:"#5000ca",margin:0}}>
              <h2 className="display-4" style={{margin:0}}>{title}</h2>
              <p className="lead" style={{margin:0}}>{description}</p>
              </div>
              <svg style={{position:"relative",display:"block",margin:0,padding:0,border:0}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#5000ca" fill-opacity="1" d="M0,160L30,181.3C60,203,120,245,180,218.7C240,192,300,96,360,90.7C420,85,480,171,540,186.7C600,203,660,149,720,144C780,139,840,181,900,186.7C960,192,1020,160,1080,149.3C1140,139,1200,149,1260,160C1320,171,1380,181,1410,186.7L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
            </div>
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
