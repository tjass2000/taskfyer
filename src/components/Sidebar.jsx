import React from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

export const Sidebar = () => {
  const data = [{ completed: 5, pending: 5 }];
  return (
    <div className="w-[20rem] mt-[5rem] fixed right-0 top-0 h-[clac(100%-5rem)] flex flex-col">
      <div className="basis-5rem">
        <div className="flex flex-1 flex-col justify-center items-center">
          <h1 className="font-light">Hello,</h1>
          <h1 className="font-bold">Tejas Khera</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-gray-400">Total Tasks:</p>
            <h1 className="text-3xl">10</h1>
          </div>
          <div>
            <p className="text-gray-400">Total Tasks:</p>
            <h1 className="text-3xl">10</h1>
          </div>
          <div>
            <p className="text-gray-400">Total Tasks:</p>
            <h1 className="text-3xl">10</h1>
          </div>
          <div>
            <p className="text-gray-400">Total Tasks:</p>
            <h1 className="text-3xl">10</h1>
          </div>
        </div>
        <div className="mt-6">
          <h1>Activity</h1>
        </div>
        <div className="mt-6">
          <div className="flex flex-1 flex-col justify-center items-center border-2 border-gray-200 rounded-xl shadow-md">
            <h1 className="font-medium">Radio Chart - Stacked</h1>
            <p className="text-gray-500 text-sm mt-1">January - June 2024</p>
            {/* <div className="border-b-0 border-black border-2 h-12 w-24 flex flex-1 flex-row rounded-tl-full rounded-tr-full overflow-hidden">
            <div className="bg-red-500 w-[60%] h-full"></div>
            <div className="bg-green-500 w-[40%] h-full"></div>
          </div> */}
            <RadialBarChart
              data={data}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
              width={300}
              height={250}
              cx={150}
              cy={150}
            >
              <RadialBar
                dataKey="completed"
                stackId="a"
                cornerRadius={5}
                fill="#f54955"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="pending"
                stackId="a"
                cornerRadius={5}
                fill="#49f558"
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
            <div className="flex items-center justify-center">
              <h2>Trending up by 5.2% this month</h2>
              <h2>Showing total visitors for the last 6 months</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
