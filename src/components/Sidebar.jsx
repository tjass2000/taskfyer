import React from "react";
import Profile from "./Profile";
import RadialChart from "./RadialChart";

export const Sidebar = () => {
  // const data = [{ completed: 5, pending: 5 }];
  return (
    <div className="w-[20rem] mt-[5rem] fixed right-0 top-0 h-[clac(100%-5rem)] flex flex-col">
      <div className="mt-2 mx-6">
        <Profile />
        <RadialChart />
      </div>
    </div>
  );
};
