import React from "react";

export const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-[40rem]">
      <div className="bg-white rounded-lg p-8 w-[30rem]">
        <div className="flex flex-1 flex-col justify-center items-center mt-4">
          <h1 className="text-xl font-medium">Register for an Account</h1>
          <p className="text-sm text-gray-400 ">
            Create an account. Already have an account? Login here
          </p>
        </div>
        <div>
          <div className="mt-10">
            <h2 className="text-gray-400">Full Name</h2>
            <input
              placeholder="John Doe"
              className="border-2 border-gray-200 rounded-md text-gray-300 p-3 w-full"
            ></input>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-400">Email</h2>
            <input
              placeholder="johndoe@gmail.com"
              className="border-2 border-gray-200 rounded-md text-gray-300 p-3 w-full"
            ></input>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-400">Password</h2>
            <input
              placeholder="***********"
              className="border-2 border-gray-200 rounded-md text-gray-300 p-3 w-full"
            ></input>
          </div>
          <button className="bg-green-500 text-white font-medium rounded-md p-3 w-full mt-6">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};
