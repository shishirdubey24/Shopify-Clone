import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
import UserMenue from '../../components/Layout/UserMenu';
import moment from "moment";
import ImageComponent from "../../components/Product/Image";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://shopify-x-backend.onrender.com/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout title={"Your Orders"}>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenue />
          </div>
          <div className="col-md-9">
            <h3 className="mb-4">Order History</h3>
            {orders.map((order, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <span className={`badge ${getBadgeColor(order.status)} rounded-pill`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="row">
                    {order.products.map((product, i) => (
                      <div key={i} className="col-md-6 mb-3">
                        <div className="card flex-row h-100">
                          <div className="card-img-left">
                            <ImageComponent
                              src={product.photo}
                              alt={product.name}
                              id={product._id}
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description.substring(0, 100)}</p>
                            <p className="card-text">Price: {product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="card-text">
                    <small className="text-muted">Ordered {moment(order.createdAt).fromNow()}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper function to determine badge color based on order status
const getBadgeColor = (status) => {
  switch (status) {
    case "Not Process":
      return "bg-secondary";
    case "Processing":
      return "bg-warning";
    case "Shipped":
      return "bg-info";
    case "Delivered":
      return "bg-success";
    case "Cancel":
      return "bg-danger";
    default:
      return "bg-light";
  }
};
export default Orders;
