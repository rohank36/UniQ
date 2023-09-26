import React from "react";
import { useNavigate } from "react-router-dom";
import { leaveQueue } from "../../services";

const LeaveQBtn = ({ propName }) => {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await leaveQueue(propName);
      if (res.status === 200 && res.data.status === "success") {
        sessionStorage.clear();
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error in handleAccess", error);
      alert("An error occured. Please try again.");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="absolute font-bold text-4xl top-2 right-5 bg-green-400 rounded-lg p-4 shadow-lg transition-all duration-500 ease-in-out transform motion-safe:hover:scale-110"
    >
      Leave Queue
    </button>
  );
};

export default LeaveQBtn;
