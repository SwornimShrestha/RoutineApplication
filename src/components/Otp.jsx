"use client";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Otp = ({ email, isOpen, onClose }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:8080/api/v1/auth/verify-otp?otp=${otp}&email=${email}`,
      {
        method: "POST",
      }
    );
    if (res.ok) {
      console.log("OTP verified successfully.");
      navigate("/sign-in");
    } else {
      console.error("OTP verification failed.");
    }
  };
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Enter OTP sent to your email
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="otp" value="Your OTP" />
            </div>
            <TextInput
              id="otp"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Button onClick={handleSubmit}>Verify OTP</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Otp;
