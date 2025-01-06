import  { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import {  Modal, Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true); // Open modal by default
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [_id, setProductId] = useState('');

  useEffect(() => {
    getSingleProduct();
    getAllCategories();
    //eslint ignore next line 
  }, []);

  useEffect(() => {
    showModal(); // Open modal when the component mounts
  }, []); // Add an empty dependency array to ensure this effect runs only once

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/get-product/${params.slug}`);
      if (response.data.success) {
        const { _id, name, price, description, category, quantity, shipping, photo } = response.data.product;
        setName(name);
        setPrice(price);
        setDescription(description);
        setSelectedCategory(category);
        setQuantity(quantity);
        // Convert shipping to boolean
        setShipping(shipping);
        // Set photo URL
        
        
          setFile(photo);
        
        setProductId(_id); 
      }
    } catch (error) {
      toast.error('Product not found');
    }
  };
  
  

  const getAllCategories = async () => {
    try {
      const response = await axios.get('https://shopify-x-backend.onrender.com/api/v1/category/allcategory');
      if (response.data.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch categories');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('category', selectedCategory);
      formData.append('description', description);
      formData.append('shipping', shipping);
      formData.append('file', file);

      const response = await axios.put(`https://shopify-x-backend.onrender.com/api/v1/product/update-product/${_id}`, formData); // Use _id for updating
      if (response.data.success) {
        toast.success('Product updated successfully');
        setIsModalVisible(false);
        navigate('/dashboard/admin/products');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://shopify-x-backend.onrender.com/api/v1/product/delete-product/${_id}`);
      if (response.data.success) {
        toast.success('Product deleted successfully');
        setIsModalVisible(false);
        navigate('/dashboard/admin/products');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate('/dashboard/admin/products'); // Navigate to products page after closing modal
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleFileChange = (e) => {
     // Get the selected file object from the input
  const selectedFile = e.target.files[0];
  // Set the file state with the selected file object
  setFile(selectedFile);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      icon: null,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <Layout title="Admin-UpdateProduct">
      <div className="row m-2">
        <div className="col-2">
          <AdminMenu />
        </div>
        <div className="col-8">
          <Modal title="Edit Product" open={isModalVisible} onOk={handleUpdate} onCancel={handleCancel} footer={[
            <Button key="delete"  className='btn btn-dnager' onClick={showDeleteConfirm}>
              Delete
            </Button>,
            <Button key="update" type="primary" onClick={handleUpdate}>
              Update
            </Button>,
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}>
            <Form>
              <Form.Item label="Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Price">
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Item>
              <Form.Item label="Quantity">
                <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  showSearch
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Item>
              <Form.Item label="Shipping">
                <Select value={shipping ? '1' : '0'} onChange={(value) => setShipping(value === '1')} placeholder="Select Shipping">
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Photo">
              {file && (
    <div className="mb-3">
      <img src={file instanceof Blob || file instanceof File ? URL.createObjectURL(file) : file} alt="Product" className="img-thumbnail" style={{ maxWidth: "200px", maxHeight: "200px" }} />
    </div>
  )}
                <input type="file" onChange={handleFileChange}  />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
