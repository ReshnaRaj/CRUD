import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || image === "") {
      alert("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", image[0]);
    try {
      const response = await axios.post('http://localhost:4000/adduser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      console.log(response, "eee");
      console.log(formData, "formdata");
      if (response.data.status) {
        alert("User added successfully");
      }
      navigate('/');
    } catch (error) {
      console.log(error, "adding");
    }
  };
  

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Name
                </label>
                <input
                  placeholder="Type here"
                  value={name}
                  className="input input-bordered input-md w-96 max-w-xs"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  placeholder="Type here"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="input input-bordered input-md w-full max-w-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Phone number
                </label>
                <input
                  type="text"
                  value={phone}
                  placeholder="+91"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="input input-bordered input-md w-96 max-w-xs"
                />
              </div>
            </div>

            <div className="w-full max-w-xs mr-4">
              <label htmlFor="resortname" className="block font-bold mb-1">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files)}
                className="file-input w-full max-w-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
