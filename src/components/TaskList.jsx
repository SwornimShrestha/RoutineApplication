"use client";

import React from "react";
import TaskListNavbar from "./TaskListNavbar";
import { ShiftTable } from "./ShiftTable";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const TaskList = () => {
  return (
    <div className="text-center mt-20">
      <h1 className=" text-5xl md:text-6xl font-bold my-11">
        Welcome to <span className=" text-blue-400">Your</span> Task List
      </h1>
      <TaskListNavbar />
      <ShiftTable />
      <Link to="/tasks">
        <Button className="mx-auto" gradientDuoTone="purpleToBlue" outline>
          Create More Task
        </Button>
      </Link>
    </div>
  );
};

export default TaskList;
