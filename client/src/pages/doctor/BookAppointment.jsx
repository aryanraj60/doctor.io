import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { enableLoading, disableLoading } from "../../redux/features/loadSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function getAMorPM(timeValue) {
  const [hours, minutes] = timeValue.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.getHours() >= 12 ? "PM" : "AM";
}

const BookAppointment = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingAvailable, setBookingAvailable] = useState(false);

  const getDocDetails = async (userId) => {
    try {
      const res = await axios.post(
        "/api/v1/users/getDoctorById",
        { doctorId: userId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookAppointment = async () => {
    try {
      dispatch(enableLoading());
      const appointmentDetails = {
        userId: user._id,
        doctorId: params.id,
        doctorInfo: doctor,
        userInfo: user,
        date: date,
        time: time,
      };
      const res = await axios.post(
        "/api/v1/users/book-doctor-appointment",
        { appointmentDetails },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(disableLoading());
      if (res.data.success) {
        toast("Appointment Booked Successfully", {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      } else {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (err) {
      dispatch(disableLoading());
      toast("Unexpected error", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const checkAvailability = async () => {
    try {
      // dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/users/check-booking-availability",
        { date, time, doctorId: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // dispatch(disableLoading());
      if (res.data.success) {
        setBookingAvailable(true);
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      } else {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (err) {
      // dispatch(disableLoading());
      toast("Unexpected error", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    if (bookingAvailable) {
      bookAppointment();
    } else {
      checkAvailability();
    }
  };

  useEffect(() => {
    if (params.id) {
      getDocDetails(params.id);
    }
  }, []);
  return (
    <Layout>
      {doctor && (
        <>
          <h2 className="text-3xl text-center">
            Book Appointment with Dr. {doctor?.firstName} {doctor?.lastName}
          </h2>
          <div>
            <form
              onSubmit={handleFormSubmit}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h2>
                <p className="mt-2 text-gray-600">
                  Specialization: {doctor.speciality}
                </p>
                <p className="mt-2 text-gray-600">
                  Timing:{" "}
                  {`${doctor.timing.startTime} ${getAMorPM(
                    doctor.timing.startTime
                  )}`}{" "}
                  -{" "}
                  {`${doctor.timing.endTime} ${getAMorPM(
                    doctor.timing.endTime
                  )}`}
                </p>
                <p className="mt-2 text-gray-600">
                  Fees: ₹{doctor.feePerConsult} per consultation
                </p>
              </div>
              <div className="p-4">
                <div className="flex gap-2">
                  <div className="w-full">
                    <div className="mb-2">
                      <Label
                        htmlFor="date"
                        value="Select Date"
                        className="text-base"
                      />
                    </div>
                    <TextInput
                      id="date"
                      type="date"
                      required={true}
                      onChange={(ev) => {
                        setBookingAvailable(false);
                        setDate(ev.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <Label
                        htmlFor="time"
                        value="Select Time"
                        className="text-base"
                      />
                    </div>
                    <TextInput
                      id="time"
                      type="time"
                      required={true}
                      onChange={(ev) => {
                        setBookingAvailable(false);
                        setTime(ev.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-100 flex flex-col items-center">
                {!bookingAvailable && (
                  <button
                    disabled={bookingAvailable && true}
                    type="submit"
                    className="px-4 py-2 bg-blue-500 w-48 text-white rounded-lg hover:bg-blue-600"
                  >
                    Check Availability
                  </button>
                )}
                {bookingAvailable && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black w-48 text-white rounded-lg hover:bg-blue-600"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </Layout>
  );
};

export default BookAppointment;
