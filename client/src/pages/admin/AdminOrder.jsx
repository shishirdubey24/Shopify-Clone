/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

import moment from "moment";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://shopify-x-backend.onrender.com/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`https://shopify-x-backend.onrender.com/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Orders</h1>
            {orders.map((o, i) => (
              <div key={i} className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order ID: {o._id}</h5>
                  <Select
                    onChange={(value) => handleChange(o._id, value)}
                    defaultValue={o?.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {o?.products?.map((p, j) => (
                        <tr key={j}>
                          <th scope="row">{j + 1}</th>
                          <td>{p.name}</td>
                          <td>{p.description.substring(0, 30)}</td>
                          <td>${p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-muted">
                  Ordered {moment(o?.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
