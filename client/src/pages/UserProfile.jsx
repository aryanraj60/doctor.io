import React from "react";
import Layout from "../components/Layout";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="max-w-lg w-full">
          <Card>
            <div className="flex flex-col items-center pb-10">
              <div className="mb-3 h-20 w-20 bg-black text-white rounded-full shadow-lg flex justify-center items-center text-2xl">
                {user?.name[0]}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user?.name}
              </h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user?.email}
              </h5>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
