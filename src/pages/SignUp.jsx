import React, { useState } from "react";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Otp from "../components/Otp";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !username || !email || !password) {
      return setErrorMessage("Please fill out all fields.");
    }
    const passwordPattern = /^(?=.*[@])(?=.*[!]).{5,}$/;
    if (!passwordPattern.test(password)) {
      return setErrorMessage(
        "Password must contain '@', '!', and be at least 5 characters long."
      );
    }
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profilePicture);

    try {
      setErrorMessage(null);
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/v1/auth/signUp", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        console.log(
          "User registered successfully. Please check your email for OTP."
        );
        setIsOtpDialogOpen(true);
        setLoading(false);
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    // try {
    //   setLoading(true);
    //   localStorage.setItem("formData", JSON.stringify(formData));
    //   console.log(formData);
    //   setIsOtpDialogOpen(true);
    //   setLoading(false);
    // } catch (error) {
    //   setErrorMessage(error.message);
    // }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePictureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-8 md:p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 shadow-xl rounded-xl">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-200 rounded-lg text-white">
              Daily's
            </span>
            Routine
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            .
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div>
              <Label value="Your fullname" />
              <TextInput
                type="text"
                placeholder="Fullname"
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-4">
              <input
                type="file"
                id="profilePicture"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
              <label
                htmlFor="profilePicture"
                className="cursor-pointer bg-blue-500 text-white font-semibold text-sm p-2 rounded-lg text-center h-11"
              >
                Choose File
              </label>
              {profilePictureUrl && (
                <img
                  src={profilePictureUrl}
                  alt="Profile"
                  className="mt-[2px] w-10 h-10  object-cover rounded-full"
                />
              )}
            </div>

            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            {/* <Button
              onClick={() => setIsOtpDialogOpen((prevState) => !prevState)}
            >
              <Otp />
            </Button> */}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>{" "}
      {isOtpDialogOpen && (
        <Otp
          email={email}
          isOpen={isOtpDialogOpen}
          onClose={() => setIsOtpDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default SignUp;
