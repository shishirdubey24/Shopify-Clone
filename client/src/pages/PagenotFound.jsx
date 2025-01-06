// import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout title={'404-PagenotFound'}>
      <div className="row text-center mt-5">
        <h1 className="fs-1 fw-bold">404</h1>
        <h2>Oops ! Page not found</h2>

        <Link className="text-decoration-none " to="/">
          <button className="btn btn-info m-3">Go Back</button>
        </Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
