import React, { useEffect, useState } from "react";
import { TextInput, Label } from "flowbite-react";
import { toast } from "react-toastify";
import axios from "axios";

import { enableLoading, disableLoading } from "../redux/features/loadSlice";

const ApplyDocForm = ({ user, dispatch, docDetails }) => {
  const [formValues, setFormValues] = useState({
    firstName: docDetails?.firstName || "",
    lastName: docDetails?.lastName || "",
    phone: docDetails?.phone || "",
    email: docDetails?.email || "",
    website: docDetails?.website || "",
    address: docDetails?.address || "",
    speciality: docDetails?.speciality || "",
    experience: docDetails?.experience || 0,
    feePerConsult: docDetails?.feePerConsult || 0,
    timing: {
      startTime: docDetails?.timing.startTime || "",
      endTime: docDetails?.timing.endTime || "",
    },
  });

  const createDoctor = async () => {
    try {
      const doctorInfo = {
        ...formValues,
        userId: user._id,
      };
      dispatch(enableLoading());
      const res = await axios.post("/api/v1/users/apply-doctor", doctorInfo, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(disableLoading());
      if (res.data.success) {
        toast("Successfully Applied for Doctor Account", {
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
    } catch (e) {
      console.log(e);
      dispatch(disableLoading());
      toast("Something went wrong", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const updateDoctor = async () => {
    try {
      const doctorDetail = {
        ...formValues,
        userId: user._id,
      };
      dispatch(enableLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateDoctorDetails",
        { doctorDetail },
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
      } else {
        toast(res.data.message, {
          theme: "light",
          closeOnClick: true,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch(disableLoading());
      toast("Something went wrong", {
        theme: "light",
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (docDetails) {
      updateDoctor();
    } else {
      createDoctor();
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h2 className="text-3xl my-2 mb-4">Personal Details: </h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="mb-2">
            <Label htmlFor="firstName" value="First Name" className="text-xl" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            placeholder="Keanu"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                firstName: ev.target.value,
              }))
            }
            value={formValues.firstName}
          />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="lastName" value="Last Name" className="text-xl" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Revees"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                lastName: ev.target.value,
              }))
            }
            value={formValues.lastName}
          />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="phone" value="Phone Number" className="text-xl" />
          </div>
          <TextInput
            id="phone"
            type="text"
            placeholder="Phone Number"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({ ...prev, phone: ev.target.value }))
            }
            value={formValues.phone}
          />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="email" value="Email" className="text-xl" />
          </div>
          <TextInput
            id="email"
            type="text"
            placeholder="Your Email Address"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({ ...prev, email: ev.target.value }))
            }
            value={formValues.email}
          />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="website" value="Website" className="text-xl" />
          </div>
          <TextInput
            id="website"
            type="url"
            placeholder="Your Website Url"
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                website: ev.target.value,
              }))
            }
            value={formValues.website}
          />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="address" value="Address" className="text-xl" />
          </div>
          <TextInput
            id="address"
            type="text"
            placeholder="Your Clinic Address"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                address: ev.target.value,
              }))
            }
            value={formValues.address}
          />
        </div>
      </div>
      <h2 className="text-3xl mt-6 mb-4">Professional Details: </h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="mb-2">
            <Label
              htmlFor="specialization"
              value="Your Specialization"
              className="text-xl"
            />
          </div>
          <TextInput
            id="specialization"
            type="text"
            placeholder="Enter Your Specialization"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                speciality: ev.target.value,
              }))
            }
            value={formValues.speciality}
          />
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="exp" value="Your Experience" className="text-xl" />
          </div>
          <TextInput
            id="exp"
            type="number"
            min={0}
            placeholder="Enter Your Experience"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                experience: ev.target.value,
              }))
            }
            value={formValues.experience}
          />
        </div>

        <div>
          <div className="mb-2">
            <Label
              htmlFor="fees"
              value={`Your Fees Per Consultancy (in ₹)`}
              className="text-xl"
            />
          </div>
          <TextInput
            id="fees"
            type="number"
            min={0}
            placeholder="Enter Your Fees Per Consultancy"
            required={true}
            onChange={(ev) =>
              setFormValues((prev) => ({
                ...prev,
                feePerConsult: ev.target.value,
              }))
            }
            value={formValues.feePerConsult}
          />
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="timing" value="Working Hours" className="text-xl" />
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="start" value="Start Time" className="text-xs" />
              </div>
              <TextInput
                id="time"
                type="time"
                required={true}
                onChange={(ev) =>
                  setFormValues((prev) => ({
                    ...prev,
                    timing: {
                      ...prev.timing,
                      startTime: ev.target.value,
                    },
                  }))
                }
                value={formValues.timing.startTime}
              />
            </div>
            <div className="flex items-end pb-4">-</div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="start" value="End Time" className="text-xs" />
              </div>
              <TextInput
                id="time"
                type="time"
                required={true}
                onChange={(ev) =>
                  setFormValues((prev) => ({
                    ...prev,
                    timing: {
                      ...prev.timing,
                      endTime: ev.target.value,
                    },
                  }))
                }
                value={formValues.timing.endTime}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button
          type="submit"
          className="p-1.5 bg-blue-500 w-40 rounded-xl text-white"
        >
          {docDetails ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ApplyDocForm;
