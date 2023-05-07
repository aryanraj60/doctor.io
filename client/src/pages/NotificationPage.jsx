import React from "react";
import Layout from "../components/Layout";
import { Tabs, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoading } from "../redux/features/loadSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const markAllAsRead = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/admin/get-all-notifications",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(disableLoading());
      if (res.data.success) {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
        dispatch(setUser(res.data.data));
      } else {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (e) {
      dispatch(disableLoading());
      console.log(e);
      toast("Something went wrong", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const deleteAllNotifications = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/admin/delete-notifications",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(disableLoading());
      if (res.data.success) {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
        dispatch(setUser(res.data.data));
      } else {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (e) {
      dispatch(disableLoading());
      console.log(e);
      toast("Something went wrong", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  return (
    <Layout>
      <div className="h-full">
        <h2 className="text-center text-2xl">Notifications</h2>

        <Tabs.Group
          aria-label="Default tabs"
          style="underline"
          className="gap-2"
        >
          <Tabs.Item title="Read">
            {user?.seenNotifications?.length > 0 && (
              <div className="flex justify-end py-2">
                <Button
                  gradientMonochrome="info"
                  onClick={deleteAllNotifications}
                >
                  Delete All
                </Button>
              </div>
            )}
            <div className="h-[60vh] overflow-y-auto flex flex-col gap-2">
              {user?.seenNotifications?.map((noti) => (
                <Alert color="success" icon={HiInformationCircle} className="">
                  <span>{noti.message}</span>
                </Alert>
              ))}
            </div>
          </Tabs.Item>
          <Tabs.Item title="UnRead">
            {user?.notifications?.length > 0 && (
              <div className="flex justify-end py-2">
                <Button gradientMonochrome="info" onClick={markAllAsRead}>
                  Mark All as Read
                </Button>
              </div>
            )}
            <div className="h-[60vh] overflow-y-auto flex flex-col gap-2">
              {user?.notifications?.map((noti) => (
                <Alert
                  onClick={() => navigate(noti.data.onClickPath)}
                  color="success"
                  icon={HiInformationCircle}
                  className="cursor-pointer"
                >
                  <span>{noti.message}</span>
                </Alert>
              ))}
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </Layout>
  );
};

export default NotificationPage;
