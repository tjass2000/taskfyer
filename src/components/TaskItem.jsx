import React from "react";
import { star, trash, edit } from "../utils/icons";

const TaskItem = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] mt-6 pb-[2rem]">
      <div className="bg-white rounded-lg flex flex-col gap-4 border-2 border-white  px-4 py-3 h-[16rem]">
        <div>
          <h4 className="text-2xl font-bold">This is Task 1</h4>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex justify-between mt-auto items-center">
          <p className="text-gray-500 text-sm">4 days ago</p>
          <p className="text-green-500 text-sm font-bold">New</p>
          <div className="flex gap-3 items-center text-gray-400">
            <button className="">{star}</button>
            <button className="">{edit}</button>
            <button className="">{trash}</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg flex flex-col gap-4 border-2 border-white  px-4 py-3 h-[16rem]">
        <div>
          <h4 className="text-2xl font-bold">This is Task 1</h4>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex justify-between mt-auto items-center">
          <p className="text-gray-500 text-sm">4 days ago</p>
          <p className="text-green-500 text-sm font-bold">New</p>
          <div className="flex gap-3 items-center text-gray-400">
            <button className="">{star}</button>
            <button className="">{edit}</button>
            <button className="">{trash}</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg flex flex-col gap-4 border-2 border-white  px-4 py-3 h-[16rem]">
        <div>
          <h4 className="text-2xl font-bold">This is Task 1</h4>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex justify-between mt-auto items-center">
          <p className="text-gray-500 text-sm">4 days ago</p>
          <p className="text-green-500 text-sm font-bold">New</p>
          <div className="flex gap-3 items-center text-gray-400">
            <button className="">{star}</button>
            <button className="">{edit}</button>
            <button className="">{trash}</button>
          </div>
        </div>
      </div>
      <div className="border-gray-400 border-[3px] border-dashed rounded-lg flex flex-col gap-4 px-4 py-3 h-[16rem]">
        <div className="flex flex-1 justify-center items-center">
          <h4 className="text-xl text-gray-500">Add New Task</h4>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
