import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/${currentUser.name}`
      );

      if (response.ok) {
        // Convert the response to a Blob
        const imageBlob = await response.blob();

        // Create a URL for the Blob to be used as the image source
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the avatar URL to the generated object URL
        setAvatarUrl(imageUrl);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data", error);
    }
  };
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

        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline "
            color="gray"
            pill
            onClick={() => dispatch(toogleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <Dropdown
              className="bg-[#f3f7fc] "
              arrowIcon={false}
              inline
              label={<Avatar alt="user" img={avatarUrl} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">
                  @{currentUser.username}
                </span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.fullName}
                </span>
              </Dropdown.Header>
              <Link>
                <Dropdown.Item className=" text-sm font-medium">
                  Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item className=" text-sm font-medium text-red-500">
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          {currentUser ? (
            <Navbar.Link active={path === "/tasks"} as={"div"}>
              <Link to="/tasks">Tasks</Link>
            </Navbar.Link>
          ) : (
            <h1></h1>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
