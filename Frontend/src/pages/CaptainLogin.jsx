import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captionData, setCaptionData] = useState({});
  const submitHandeler = (e) => {
    e.preventDefault();
    setCaptionData({
      email: email,
      password: password,
    });
    console.log(captionData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        ></img>
        {/* <div className="flex justify-between w-full pt-3">
          <Link to="/login">
            <button className="px-4 py-2 border bg-gray-100 hover:bg-black-200">
              User
            </button>
          </Link>
          <button className="px-4 py-2 border bg-black-100 hover:bg-gray-200">
            Caption
          </button>
        </div> */}

        <div className="flex justify-between w-full pt-3">
          <Link to="/login">
            <button className="px-4 py-2 border bg-gray-100 text-black hover:bg-black-700">
              User
            </button>
          </Link>
          <button className="px-4 py-2 border bg-black text-white hover:bg-gray-700">
            Caption
          </button>
        </div>

        <form onSubmit={submitHandeler}>
          <h2 className="text-lg font-semibold text-center mb-4">
            Wellcome Caption Enter your email ?
          </h2>
          <div className="space-y-4">
            {/* Phone or Email Input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="text-xl pr-2">✉️</span>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="abc@gmail.com"
                className="w-full focus:outline-none"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">Password</h2>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Continue Button */}
            <button
              to={"/login"}
              className="flex items-center justify-center w-full py-2 bg-black text-white rounded mt-2"
            >
              Login
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <Link
              to={"/signup"}
              className="flex items-center justify-center w-full py-2 bg-black text-white rounded mt-2"
            >
              SignUp
            </Link>
            {/* Social Login Buttons */}
            {/* <button className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-lg space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button> */}
            {/* <button className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-lg space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="w-5 h-5"
            />
            <span>Continue with Apple</span>
          </button> */}
            {/* <button className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-lg space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span>Continue with Facebook</span>
          </button> */}
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

export default CaptainLogin;
