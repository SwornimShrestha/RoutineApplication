import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className=" z-10 flex max-w-xl mx-auto flex-col md:flex-col p-8 md:p-6 gap-5 shadow-lg rounded-lg">
        <div className="">
          <h1 className="text-3xl font-semibold mb-4">Login</h1>

          <h4 className="text-sm font-semibold">Hi, Welcome back</h4>
        </div>
        <div className="">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign In
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
