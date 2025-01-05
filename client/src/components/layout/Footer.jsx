// import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-light text-center p-3">
      <h3>🛒@Reserved</h3>
      <div className="footer ">
        <Link to="/about">AboutUs</Link>|<Link to="/contact">Contact</Link>|{" "}
        <Link to="/policy">Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
