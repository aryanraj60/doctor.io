import React, { useState } from "react";
import doctorBg from "../assets/doctor-bg.jpeg";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoading } from "../redux/features/loadSlice";

const LoginPage = () => {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleLogin = async (ev) => {
    ev.preventDefault();

    try {
      dispatch(enableLoading());
      const res = await axios.post("/api/v1/users/login", loginValues);
      dispatch(disableLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast("Login Successfully!", {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      } else {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (e) {
      dispatch(disableLoading());
      toast("Unexpected Error", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  return (
    <section className="relative min-h-screen">
      <img
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={doctorBg}
      />
      <div className="flex bg-transparent flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={(ev) =>
                    setLoginValues((prev) => ({
                      ...prev,
                      email: ev.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={(ev) =>
                    setLoginValues((prev) => ({
                      ...prev,
                      password: ev.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
