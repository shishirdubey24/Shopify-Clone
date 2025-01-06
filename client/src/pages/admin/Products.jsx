// Import useState, useEffect, and useCallback hooks from React
import { useState, useEffect, useCallback } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ImageComponent from "../../components/Product/Image";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Function to fetch all products
  const getAllProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/api/v1/product/get-products");
      setProducts(data.products);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    }
  }, []);

  // Load products on component mount
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Function to handle product deletion
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`https://shopify-x-backend.onrender.com/api/v1/product/delete-product/${productId}`);
      if (response.data.success) {
        toast.success('Product deleted successfully');
        getAllProducts(); // Reload products after deletion
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    }
  };

  // Function to convert boolean shipping value to string representation
  const getShippingLabel = (isShipping) => {
    return isShipping ? 'Yes' : 'No';
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <ImageComponent src={p.photo}  alt={p.name} id={p._id} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">Price: ${p.price}</p>
                  <p className="card-text">Quantity: {p.quantity}</p>
                  <p className="card-text">Description: {p.description}</p>
                  <p className="card-text">Shipping: {getShippingLabel(p.shipping)}</p> {/* Convert boolean to string */}
                  <div className="d-flex justify-content-between">
                    <Link to={`/dashboard/admin/update-product/${p.slug}`} className="btn btn-primary">
                      Update
                    </Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
