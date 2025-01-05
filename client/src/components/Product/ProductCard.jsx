/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ImageComponent from './Image';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  const addToCart = () => {
    setAddingToCart(true); 
    setTimeout(() => {
      setCart([...cart, product]);
      setAddingToCart(false); 
    }, 1000); 
  };

  const isProductInCart = cart.some(item => item._id === product._id);

  return (
    <div key={product._id || index} className="col-md-4 mb-3">
      <div className="card h-100">
       <ImageComponent src={product.photo} alt={product.name} id={product._id} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Description: {product.description}</p>
          <p className="card-text">Price: ${product.price}</p>
          <div className='row '>
  <button className="col btn btn-primary m-1" onClick={() => navigate(`/product-detail/${product.slug}`)}>More Details</button>
  <button className={`col m-1 btn btn-warning ${isProductInCart ? 'disabled' : ''}`} onClick={addToCart} disabled={isProductInCart}>
    {isProductInCart ? 'Added to Cart' : 'ADD TO CART'}
  </button>
</div>



          {addingToCart && <p className="text-success">Adding to Cart...</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
