import React from "react";
import { LoginPage } from "./LoginPage";
import Page from "./Page";
import { RegisterPage } from "./RegisterPage";
import TaskItem from "./TaskItem";

export const MainContent = () => {
  var userStatus = "UserExists";
  return (
    <div className="bg-gray-100 rounded-[1.5rem] border-b-0 flex-1 overflow-auto">
      {/* {userStatus === "UserExists" ? <LoginPage /> : <RegisterPage />} */}
      <Page />
    </div>
  );
};
