import React, { useState, useEffect } from "react";
import { VscUnverified } from "react-icons/vsc";
import { MdOutlineSendToMobile } from "react-icons/md";

function Enrollment() {
  const [form, setForm] = useState({
    enrollmentType: "",
    firstName: "",
    middleName: "",
    surname: "",
    dob: "",
    stateOfOrigin: "",
    localOfOrigin: "",
    areaOfResidence: "",
    phone: "",
    gender: "",
    height: "",
    file: null,
  });

  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);

  // Fetch all states on mount
  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch(() => setStates([]));
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (form.stateOfOrigin) {
      fetch(`https://nga-states-lga.onrender.com/?state=${form.stateOfOrigin}`)
        .then((res) => res.json())
        .then((data) => setLgas(data))
        .catch(() => setLgas([]));
    } else {
      setLgas([]);
    }
  }, [form.stateOfOrigin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
      // Reset LGA if state changes
      ...(name === "stateOfOrigin" ? { localOfOrigin: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert("Enrollment submitted!");
  };

  return (
    <div className="w-full rounded-2xl mb-5 bg-white p-5 shadow-lg">
      <p className="text-[16px] text-gray-500">Enrollment</p>
      <div className="ml-7 ">
        <p className="text-[16px] mt-7 font-semibold text-gray-500">
          Enrollment for non appearance
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div>
            <label
              htmlFor="enrollmentType"
              className="block text-[14px] text-gray-500 mb-1 mt-5 "
            >
              ENROLLMENT TYPE
            </label>
            <select
              id="enrollmentType"
              name="enrollmentType"
              value={form.enrollmentType}
              onChange={handleChange}
              required
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px] text-gray-500"
            >
              <option value="" className="text-gray-500">
                -- Select an Option --
              </option>
              <option value="7000" className="text-gray-500">
                Adult Enrollment @ ₦7,000
              </option>
              <option value="4000" className="text-gray-500">
                Child Enrollment @ ₦4,000
              </option>
              <option value="4000" className="text-gray-500">
                Old Slip Enrollment @ ₦4,000
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              FIRST NAME
            </label>
            <input
              id="firstName"
              type="text"
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
              placeholder="First Name"
              required
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="middleName"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              MIDDLE NAME
            </label>
            <input
              id="middleName"
              type="text"
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
              placeholder="Middle Name"
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="surname"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              SURNAME
            </label>
            <input
              id="surname"
              type="text"
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
              placeholder="Surname"
              required
              name="surname"
              value={form.surname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              DATE OF BIRTH
            </label>
            <input
              id="dob"
              type="date"
              className="pl-5 py-2 border text-gray-500 border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
              placeholder="Date of Birth"
              required
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="stateOfOrigin"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              STATE OF ORIGIN
            </label>
            <select
              id="stateOfOrigin"
              name="stateOfOrigin"
              value={form.stateOfOrigin}
              onChange={handleChange}
              required
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px] text-gray-500"
            >
              <option value="">-- Select State of Origin --</option>
              {states.map((state, idx) => (
                <option key={idx} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="localOfOrigin"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              LGA OF ORIGIN
            </label>
            <select
              id="localOfOrigin"
              name="localOfOrigin"
              value={form.localOfOrigin}
              onChange={handleChange}
              required
              disabled={!form.stateOfOrigin}
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px] text-gray-500"
            >
              <option value="">-- Select LGA of Origin --</option>
              {lgas.map((lga, idx) => (
                <option key={idx} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              PHONE NUMBER
            </label>
            <input
              id="phone"
              type="tel"
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
              placeholder="Phone Number"
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
              pattern="\d{11}"
              maxLength="11"
              title="Phone number must be exactly 11 digits"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              GENDER
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="pl-5 text-gray-500 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              HEIGHT (CM)
            </label>
            <input
              id="height"
              type="number"
              className="pl-5 py-2 border border-gray-300 focus:border-gray-200 rounded-[6px] w-full max-w-md h-[40px]"
              placeholder="Height (cm)"
              required
              name="height"
              value={form.height}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label
              htmlFor="file-upload"
              className="block text-[14px] text-gray-500 mb-1 "
            >
              UPLOAD FILE
            </label>
            <div className="w-full max-w-md h-[40px] flex items-center border border-gray-300 rounded-[6px] focus-within:border-gray-200 bg-white overflow-hidden">
              <label
                htmlFor="file-upload"
                className="flex-1/4 bg-gray-100  hover:bg-gray-200 cursor-pointer pl-1  py-2 md:pl-2 pr-0 text-gray-500 border-r border-gray-300"
              >
                <input
                  id="file-upload"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="hidden"
                  required
                />
                <span className="text-[12px] md:text-[15px]">Choose file</span>
              </label>
              <span className="flex-3/4 pl-3 text-gray-600 text-sm truncate pr-2">
                {form.file ? form.file.name : "No file has been chosen"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full max-w-md h-[40px] bg-amber-500 text-white rounded-[6px] font-semibold mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Enrollment;
