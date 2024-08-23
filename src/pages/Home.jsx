import React from "react";
import heroImg1 from "../assets/sky2.gif";
import heroImg2 from "../assets/sky.gif";
import heroImg3 from "../assets/heroimg3.png";

const Home = () => {
  return (
    <div>
      <div className=" px-10 md:px-20 flex  flex-col md:flex-row relative">
        {/* {left-side} */}
        <div className=" w-full md:w-4/5 flex flex-col gap-9 z-10 py-48">
          <h1 className=" text-5xl md:text-6xl font-bold">
            Welcome to <span className=" text-blue-400">Daily's Routine</span>{" "}
            Website
          </h1>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            accusantium dolorem asperiores laboriosam necessitatibus.s
          </p>
        </div>
        {/* {right-side} */}
        <div className="w-full md:w-2/3  flex flex-wrap">
          <img src={heroImg1} alt="" className="w-[1400px] h-[600px]" />
          {/* <img src={heroImg3} alt="" className="w-60 h-60" />
          <img src={heroImg2} alt="" className="w-96 h-96" /> */}
        </div>
      </div>

      <div className=" w-72 h-24 bg-blue-400 absolute left-20 top-28 blur-3xl z-0"></div>
    </div>
  );
};

export default Home;
