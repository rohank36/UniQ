import React from "react";
import { useNavigate } from "react-router-dom";

const ProfessorBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/professorDashboard");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-green-400 rounded-lg p-8 shadow-lg transition-all duration-500 ease-in-out transform motion-safe:hover:scale-110"
    >
      I'm a Professor
    </button>
  );
};

export default ProfessorBtn;
