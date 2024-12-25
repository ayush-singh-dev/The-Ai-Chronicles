import React from "react";
import home from "../Images/home.jpeg";
const HeroSection = () => {
  return (
    <div className=" relative">
      <div className="w-full">
        <img
          src={home}
          className=" w-full h-[145vh]  object-cover rounded-[1.4rem] "
          alt="img loading..."
        />
      </div>
      {/* section 2 */}
      <div className="">
        <div className="absolute top-20 left-0 right-0 flex justify-center text-white text-center">
          <div className=" flex flex-col gap-12">
            <p className="text-lg md:text-xl">Welcome to</p>
            <h1 className="text-3xl md:text-9xl font-bold">
              AI Story Telling Hub
            </h1>
          </div>
        </div>
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-white text-center">
          <div className="mt-4">
            <p className="text-lg md:text-4xl font-bold leading-9 mb-4 ">
              Where AI meets creativity to craft unforgettable tales!
            </p>
            <p className="text-sm md:text-lg  mt-2">
              Dive into action, love, horror, and comedy like never before!
            </p>
          </div>
          <div className="mt-6">
            <button className="px-6 font-bold py-2 bg-[#f7f7f7] text-[#787878] rounded-full text-lg ">
              Join now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
