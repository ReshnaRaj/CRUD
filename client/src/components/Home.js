import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserList();
  }, []);
console.log(users,"user data...")
  function getUserList() {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/alluser`, { withCredentials: true })
      .then((response) => {
        setUsers(response?.data?.users);
      });
  }
  function deleteUser(userId) {
    console.log(userId,"user idfbhv")
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/deleteuser/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status) {
            alert(response.data.message)
        //   toast.success(response.data.message, {
        //     position: "top-center",
        //   });
          getUserList();
        } else {
          toast.error(response.data.message, {
            position: "top-center",
          });
        }
      }).catch((error)=>{
        console.log(error,"error");
      });
  }
  const handleEdit=async(user)=>{
    try {
        console.log(user,"editing   .....")
        navigate(`/edituser/${user}`,{state:{user}});
    } catch (error) {
        console.log(error)
        
    }
  }

  return (
    <div className="overflow-x-auto">
      <Link to="/adduser">
        <button className="btn btn-info">Add User</button>
      </Link>
      <table className="table">
        <thead>
          <tr className="bg-black text-white">
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>
                <img src={`${process.env.REACT_APP_BASE_URL}/${user.image}`}  width="50" height="50" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                    <button className="btn btn-info" onClick={()=>{
                      console.log(user._id,"user id ")
                    handleEdit(user._id)
                  }}>Edit</button>
                  
                
                <button className="btn btn-error" onClick={()=>{
                    console.log(user._id,"user id getting....")
                    deleteUser(user._id)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <ToastContainer />
      </table>
      
    </div>
  );
};

export default Home;
