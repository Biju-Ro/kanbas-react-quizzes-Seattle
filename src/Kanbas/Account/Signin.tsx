import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (error) {
      console.error("Caught: ", error);
      setError("Signin failed. Please try again.");
    }
  };

  return (
    <div
      id="wd-signin-screen"
      className="d-flex flex-column align-items-center justify-content-center vh-100"
    >
      <div className="card p-4 shadow-sm" style={{ width: "300px" }}>
        <h3 className="text-center mb-4">Sign in</h3>
        <input
          id="wd-username"
          placeholder="username"
          className="form-control mb-2"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          id="wd-password"
          placeholder="password"
          type="password"
          className="form-control mb-2"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {error && (
          <div className="alert alert-danger mb-2" role="alert">
            {error}
          </div>
        )}
        <button
          id="wd-signin-btn"
          className="btn btn-primary w-100 mb-2"
          onClick={signin}
          disabled={!credentials.username || !credentials.password}
        >
          Sign in
        </button>
        <Link
          id="wd-signup-link"
          to="/Kanbas/Account/Signup"
          className="text-center"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
