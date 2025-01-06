import  { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Prices } from '../components/spinner/Prices';
import { Radio } from 'antd';

import ProductCard from '../components/Product/ProductCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); 
  const [price, setPrice] = useState([]); 
  const [total, setTotal] = useState(0); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 


  // Fetch total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get('https://shopify-x-backend.onrender.com/api/v1/product/product-count');
      if (data.success) {
        setTotal(data.total);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch all categories
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

  // Handle checkbox changes
  const handleCheck = (e, id) => {
    const isChecked = e.target.checked;
    let updatedChecked = [...checked];
    
    if (isChecked && !updatedChecked.includes(id)) {
      updatedChecked.push(id);
    } else if (!isChecked && updatedChecked.includes(id)) {
      updatedChecked = updatedChecked.filter(c => c !== id);
    }

    setChecked(updatedChecked);
  };

  // Fetch products based on page number
  const getAllProducts = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/product-perpage/${pageNumber}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching products');
    }
  }, []);

  // Filter products based on checked categories and price
  const productFilter = useCallback(async () => {
    try {
      const res = await axios.post('https://shopify-x-backend.onrender.com/api/v1/product/product-filter', {
        checked,
        price
      });
      if (res.data.success) {
        setProducts(res.data.products);
        toast.success('Filtered data fetched');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while filtering products');
    }
  }, [checked, price]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const { data } = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/product-perpage/${nextPage}`);
      setLoading(false);
      if (data.products.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...data.products]);
        setPage(nextPage);
      } else {
        toast.info('All products have been loaded.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load more products');
      setLoading(false);
    }
  };

  // const searchResult = async(keyword) => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:7070/api/v1/product/product-search/${keyword}`);
  //     if (data.success) {
  //       setProducts(data.products);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Failed to search products');
  //   }
  // }

  useEffect(() => {
    getTotal();
    getAllCategories();
    getAllProducts(page);
  }, []);

  useEffect(() => {
    if (page > 1 || checked.length > 0 || price.length > 0) {
      productFilter();
    }
  }, [page, checked, price, productFilter]);

  return (
    <Layout title={'HomePage'}>
      <div className="row " >
        <img src='https://res.cloudinary.com/e-com-mern/image/upload/v1712478100/ecommerceImage/aussvejqw882ejlssybu.jpg' alt="" style={{height:'270px'}}/>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="mb-3">
              <h5>All Categories</h5>
              {categories?.map((c, index) => (
                <div key={c._id || index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={c._id} // Use the category ID as the value
                    id={`category-${c._id}`}
                    onChange={(e) => handleCheck(e, c._id)} // Arrow function for event handler
                  />
                  <label className="form-check-label" htmlFor={`category-${c._id}`}>
                    {c.name} 
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <h5>Filter By Price</h5>
              <Radio.Group onChange={(e) => setPrice(e.target.value)}>
                {Prices?.map((p, index) => (
                  <div key={index}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
              <button className='btn btn-danger' onClick={()=>window.location.reload()}>Reset Filter</button>
          </div>
          <div className="col-md-9">
            <h3>All Products</h3>
            <div className="row">
              {products?.map((p, index) => (
                <ProductCard key={p._id || index} product={p} />
              ))}
            </div>
            <div className="m-2 p-3">
              {products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={loadMore}
                  disabled={loading || (page * 10 >= total)}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default Home;
