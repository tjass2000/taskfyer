import React from "react";
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const RadialChart = () => {
  const data = [{ completed: 5, pending: 5 }];

  return (
    <div className="mt-8">
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-100 rounded-xl">
        <h1 className="mt-5">Completed vs Pending Tasks</h1>
        <h1 className="text-sm text-gray-500">Task completion status</h1>
        <RadialBarChart
          data={data}
          endAngle={180}
          innerRadius={80}
          outerRadius={130}
          width={300}
          height={200}
          cx={150}
          cy={150}
        >
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="text-2xl"
                      >
                        40
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="text-sm"
                      >
                        Tasks
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
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
        <div className="flex flex-1 flex-col mb-5">
          <p className="text-sm font-medium">Trending up by 5.2% this month</p>
          <p className="text-sm leading-none text-gray-500">
            Showing total visitors for the <br></br> last 6 months
          </p>
        </div>
      </div>
    </div>
  );
};

export default RadialChart;
