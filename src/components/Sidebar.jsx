import React from "react";

export const Sidebar = () => {
  return (
    <div className="fixed right-0 top-[clac(100%-5rem)] h-full">
      <div className="basis-5rem">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="font-light">Hello,</h1>
          <h1 className="font-bold">Tejas Khera</h1>
        </div>
        <div className="flex flex-1 flex-col border-2 border-r-white">
          <div>
            <h1>Total Tasks</h1>
            <h1>10</h1>
          </div>
          <div>
            <h1>Total Tasks</h1>
            <h1>10</h1>
          </div>
          <div>
            <h1>Total Tasks</h1>
            <h1>10</h1>
          </div>
          <div>
            <h1>Total Tasks</h1>
            <h1>10</h1>
          </div>
        </div>
        <div className="">
          <h1>Radio Chart - Stacked</h1>
          <h1>January - June 2024</h1>
          <div className="border-b-0 border-black border-2 h-12 w-24 flex flex-1 flex-row rounded-tl-full rounded-tr-full overflow-hidden">
            <div className="bg-red-500 w-[60%] h-full"></div>
            <div className="bg-green-500 w-[40%] h-full"></div>
          </div>
          <div>
            <h2>Trending up by 5.2% this month</h2>
            <h2>Showing total visitors for the last 6 months</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
