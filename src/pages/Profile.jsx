import { useEffect, useState, useRef } from "react";
import img from "../assets/heroimg3.png"
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const [profileData, setProfileData] = useState([])
  const { currentUser } = useSelector((state) => state.user);

  const [avatarUrl, setAvatarUrl] = useState("");
  const [openTaskDialogBox, setOpenTaskDialogBox] = useState(false);
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.click();
  };

 
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/profile/${currentUser.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfileData(data.profileDetail)
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const imageData = async () => {
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



  useEffect(() => {
    fetchData();
    imageData();
  }, [ currentUser.id, currentUser.name]);

  const handleEdit = () => {
    // setSelectedTask(task);
    setOpenTaskDialogBox(true);
  };
  const handleTaskUpdated = () => {
    setOpenTaskDialogBox(false);
    fetchData();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/profile/${currentUser.id}/upload-avatar`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setAvatarUrl(URL.createObjectURL(file));
        console.log("Avatar updated successfully");
      } else {
        console.error("Failed to upload avatar");
      }
    } catch (error) {
      console.error("An error occurred while uploading avatar:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="shadow-4xl dark:bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        

        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
          <div className="flex flex-row justify-center gap-7 items-center mb-6">
            {avatarUrl ? (
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                src={avatarUrl}
                alt="Profile"
              />
              
            ) : (
              <div className="w-24 h-24 rounded-full  dark:bg-gray-800 flex items-center justify-center border-4 border-indigo-500 shadow-lg">
                <span className="text-lg">No Image</span>
              </div>
            )}
            <img
            onClick={focusInput}
                className="w-16 h-16  object-cover  "
                src="https://img.icons8.com/?size=100&id=102714&format=png&color=000000"
                alt="Profile"
              />
               <input ref={inputRef} type="file"  className="hidden" 
              onChange={handleFileChange} />
   
           
          </div>

          <div className="space-y-3">
            <div className=" dark:bg-gray-800 text-black dark:text-white p-3 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1 font-bold">Full Name</h3>
              <p className="text-base font-semibold text-gray-500 ">{profileData.fullName}</p>
            </div>

            <div className=" dark:bg-gray-800 text-black dark:text-white p-3 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Username</h3>
              <p className="text-base font-semibold text-gray-500">{profileData.username}</p>
            </div>

            <div className=" dark:bg-gray-800 text-black dark:text-white p-3 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-1">Email</h3>
              <p className="text-base font-semibold text-gray-500">{profileData.email}</p>
            </div>

          
          </div>

          <div className="mt-6 flex space-x-4 justify-center">
            
            <button  onClick={ handleEdit} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg">
              Edit
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
          <img
            className="rounded-lg shadow-xl object-cover h-100 w-70"
            src={img}
            alt="Full"
          />
          
        </div>
      </div>
      {openTaskDialogBox &&  (
        <EditProfile
          data={profileData}
          isOpen={openTaskDialogBox}
          onClose={() => handleTaskUpdated(false)}
        />
      )}
        </div>

  );
};

export default Profile;





