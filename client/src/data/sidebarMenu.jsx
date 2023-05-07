import { AiFillHome } from "react-icons/ai";
import { RxLapTimer } from "react-icons/rx";
import { BiInjection } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome size={25} />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <RxLapTimer size={25} />,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <BiInjection size={25} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <CgProfile size={25} />,
  },
];

export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome size={25} />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <CgProfile size={25} />,
  },
  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: <BiInjection size={25} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <CgProfile size={25} />,
  },
];

const doctorMenuGenerator = (_id) => {
  return [
    {
      name: "Home",
      path: "/",
      icon: <AiFillHome size={25} />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <RxLapTimer size={25} />,
    },
    {
      name: "Profile",
      path: `/doctor/profile/${_id}`,
      icon: <CgProfile size={25} />,
    },
  ];
};

export { doctorMenuGenerator };
