import { Button, Checkbox, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditTask from "./EditTask";

export function ShiftTable() {
  const [openTaskDialogBox, setOpenTaskDialogBox] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { id: shift } = useParams();
  const [shiftData, setShiftData] = useState([]);
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
        setShiftData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [shift, currentUser.id]);

  const handleDelete = async (deleteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/routine/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setShiftData((prevShiftData) =>
        prevShiftData.filter((task) => task.id !== deleteId)
      );
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task. Please try again.");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpenTaskDialogBox(true);
  };
  const handleTaskUpdated = () => {
    setOpenTaskDialogBox(false);
    fetchData();
  };

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
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={() => handleDelete(data.id)}
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
      {openTaskDialogBox && selectedTask && (
        <EditTask
          data={selectedTask}
          isOpen={openTaskDialogBox}
          onClose={() => handleTaskUpdated(false)}
        />
      )}
    </div>
  );
}
