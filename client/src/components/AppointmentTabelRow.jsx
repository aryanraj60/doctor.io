import React from "react";
import { Table, Button } from "flowbite-react";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoading } from "../redux/features/loadSlice";
import { useSelector } from "react-redux";

const AppointmentTabelRow = ({ userAppointment }) => {
  const { name } = userAppointment.userInfo;
  const { status, time, date } = userAppointment;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const approveAppointment = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        `/api/v1/doctor/updateAppointmentStatus`,
        {
          appointmentId: userAppointment._id,
          status: "approved",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(disableLoading());
      if (res.data.success) {
        toast("Appointment Approved Successfully", {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (err) {
      dispatch(disableLoading());
      console.error(err);
      toast("Something Went Wrong", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const rejectAppointment = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        `/api/v1/doctor/updateAppointmentStatus`,
        {
          appointmentId: userAppointment._id,
          status: "rejected",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(disableLoading());
      if (res.data.success) {
        toast("Appointment Approved Successfully", {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (err) {
      dispatch(disableLoading());
      console.error(err);
      toast("Something Went Wrong", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  return (
    <Table.Row className="bg-white">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
        {user?.isDoctor
          ? name
          : `${userAppointment.doctorInfo.firstName} ${userAppointment.doctorInfo.lastName}`}
      </Table.Cell>
      <Table.Cell>
        {moment(date).format("YYYY-DD-MM")} - {moment(time).format("h:mm a")}
      </Table.Cell>
      <Table.Cell>{status}</Table.Cell>

      {userAppointment.status === "pending" && user.isDoctor && (
        <Table.Cell className="flex gap-2">
          <Button gradientMonochrome={"success"} onClick={approveAppointment}>
            Approve
          </Button>
          <Button gradientMonochrome={"failure"} onClick={rejectAppointment}>
            Reject
          </Button>
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default AppointmentTabelRow;
