/* eslint-disable react/prop-types */

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App-shopping",
  description: "Mern Stack Project",
  keywords: "Html,css,node,express,react,javaScript,mongoDb",
};

export default Layout;
