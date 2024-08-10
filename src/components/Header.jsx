import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, TextInput, Button } from "flowbite-react";

import { FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
const Header = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2 shadow-xl md:mx-16 rounded-lg  bg-slate-50">
        <Link
          to="/"
          className="text-sm sm:text-xl font-semibold dark:text-white whitespace-nowrap self-center "
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-200 rounded-lg text-white">
            Daily's
          </span>
          Routine
        </Link>
        {/* <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />

        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button> */}
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline " color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/tasks"} as={"div"}>
            <Link to="/tasks">Tasks</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
