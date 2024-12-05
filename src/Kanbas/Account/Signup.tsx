import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const currentUser = await client.signup({
        username: user.username,
        password: user.password,
        role: user.role,
      });
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div
      id="wd-signup-screen"
      className="d-flex flex-column align-items-center justify-content-center vh-100"
    >
      <div className="card p-4 shadow-sm" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Sign up</h3>
        {error && (
          <div className="alert alert-danger mb-2" role="alert">
            {error}
          </div>
        )}
        <input
          id="wd-username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="form-control mb-2"
          placeholder="username"
        />
        <input
          id="wd-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          className="form-control mb-2"
          placeholder="password"
        />
        <input
          id="wd-confirm-password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          type="password"
          className="form-control mb-2"
          placeholder="confirm password"
        />
        <select
          id="wd-role"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="form-select mb-2"
        >
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
        </select>
        <button
          id="wd-signup-btn"
          onClick={signup}
          className="btn btn-primary w-100 mb-2"
          disabled={
            !user.username ||
            !user.password ||
            !user.confirmPassword ||
            user.password !== user.confirmPassword
          }
        >
          Sign up
        </button>
        <Link
          id="wd-signin-link"
          to="/Kanbas/Account/Signin"
          className="text-center"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
