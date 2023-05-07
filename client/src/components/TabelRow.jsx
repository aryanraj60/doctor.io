import React from "react";
import { Table, Button } from "flowbite-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoading } from "../redux/features/loadSlice";

const TabelRow = ({ user }) => {
  const isDoctor = user.feePerConsult ? true : false;
  const dispatch = useDispatch();

  const approveDoctor = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/admin/approveDoctor",
        { doctorId: user.userId },
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

  const disapproveDoctor = async () => {
    try {
      dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/admin/disapproveDoctor",
        { doctorId: user.userId },
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

  const handleButtonClick = async () => {
    if (isDoctor) {
      if (user.status === "pending") {
        approveDoctor();
      } else if (user.status === "approved") {
        disapproveDoctor();
      } else if (user.status === "rejected") {
        approveDoctor();
      }
    }
  };

  return (
    <Table.Row className="bg-white">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
        {isDoctor ? `${user.firstName} ${user.lastName}` : user.name}
      </Table.Cell>
      <Table.Cell>{isDoctor ? user.status : user.email}</Table.Cell>
      <Table.Cell>
        {isDoctor ? user.email : user.isDoctor ? "Yes" : "No"}
      </Table.Cell>

      <Table.Cell>
        <Button
          onClick={handleButtonClick}
          className="w-[50%]"
          gradientMonochrome={
            isDoctor
              ? user.status === "pending" || user.status === "rejected"
                ? "success"
                : "failure"
              : "failure"
          }
        >
          {isDoctor
            ? user.status === "pending" || user.status === "rejected"
              ? "Approve"
              : "Reject"
            : "Block"}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default TabelRow;
