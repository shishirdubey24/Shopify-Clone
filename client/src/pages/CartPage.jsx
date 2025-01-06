import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Layout from "../components/Layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios

const Message = styled.h2`
  color: ${(props) => (props.hasItems ? "#00cc00" : "#ff0000")};
  font-size: 1.5rem;
  text-align: center;
`;

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Calculate total price
  const total = cart.reduce((acc, c) => acc + c.price, 0);

  useEffect(() => {
    if (!auth.user) {
      const redirectTimer = setTimeout(() => {
        navigate("/login", { state: { from: location } });
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }
  }, [auth.user, navigate, location]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get("https://shopify-x-backend.onrender.com/api/v1/product/braintree/token");
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log("Error fetching token:", error);
      }
    };
    getToken();
  }, [auth?.token]);

  const handleRemove = (cartId) => {
    setCart((prevCart) => prevCart.filter((c) => c._id !== cartId));
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!instance) {
        console.error('DropIn instance is not initialized');
        setLoading(false);
        return;
      }
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Payment nonce:", nonce); // Debugging: Log the nonce
      const response = await axios.post("https://shopify-x-backend.onrender.com/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      console.log("Payment Response:", response.data); // Debugging: Log the payment response

      // Check the condition based on response status or data
      if (response.status === 200 && response.data.success) {
        console.log("Payment Completed Successfully");
        // Display success message or perform other actions
      } else {
        // Handle other conditions such as payment failure or errors
        console.log("Payment Failed:", response.data.message);
        if (response.data.type === "MERCHANT" && response.data.code === "PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED") {
          // Display error message related to PayPal sandbox account not being linked
          console.log("Error: A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developer.paypal.com/braintree/docs/guides/paypal/testing-go-live#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.");
        } else {
          // Handle other error conditions
          console.log("Error: An unknown error occurred.");
        }
        // Display error message or perform other actions
      }
    } catch (error) {
      console.log("Error processing payment:", error);
      setLoading(false);
      // Handle error condition
    }
  };

  return (
    <Layout title="Your Cart">
      <div className="container mt-5">
        <div className="cart-header text-center">
          <Message hasItems={cart.length}>
            {cart.length ? (
              <>
                You have {cart.length} items in your cart{" "}
                {!auth.token && <span>Please login to checkout</span>}
              </>
            ) : (
              "Your Cart Is Empty"
            )}
          </Message>
        </div>
        {auth?.user ? (
          <div className="row">
            <div className="col-md-8">
              {cart?.map((item) => (
                <div key={item._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.photo}
                        className="img-fluid rounded-start"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Price: ${item.price}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              {cart.length > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total</h5>
                    <p className="card-text">Total Items: {cart.length}</p>
                    <p className="card-text">Total Amount: ${total.toFixed(2)}</p>
                    <div className="mb-3">
                      <h4>Shipping Address</h4>
                      {auth?.user?.address ? (
                        <>
                          <p>{auth?.user?.address}</p>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Update Address
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Add Address
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                      <div className="m-2">

                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(newInstance) => setInstance(newInstance)}
                        />
                        <button
                          className="btn btn-primary m-3"
                          onClick={handlePayment}
                          disabled={loading || !instance || !auth?.user?.address}
                        >
                          {loading ? "Processing ...." : "Make Payment"}
                        </button>
                      </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            Redirecting to login page... Please login first.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
