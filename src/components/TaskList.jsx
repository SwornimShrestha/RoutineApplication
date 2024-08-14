"use client";

import React from "react";
import TaskListNavbar from "./TaskListNavbar";
import { ShiftTable } from "./ShiftTable";

const TaskList = () => {
  return (
    <div className="text-center mt-20">
      <h1 className=" text-5xl md:text-6xl font-bold my-11">
        Welcome to <span className=" text-blue-400">Your</span> Task List
      </h1>
      <TaskListNavbar />
      <ShiftTable />
    </div>
  );
};

export default TaskList;
