import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

function getAMorPM(timeValue) {
  const [hours, minutes] = timeValue.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.getHours() >= 12 ? "PM" : "AM";
}

const DoctorCard = ({ doctor }) => {
  return (
    <div className="">
      <Card className="">
        <div className="flex flex-col items-center pb-6 text-base">
          {/* <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          /> */}
          <h5 className="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            {`${doctor.firstName} ${doctor.lastName}`}
          </h5>
          <p className="text-gray-500">
            Speciality -{" "}
            <span className="font-semibold">{doctor.speciality}</span>
          </p>
          <p className="text-gray-500">
            Phone - <span className="font-semibold">{doctor.phone}</span>
          </p>
          <p className="text-gray-500">
            Experience -{" "}
            <span className="font-semibold">{doctor.experience}</span>
          </p>
          <p className="text-gray-500">
            Fees - ₹
            <span className="text-red-600 font-semibold">
              {doctor.feePerConsult}
            </span>
          </p>
          <p className="text-gray-500">
            Timing -{" "}
            <span className="text-red-600 font-semibold">
              {`${doctor.timing.startTime} ${getAMorPM(
                doctor.timing.startTime
              )}`}
            </span>{" "}
            -{" "}
            <span className="text-red-600 font-semibold">
              {`${doctor.timing.endTime} ${getAMorPM(doctor.timing.endTime)}`}
            </span>
          </p>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Link
              to={`/book-appointment/${doctor.userId}`}
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorCard;
