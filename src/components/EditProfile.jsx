import { Button, Label, Modal, TextInput, Alert } from "flowbite-react";
import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditProfile = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    fullName: data.fullName || "",
    username: data.username || "",
    password:""    
});
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);


  useEffect(() => {
    setFormData({
      fullName: data.fullName || "",
      username: data.username || ""
    });
  }, [data]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setError(null);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordPattern = /^(?=.*[@])(?=.*[!]).{5,}$/;
    if (!passwordPattern.test(formData.password)) {
      return setError(
        "Password must contain '@', '!', and be at least 5 characters long."
      );
    }
    
    try {
      const newData = {
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
        
      };
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/${currentUser.id}`,
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

        setFormData({
          fullName: "",
          username: "",
          password:""
        });
        toast.success("Profile Updated ");
        onClose();
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
    <Modal show={isOpen} size="md" onClose={onClose} popup className="pt-20 pl-[30rem]">
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label value="fullName" />
            </div>
            <TextInput
              id="fullName"
              placeholder="Enter fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="username" />
            </div>
            <TextInput
              id="username"
              placeholder="Enter username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
         
          <div>
            <div className="mb-2 block">
              <Label value="password" />
            </div>
            <TextInput
              id="password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={handleChange}
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

export default EditProfile;
