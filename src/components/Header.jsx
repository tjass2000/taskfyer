import React from "react";
import { Link } from "react-router-dom";
import { darkmode, github, profile } from "../utils/icons";

const Header = () => {
  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-white">
      <div>
        <h1 className="text-lg font-medium text-left">
          <span role="img" aria-label="wave">
            👋🏼
          </span>
          Welcome to Taskfyer
        </h1>
        <p className="text-sm">Please login or register to view your tasks</p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button className="rounded-3xl px-3 py-2 bg-cyan-600 text-white w-48 hover:bg-cyan-700 transition duration-700 ease-in-out">
          Login / Register
        </button>
        <div className="flex gap-4 items-center">
          <Link className="p-2 h-40px w-40px text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {github}
          </Link>
          <Link className="p-2 h-40px w-40px text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {darkmode}
          </Link>
          <Link className="p-2 h-40px w-40px text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {profile}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
