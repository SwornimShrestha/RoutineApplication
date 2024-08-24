import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";
import { signOut } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setAvatarUrl(imageUrl);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data", error);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
    toast.success("SignOut Successful");
  };

  return (
    <div>
      <Navbar className="border-b-2 shadow-xl md:mx-16 rounded-lg bg-slate-50">
        <Link
          to="/"
          className="text-sm sm:text-xl font-semibold dark:text-white whitespace-nowrap self-center"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-200 rounded-lg text-white">
            Daily's
          </span>
          Routine
        </Link>

        <div className="flex gap-2 md:order-2 items-center">
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toogleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="user" img={avatarUrl} rounded className="border-2 border-gray-300" />}
              className="bg-transparent shadow-lg"
            >
              <Dropdown.Header>
                <div className="flex flex-col items-center">
                  <Avatar
                    img={avatarUrl}
                    rounded
                    className="w-16 h-16 border-2 border-gray-300 mb-2 transition-transform duration-200 transform hover:scale-110"
                  />
                  <span className="block text-lg font-semibold text-gray-900 dark:text-white">
                    @{currentUser.username}
                  </span>
                </div>
              </Dropdown.Header>

              <Dropdown.Divider />

              <Link to="/profile">
                <Dropdown.Item className="relative group text-center text-sm font-medium bg-gray-100 dark:bg-gray-500 rounded-full overflow-hidden">
                  <span className="relative z-10">Profile</span>
                  <div className="absolute inset-0 w-full h-full bg-indigo-500 group-hover:w-full transition-all duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0 z-0"></div>
                </Dropdown.Item>
              </Link>

              <Dropdown.Divider />

              <Dropdown.Item
                className="relative group text-center text-sm font-medium   bg-gray-100 dark:bg-gray-500 rounded-full overflow-hidden"
                onClick={handleSignOut}
              >
                <span className="relative z-10">Sign out</span>
                <div className="absolute inset-0 w-full h-full  bg-indigo-500 group-hover:w-full transition-all duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0 z-0"></div>
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
          {currentUser && (
            <Navbar.Link active={path === "/tasks"} as={"div"}>
              <Link to="/tasks">Tasks</Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
