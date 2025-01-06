// import React from "react";
import Layout from "../components/Layout/Layout";
import { Row, Col } from "antd"; // Import Ant Design components for grid layout

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container mt-5">
        <Row gutter={[16, 16]}> {/* Add gutter spacing between columns */}
          {/* Left column with image */}
          <Col xs={24} md={10}>
            <img
              src="/images/about.jpeg"
              alt="About Us"
              style={{ width: "100%", borderRadius: "8px" }} // Add border radius for image
            />
          </Col>
          {/* Right column with text content */}
          <Col xs={24} md={14}>
            <div className="p-4" style={{ border: "1px solid #e4e4e4", borderRadius: "8px" }}>
              <h2 className="mb-3">Our Story</h2>
              <p className="text-justify">
                Welcome to our world of creativity and innovation. At [Your Company Name], we strive to deliver the best products and services to our customers. Our journey began with a vision to make a difference in the world, and today, we are proud to have achieved many milestones along the way.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default About;
