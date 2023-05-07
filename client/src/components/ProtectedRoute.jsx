import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { enableLoading, disableLoading } from "../redux/features/loadSlice";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const getUserData = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/users/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(disableLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.removeItem("token");
      }
    } catch (e) {
      dispatch(disableLoading());
      console.log(e);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (!user && token) {
      getUserData();
    }
  }, [user, token]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
