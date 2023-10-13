import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success d-flex justify-content-center p-1">
        <Link className="navbar-brand fs-1 fst-italic mx-3" to="/">
          Seth Kitchen
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row ">
          <li className="nav-item">
            <Link className="nav-link text-white mx-3 " to="/">
              Home
            </Link>
          </li>
          {localStorage.getItem("authToken") ? (
            <li className="nav-item">
              <Link className="nav-link text-white mx-1 " to="/">
                My Orders
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        <div className="d-flex">
          {localStorage.getItem("authToken") ? (
            <>
              <Link className="btn bg-white text-success mx-1" to="/">
                My Cart
              </Link>
              <Link className="btn bg-white text-danger mx-1" to="/login" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
