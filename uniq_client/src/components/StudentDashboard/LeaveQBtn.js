import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveQBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    //leave q in db
    navigate("/");
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
