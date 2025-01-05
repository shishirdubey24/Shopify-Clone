
import { NavLink } from "react-router-dom";

const UserMenue = () => {
  return (
    <div className="bg-light p-4 rounded">
      <h5 className="mb-3">Menu</h5>
      <ul className="list-group">
        <li className="list-group-item border-0">
          <NavLink
            to="/dashboard/user/profile"
            className="text-dark"
            style={{ textDecoration: "none" }}
            activeclassname="fw-bold"
          >
            Profile
          </NavLink>
        </li>
        <li className="list-group-item border-0">
          <NavLink
            to="/dashboard/user/order"
            className="text-dark"
            style={{ textDecoration: "none" }}
            activeclassname="fw-bold"
          >
            Order
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenue;
