import React, { useContext, useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { register } from "../../utills/sharedFn/register";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData, setUser);
    navigate("/");
  };
  return (
    <div>
      <form action="" className="register">
        <h2>Sign up</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Username..."
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email..."
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password..."
        />
        <Link className="signUp" onClick={handleSubmit}>Sign up</Link>

        <div className="dontHaveAcc">
          <p>I already have an account</p>
          <Link
            to="/user-login"
            className="alreadyHaveAcc"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
