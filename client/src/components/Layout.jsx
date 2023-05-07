import React from "react";
import { userMenu, adminMenu, doctorMenuGenerator } from "../data/sidebarMenu";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { AiFillBell } from "react-icons/ai";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Rendering Menu List
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor === true
    ? doctorMenuGenerator(user?._id)
    : userMenu;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    toast("Logout Successfull!", {
      theme: "light",
      closeOnClick: true,
      autoClose: 1000,
    });
  };

  return (
    <div className="main h-screen">
      <div className="flex h-full gap-5">
        <div className="layout h-full p-2.5 min-w-[300px] bg-blue-300 text-gray-800">
          <div className="sidebar h-full flex flex-col">
            <h2 className="text-2xl font-semibold text-center mt-5">
              DOCTOR.io
            </h2>
            <div className="flex-grow mt-16">
              <div className="flex flex-col gap-10 pl-1">
                {sidebarMenu.map((sidebar, index) => {
                  const isActive = location.pathname === sidebar.path;
                  return (
                    <Link
                      to={sidebar.path}
                      key={index}
                      className="flex gap-2 items-center cursor-pointer py-2 rounded-xl pl-2"
                      style={{
                        backgroundColor: isActive && "black",
                        color: isActive && "white",
                      }}
                    >
                      {sidebar.icon}
                      <p className="text-lg">{sidebar.name}</p>
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center cursor-pointer py-2 rounded-xl pl-2"
                >
                  <MdLogout size={25} />
                  <p className="text-lg">Logout</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="content flex-grow flex flex-col gap-2 py-2 pr-2">
          <div className="header p-2 flex justify-end pr-5 bg-blue-400 rounded-lg">
            <div className="flex gap-3 items-center relative">
              <Link
                to="/profile"
                className="w-10 h-10 relative p-1 flex items-center justify-center bg-black text-white text-xl rounded-full ring-2 ring-slate-300"
              >
                {user?.name[0]}
              </Link>
              <AiFillBell
                size={25}
                className="cursor-pointer"
                onClick={() => navigate("/notifications")}
              />
              {user?.notifications.length > 0 && (
                <div className="px-2 py-1 -right-2 -top-1 text-white bg-red-500 rounded-full absolute text-xs">
                  {user.notifications.length}
                </div>
              )}
            </div>
          </div>
          <div className="body flex-grow p-2 mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
