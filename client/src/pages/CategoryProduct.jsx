import  { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import ProductCard from '../components/Product/ProductCard';

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();

  const getProductByCategory = async () => {
    try {
      const response = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/product-bycategory/${params.slug}`);
      if (response.data.success) {
        setProducts(response.data.products);
        setCategory(response.data.category);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch products by category');
    }
  }

  useEffect(() => {
    if (params?.slug) {
      getProductByCategory();
    }
  }, [params.slug]);

  return (
    <Layout title={'By Category'}>
      <div className="container mt-5">
        <h2 className="text-center mb-4">{category.name}</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, index) => (
          <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
