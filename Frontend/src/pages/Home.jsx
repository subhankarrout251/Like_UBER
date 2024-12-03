import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-cover bg-[url(https://www.miniphysics.com/wp-content/uploads/2011/05/file-AYQMIHQeCrps7zXtPZbUT8Iv-768x768.webp)] h-screen pt-5  flex justify-between flex-col w-full bg-red-400">
      <img
        className="w-14"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
      ></img>

      <div className="bg-white py-7 pb-7 px-4 rounded ">
        <h2 className="text-2xl font-bold">Get Stated with UBER</h2>
        <Link
          to={"/login"}
          className="flex items-center justify-center w-full py-2 bg-black text-white rounded mt-2"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
