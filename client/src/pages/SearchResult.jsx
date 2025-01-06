/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import Layout from "../components/Layout/Layout";
import ProductCard from "../components/Product/ProductCard";

const Search = () => {
    const [values, setValues] = useSearch();
    return (
      <Layout title={"Search results"}>
        <div className="container">
          <div className="text-center">
            <h1>Search Resuts</h1>
            <h6>
              {values?.results.length < 1
                ? "No Products Found"
                : `Found ${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap mt-4">
              {values?.results.map((p) => (
               <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Search;