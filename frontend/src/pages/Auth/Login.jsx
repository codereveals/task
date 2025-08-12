import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosIntance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext); // ✅ Corrected here
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        updateUser(response.data); // ✅ Corrected here

        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      }
    } catch (error) {
      if (error.response?.data) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="h-3/4 md:h-full w-full flex flex-col justify-center items-center mx-auto">
        <h3 className="text-xl font-bold">Welcome Back</h3>
        <p>Please enter your details to login</p>

        <form onSubmit={handleLogin} className="w-full mt-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email Address"
            placeholder="john@example.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            placeholder="Min. 6 characters"
          />

          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}

          <button
            type="submit"
            className="w-full h-12 bg-primary text-white rounded mt-4 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Login
          </button>

          <p className="text-[13px] text-slate-600 mt-4 text-end">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
