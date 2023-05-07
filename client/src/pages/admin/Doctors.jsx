import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "flowbite-react";
import axios from "axios";
import TabelRow from "../../components/TabelRow";
import PaginationComp from "../../components/PaginationComp";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage, setDoctorsPerPage] = useState(6);

  const lastDoctorIndex = currentPage * doctorsPerPage;
  const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;
  const currentDoctors = doctors.slice(firstDoctorIndex, lastDoctorIndex);

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <Layout>
      <div className="h-full">
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {currentDoctors?.map((user) => (
              <TabelRow key={user._id} user={user} />
            ))}
          </Table.Body>
        </Table>
        {doctors.length > 6 && (
          <div className="flex justify-end">
            <PaginationComp
              totalUsers={doctors.length}
              usersPerPage={doctorsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Doctors;
