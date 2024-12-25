import React from "react";
import action from "../Images/actionAi.jpeg";
import comedy from "../Images/comedyAi.jpeg";
import horror from "../Images/horrorAi.jpeg";
import romantic from "../Images/romanticAi.jpeg";
const AiPersonSection = () => {
  return (
    <div className=" bg-[#443c68]  px-8 mt-10 rounded-[1.4rem]">
      <div>
        <div className="text-center text-white mb-10">
          <p className="text-lg md:text-xl">Meet AIs</p>
          <h1 className="text-3xl md:text-5xl font-bold">Our Creative AIs</h1>
        </div>
      </div>
      <div className=" flex justify-center gap-8   ">
        <div className="">
          <div className=" h-[600px]">
            <img
              src={action}
              className="h-full object-cover rounded-[20px]"
              alt="action AI"
            />
          </div>
          <div>
            <h1 className="">Max Action</h1>
            <p className="">Action Storyteller</p>
          </div>
        </div>
        <div>
          <div className=" h-[600px]">
            <img
              src={romantic}
              className=" h-full object-cover rounded-[20px]"
              alt="Romantic AI"
            />
          </div>
          <div>
            <h1>Lola Love</h1>
            <p>Romantic Narrator</p>
          </div>
        </div>
        <div>
          <div className=" h-[600px]">
            <img
              src={horror}
              className=" h-full object-cover rounded-[20px]"
              alt="horror AI"
            />
          </div>
          <div>
            <h1>Holly Horror</h1>
            <p>Spooky Storyteller</p>
          </div>
        </div>
        <div>
          <div className=" h-[600px]">
            <img
              src={comedy}
              className=" h-full w-[35em] object-cover rounded-[20px]"
              alt="comedy AI"
            />
          </div>
          <div>
            <h1>Max Action</h1>
            <p>Spooky Storyteller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPersonSection;
