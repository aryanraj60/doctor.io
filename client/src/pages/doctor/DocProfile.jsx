import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ApplyDocForm from "../../components/ApplyDocForm";

const DocProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();

  const getDocDetails = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/getDoctorDetails", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDocDetails();
  }, []);
  return (
    <Layout>
      <div className="">
        <h2 className="text-3xl text-center">Manage Profile</h2>
        {doctor && (
          <ApplyDocForm user={user} dispatch={dispatch} docDetails={doctor} />
        )}
      </div>
    </Layout>
  );
};

export default DocProfile;
