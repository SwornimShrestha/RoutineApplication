import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const TaskListNavbar = () => {
  const [shiftList, setShiftList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { id: currentShift } = useParams(); // Get the current shift from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/routine/user/${currentUser.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedShifts = data.shifts.sort((a, b) => {
          const order = ["MORNING", "MIDDAY", "AFTERNOON", "EVENING"];
          return order.indexOf(a) - order.indexOf(b);
        });
        setShiftList(sortedShifts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser.id]);

  return (
    <nav className="inline-block bg-[#f8fafc] dark:bg-[#1f2937] rounded-lg">
      <ul className="flex gap-10 justify-center shadow-lg font-semibold p-3 rounded-lg cursor-pointer">
        {shiftList.map((item, index) => (
          <li key={index}>
            <Link
              to={`/tasks-list/${item}`}
              className={`${
                currentShift === item
                  ? "underline decoration-sky-500 underline-offset-4"
                  : ""
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TaskListNavbar;
