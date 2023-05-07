import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "flowbite-react";
import AppointmentTabelRow from "../../components/AppointmentTabelRow";

const DocAppointment = () => {
  const [docAppointments, setDocAppointments] = useState([]);

  const getDocAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/getDoctorAppointmentsById", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDocAppointments(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDocAppointments();
  }, []);
  return (
    <Layout>
      <div>
        <h2 className="text-2xl text-center">Appointments</h2>
        <div className="h-full mt-5">
          <Table striped={true}>
            <Table.Head>
              <Table.HeadCell>Patient Name</Table.HeadCell>
              <Table.HeadCell>Time</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {docAppointments?.map((userAppointment) => (
                <AppointmentTabelRow
                  key={userAppointment._id}
                  userAppointment={userAppointment}
                />
              ))}
            </Table.Body>
          </Table>
          {/* {doctors.length > 6 && (
              <div className="flex justify-end">
                <PaginationComp
                  totalUsers={doctors.length}
                  usersPerPage={doctorsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )} */}
        </div>
      </div>
    </Layout>
  );
};

export default DocAppointment;
