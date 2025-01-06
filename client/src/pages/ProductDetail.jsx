import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from '../components/Product/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const res = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/get-product/${params.slug}`);
      setProduct(res.data.product);
      getSimilarProducts(res.data.product._id, res.data.product.category._id);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const getSimilarProducts = async (id, category_id) => {
    try {
      const { data } = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/similar-product/${id}/${category_id}`);

      if (data?.success) {
        setRelatedProducts(data?.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong fetching similar products');
    }
  };

  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params.slug]);

  return (
    <Layout title='Product Details'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <img src={product.photo} alt={product.name} className="img-fluid mb-3" />
          </div>
          <div className="col-md-7">
            <h2>{product.name}</h2>
            <p className="text-muted">Description: {product.description}</p>
            <p className="text-muted ">Category: {product?.category?.name}</p>
            <p className="text-success">Price: ${product.price}</p>
            <button className="btn btn-warning" onClick={()=>setCart([...cart,product])}>Add to Cart</button>
            
          
          </div>
        </div>
        <hr />
       <div className="row mt-3 ">
            <h3>Related Products</h3>
        {relatedProducts.length < 1 && <p>No related products found</p>}
       
        
          <div className="row mt-4">
           
            {relatedProducts.map((r) => (
              <ProductCard key={r._id} product={r} />
            ))}
          </div>
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
