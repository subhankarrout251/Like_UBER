import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate inputs (basic frontend validation)
    if (firstName.length < 3) {
      setErrorMessage("First name must be at least 3 characters");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    // try {
    //   // Send data to backend
    //   const response = await axios.post("/api/signup", {
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //   });

    //   // Handle success (you can navigate to a different page, show a success message, etc.)
    //   navigate("/login"); // Redirect to login page after successful signup
    // } catch (error) {
    //   setErrorMessage(error.response?.data?.message || "Something went wrong");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt="Uber Logo"
        />
        <div className="flex justify-between w-full pt-3">
          <Link to="/captionlogin">
            <button className="px-4 py-2 border bg-gray-100 text-black hover:bg-black-700">
              User
            </button>
          </Link>
          <button className="px-4 py-2 border bg-black text-white hover:bg-gray-700">
            Caption
          </button>
        </div>

        <form onSubmit={submitHandler}>
          <h2 className="text-lg font-semibold text-center mb-4">
            Welcome Caption! Enter your details:
          </h2>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">First Name</h2>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full focus:outline-none"
              />
            </div>
            {/* Last Name Input */}
            <h2 className="text-lg font-semibold mb-4">Last Name</h2>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full focus:outline-none"
              />
            </div>
            {/* Email Input */}
            <h2 className="text-lg font-semibold mb-4">Email</h2>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                className="w-full focus:outline-none"
              />
            </div>
            {/* Password Input */}
            <h2 className="text-lg font-semibold mb-4">Password</h2>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center w-full py-2 bg-black text-white rounded mt-2"
            >
              Sign Up
            </button>

            {errorMessage && (
              <div className="text-red-500 text-sm text-center mt-2">
                {errorMessage}
              </div>
            )}

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <Link
              to="/login"
              className="flex items-center justify-center w-full py-2 bg-black text-white rounded mt-2"
            >
              Login
            </Link>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By proceeding, you consent to get calls, WhatsApp, or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
