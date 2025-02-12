import React from "react";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const MainContent = () => {
  var userStatus = "UserExists";
  return (
    <div className="bg-gray-200 rounded-[1.5rem] border-b-0 flex-1 overflow-auto">
      {userStatus === "UserExists" ? <LoginPage /> : <RegisterPage />}
    </div>
  );
};
