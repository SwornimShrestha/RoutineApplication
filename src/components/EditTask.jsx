import { Button, Label, Modal, TextInput, Select, Alert } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditTask = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    shift: data.shift || "MORNING",
    startTime: data.startTime || "",
    endTime: data.endTime || "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState({ min: "07:00", max: "10:00" });

  useEffect(() => {
    setFormData({
      title: data.title || "",
      description: data.description || "",
      shift: data.shift || "MORNING",
      startTime: data.startTime || "",
      endTime: data.endTime || "",
    });
  }, [data]);

  useEffect(() => {
    switch (formData.shift) {
      case "MORNING":
        setTimeRange({ min: "07:00", max: "10:00" });
        break;
      case "MIDDAY":
        setTimeRange({ min: "10:00", max: "14:00" });
        break;
      case "AFTERNOON":
        setTimeRange({ min: "14:00", max: "19:00" });
        break;
      case "EVENING":
        setTimeRange({ min: "19:00", max: "23:59" });
        break;
      default:
        setTimeRange({ min: "07:00", max: "10:00" });
        break;
    }
  }, [formData.shift]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.title) return "Please enter the title.";
    if (!formData.description) return "Please enter the description.";
    if (!formData.startTime) return "Please enter the start time.";
    if (!formData.endTime) return "Please enter the end time.";
    if (
      formData.startTime < timeRange.min ||
      formData.startTime > timeRange.max
    )
      return `Start time must be between ${timeRange.min} and ${timeRange.max} for the selected shift.`;
    if (formData.endTime < timeRange.min || formData.endTime > timeRange.max)
      return `End time must be between ${timeRange.min} and ${timeRange.max} for the selected shift.`;
    if (formData.endTime <= formData.startTime)
      return "End time must be later than start time.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const newData = {
        title: formData.title,
        description: formData.description,
        startTime: formData.startTime,
        endTime: formData.endTime,
        shiftingTime: formData.shift,
        userProfileId: currentUser.id,
      };
      const response = await fetch(
        `http://localhost:8080/api/v1/routine/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        onClose();
        setFormData({
          title: "",
          description: "",
          shift: "MORNING",
          startTime: "",
          endTime: "",
        });
        toast.success("Routine Updated ");
      } else {
        setError("Failed to create routine. Please try again.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup className="pt-20">
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Enter Title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Description" />
            </div>
            <TextInput
              id="description"
              placeholder="Enter Description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Shift" />
            </div>
            <Select
              id="shift"
              required
              value={formData.shift}
              onChange={handleChange}
            >
              <option value="MORNING">Morning</option>
              <option value="MIDDAY">Midday</option>
              <option value="AFTERNOON">Afternoon</option>
              <option value="EVENING">Evening</option>
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Start Time" />
            </div>
            <TextInput
              id="startTime"
              placeholder="Enter Start Time"
              required
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              min={timeRange.min}
              max={timeRange.max}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="End Time" />
            </div>
            <TextInput
              id="endTime"
              placeholder="Enter End Time"
              required
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              min={timeRange.min}
              max={timeRange.max}
            />
          </div>
          <div className="flex flex-row justify-center gap-7">
            <Button color="success" onClick={handleSubmit}>
              Save
            </Button>
            <Button color="failure" onClick={onClose}>
              Cancel
            </Button>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
