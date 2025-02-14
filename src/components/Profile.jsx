import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="flex flex-1 flex-row bg-gray-100 rounded-2xl p-3">
        <div className="flex bg-blue-950 w-[60px] h-[60px] rounded-[50%] justify-center items-center">
          <img
            src="src/assets/logo.png"
            height={28}
            width={28}
            alt="logo"
          ></img>
        </div>
        <div className="flex flex-1 flex-col text-xl ml-3">
          <h1 className="font-light">Hello,</h1>
          <h1 className="font-bold">Tejas Khera</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-gray-400">Total Tasks:</p>
          <h1 className="text-3xl border-s-4 border-violet-600 pl-3">10</h1>
        </div>
        <div>
          <p className="text-gray-400">In Progress:</p>
          <h1 className="text-3xl border-s-4 border-cyan-600 pl-3">10</h1>
        </div>
        <div>
          <p className="text-gray-400">Open Tasks:</p>
          <h1 className="text-3xl border-s-4 border-yellow-600 pl-3">10</h1>
        </div>
        <div>
          <p className="text-gray-400">Completed:</p>
          <h1 className="text-3xl border-s-4 border-green-600 pl-3">10</h1>
        </div>
      </div>
      <div>
        <h1 className="mt-8 font-medium text-lg">Activity</h1>
      </div>
    </div>
  );
};

export default Profile;
