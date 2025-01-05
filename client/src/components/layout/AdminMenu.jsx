import { NavLink } from "react-router-dom";
import "./AdminMenu.css"; // Import CSS file for styling

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <ul className="admin-menu-list">
        <li className="admin-menu-item">
          <NavLink to="/dashboard/admin" className="admin-menu-link">
            All User
          </NavLink>
        </li>
        <li className="admin-menu-item">
          <NavLink to="/dashboard/admin/create-products" className="admin-menu-link">
            Create Product
          </NavLink>
        </li>
        <li className="admin-menu-item">
          <NavLink to="/dashboard/admin/edit-order" className="admin-menu-link">
            Edit Order
          </NavLink>
        </li>
       
        <li className="admin-menu-item">
          <NavLink to="/dashboard/admin/products" className="admin-menu-link">
             Product
          </NavLink>
        </li>
        <li className="admin-menu-item">
          <NavLink to="/dashboard/admin/create-category" className="admin-menu-link">
            Create Category
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
