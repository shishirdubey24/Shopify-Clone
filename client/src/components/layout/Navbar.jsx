/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import SearchInputForm from "../../pages/admin/form/SearchInputForm";
import useCategory from "../../hooks/CategoryHook";
import { useCart } from "../../context/CartContext";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Navbar = () => {
  const category = useCategory();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Successfully logged out");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand text-success">
          🛒SHOPIFY-X
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                to="/category"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={`/category`} className="dropdown-item">
                  All Category
                </Link>
                {category.map((c) => (
                  <li key={c._id}>
                    <Link to={`/category/${c.slug}`} className="dropdown-item">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <SearchInputForm />
          <ul className="navbar-nav">
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                <Badge count={cart.length} overflowCount={99}>
                  <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
