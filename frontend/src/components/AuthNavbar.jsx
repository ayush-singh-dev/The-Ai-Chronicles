import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { NavLink } from "react-router-dom";

const AuthNavbar = () => {
  const { openSignIn } = useClerk();
  console.log("useClerk", useClerk);
  const { isSignedIn } = useUser();
  console.log("useUser", useUser);
  return (
    <header className=" flex justify-between px-4 py-5  w-[95%] m-auto">
      <div>
        <NavLink to={"/"} className=" font-bold text-xl">
          The Ai Chronicles
        </NavLink>
      </div>
      {isSignedIn ? (
        <div>
          <div className=" flex gap-12">
            <div>
              <ul className=" flex gap-10">
                <li>
                  <NavLink to={"/AiStories"} className=" font-medium text-xl">
                    Ai Stories
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/AiCreators"} className=" font-medium text-xl">
                    Ai Creators
                  </NavLink>
                </li>
                <li>
                  <UserButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => openSignIn({})}
            className=" px-5 py-1 font-semibold text-xl rounded-[110px] bg-[#f7f7f7] text-[#787878]"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default AuthNavbar;
