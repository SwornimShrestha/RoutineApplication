"use client";

import { Checkbox, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function ShiftTable() {
  const { id: shift } = useParams();
  const [shiftData, setShifData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/routine/${shift}/${currentUser.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShifData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [shift]);

  return (
    <div className="overflow-x-auto mx-3 md:mx-60 md:my-12">
      {shiftData.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4"></Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Start Time</Table.HeadCell>
            <Table.HeadCell>End Time</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {shiftData.map((data, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {data.title}
                </Table.Cell>
                <Table.Cell>{data.description}</Table.Cell>
                <Table.Cell>{data.startTime}</Table.Cell>
                <Table.Cell>{data.endTime}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No tasks available for this shift.
        </div>
      )}
    </div>
  );
}
