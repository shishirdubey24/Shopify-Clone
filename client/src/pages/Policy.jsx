// import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={'Policies'}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
          <img
              src="/images/about.jpeg"
              alt="About Us"
              style={{ width: "100%", borderRadius: "8px" }} // Add border radius for image
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">Privacy Policy</h2>
            <p>
              We take your privacy seriously and are committed to protecting your personal information. Our Privacy Policy outlines how we collect, use, and disclose your information when you use our services.
            </p>
            <p>
              We collect information such as your name, email address, and contact details to provide you with our services. We use this information to communicate with you, process your orders, and improve our services.
            </p>
            <p>
              We do not sell or share your personal information with third parties for marketing purposes. However, we may share your information with trusted partners who assist us in providing our services.
            </p>
            <p>
              By using our services, you consent to the collection and use of your information as outlined in our Privacy Policy. If you have any questions or concerns about our Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
