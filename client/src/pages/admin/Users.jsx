import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("https://shopify-x-backend.onrender.com/api/v1/auth/all-users");
      setUsers(data);
    } catch (error) {
      toast.error("Error in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [auth?.user]);

  return (
    <Layout title="All Users">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 bg-light border-right">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-primary">Welcome, {auth?.user.name}</h1>
            <div className="list-group">
              {users.map((user) => (
                <div key={user._id} className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{user.name}</h5>
                    <small>Role: {user.role}</small>
                  </div>
                  <p className="mb-1">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
