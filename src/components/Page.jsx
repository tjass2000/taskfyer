import React from "react";
import TaskItem from "./TaskItem";

const Page = () => {
  return (
    <div className="m-6 h-full">
      <div>
        <h1 className="text-2xl font-bold">All Tasks</h1>
      </div>
      <TaskItem />
    </div>
  );
};

export default Page;
