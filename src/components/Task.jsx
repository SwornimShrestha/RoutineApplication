"use client";
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import React from "react";
const Task = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold text-center text-gray-900 dark:text-white">
            Create Your Routine
          </h3>
          <div>
            <div className="mb-2 block">
              <Label value="Title" />
            </div>
            <TextInput id="title" placeholder="Enter Title" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Description" />
            </div>
            <TextInput
              id="description"
              placeholder="Enter Description"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Shift" />
            </div>
            <Select id="time" required>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
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
            />
          </div>
          <div className="flex flex-row   justify-center gap-7">
            <div className="">
              <Button color="success">Save</Button>
            </div>
            <div className="">
              <Button color="failure">Cancel</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Task;
