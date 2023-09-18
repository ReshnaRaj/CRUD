import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Edituser = () => {
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(id);
  }, [id]);

  const getUserData = async (userId) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/${userId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUserdata(response.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setUserdata({
      ...userdata,
      image: imageFile,
    });
  };

  const handleEditsubmit = async (e) => {
    e.preventDefault();
    console.log("submitting formdata")
    const formData = new FormData();
    formData.append("name", userdata.name);
    formData.append("email", userdata.email);
    formData.append("phone", userdata.phone);
    formData.append("image", userdata.image);
    try {
      console.log(userdata);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/postedituser/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.data.success) {
        alert("User updated successfully");
      
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <form onSubmit={handleEditsubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="name" className="block font-bold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  value={userdata.name}
                  onChange={handleInputChange}
                  className="input input-bordered input-md w-96 max-w-xs"
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="email" className="block font-bold mb-1">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Type here"
                  value={userdata.email}
                  onChange={handleInputChange}
                  className="input input-bordered input-md w-full max-w-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="phone" className="block font-bold mb-1">
                  Phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91"
                  value={userdata.phone}
                  onChange={handleInputChange}
                  className="input input-bordered input-md w-96 max-w-xs"
                />
              </div>
            </div>

            <div className="w-full max-w-xs mr-4">
              <label htmlFor="image" className="block font-bold mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="file-input w-full max-w-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edituser;
