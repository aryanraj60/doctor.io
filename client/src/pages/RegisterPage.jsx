import React, { useEffect, useState } from "react";
import doctorBg from "../assets/doctor-bg.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoading } from "../redux/features/loadSlice";

const RegisterPage = () => {
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const navigate = useNavigate();

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      dispatch(enableLoading());
      const response = await axios.post(
        "/api/v1/users/register",
        registerValues
      );

      dispatch(disableLoading());
      if (response.data.success) {
        navigateToLogin();
        toast("Successfully Registered!", {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      } else {
        toast(response.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 3000,
        });
      }
    } catch (e) {
      dispatch(disableLoading());
      console.log("Registration Error: " + e.message);
      toast("Unexpected Error", {
        theme: "light",
        closeOnClick: true,
        autoClose: 3000,
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
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Keanu Reeves"
                  required
                  onChange={(ev) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      name: ev.target.value,
                    }))
                  }
                />
              </div>
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
                    setRegisterValues((prev) => ({
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
                    setRegisterValues((prev) => ({
                      ...prev,
                      password: ev.target.value,
                    }))
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register Now
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
