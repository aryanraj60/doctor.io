import React, { useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import ApplyDocForm from "../components/ApplyDocForm";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Layout>
      <div className="">
        <h2 className="text-3xl text-center">Apply Doctor</h2>
        <ApplyDocForm user={user} dispatch={dispatch} />
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
