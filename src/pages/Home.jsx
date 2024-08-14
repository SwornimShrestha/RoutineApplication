import React from "react";

import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
const Home = () => {
  return (
    <div>
      <div className=" px-10 md:px-20 mt-20 flex  flex-col md:flex-row relative">
        {/* {left-side} */}
        <div className=" w-full md:w-4/5 flex flex-col gap-9 z-10">
          <h1 className=" text-5xl md:text-6xl font-bold">
            Welcome to <span className=" text-blue-400">Daily's Routine</span>{" "}
            Website
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            accusantium dolorem asperiores laboriosam necessitatibus.s
          </p>
          <Link to="/sign-up">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign Up
            </Button>
          </Link>
        </div>
        {/* {right-side} */}
        <div className="w-full md:w-2/3 md:ml-40">
          <img src="./hero3.png" alt="" />
        </div>
      </div>
      <div className=" w-72 h-24 bg-blue-400 absolute left-20 top-28 blur-3xl z-0"></div>
    </div>
  );
};

export default Home;
