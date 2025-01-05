// import React from 'react';
import PropTypes from 'prop-types';
import  axios  from 'axios';

const ImageComponent = ({ src, alt, id }) => {
    const handleImgClick = async (pId) => {
        try {
          const { data } = await axios.get(`https://shopify-x-backend.onrender.com/api/v1/product/product-photo/${pId}`);
          const photoUrl = data.photoUrl;
          
          // Open the photo URL in a new tab
          window.open(photoUrl, '_blank');
        } catch (error) {
          console.log("Error fetching photo:", error);
        }
      };

  return (
    <img
      src={src}
      alt={alt}
      onClick={() => handleImgClick(id)}
      style={{ cursor: 'pointer', width: '100%', height: '200px', transition: 'transform 0.2s' }}
      className="card-img-top"
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    />

  );
};

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ImageComponent;
