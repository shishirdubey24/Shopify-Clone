import  { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";

import CategoryForm from './form/CategoryForm';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    getAllCategories();
  },[]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://shopify-x-backend.onrender.com/api/v1/category/allcategory"
      );
      if (response.data.success) {
        setCategories(response.data.category);
        toast.success(response.data.message);
      }
    } catch (error) {
      handleError(error, "An error occurred while fetching categories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://shopify-x-backend.onrender.com/api/v1/category/create-category",
        { name }
      );
      if (response.data.success) {
        getAllCategories();
        toast.success(`${name} is created`);
        setName("");
      }
    } catch (error) {
      handleError(error, "An error occurred while creating the category.");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `https://shopify-x-backend.onrender.com/api/v1/category/deletecategory/${categoryId}`
      );
      if (response.data.success) {
        getAllCategories();
        toast.success(response.data.message);
      }
    } catch (error) {
      handleError(error, "An error occurred while deleting the category.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://shopify-x-backend.onrender.com/api/v1/category/update-category/${editCategoryId}`,
        { name }
      );
      if (response.data.success) {
        getAllCategories();
        toast.success('all categories fetched');
        setName("");
        setEditCategoryId(null);
        setIsModalVisible(false);
      }
    } catch (error) {
      handleError(error, "An error occurred while updating the category.");
    }
  };

  const handleError = (error, errorMessage) => {
    toast.error(
      error.response && error.response.data
        ? error.response.data.message
        : errorMessage
    );
  };

  const handleDeleteModal = (categoryId) => {
    setEditCategoryId(categoryId);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    handleDelete(editCategoryId);
    setIsDeleteModalVisible(false);
  };

  return (
    <Layout title="admin-CreateCategory">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <AdminMenu />
          </div>
          <div className="col">
            <h3 className="my-4">Category</h3>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.slug}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setIsModalVisible(true);
                          setEditCategoryId(category._id);
                          setName(category.slug);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteModal(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            open={isModalVisible}
          >
            <CategoryForm
              handleSubmit={handleEdit}
              name={name}
              setName={setName}
            />
          </Modal>
          <Modal
            title="Delete Category"
            open={isDeleteModalVisible}
            onOk={confirmDelete}
            onCancel={() => setIsDeleteModalVisible(false)}
            okText="Confirm"
            cancelText="Cancel"
          >
            Are you sure you want to delete this category?
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
