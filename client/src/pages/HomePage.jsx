import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";

const HomePage = () => {
  const [approvedDoctors, setApprovedDoctors] = useState([]);

  const fetchApprovedDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/users/getApprovedDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setApprovedDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApprovedDoctors();
  }, []);
  return (
    <Layout>
      <div className="h-full">
        <h2 className="text-center text-3xl">Doctors List</h2>
        <div className="grid grid-cols-3 gap-2 mt-4 h-[75vh] overflow-y-auto">
          {approvedDoctors.length > 0 &&
            approvedDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
