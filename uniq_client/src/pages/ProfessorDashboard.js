import React from "react";
import Header from "../components/Landing/Header";
import ProfDisplay from "../components/ProfDashboard/ProfDisplay";

const ProfessorDashboard = () => {
  return (
    <div className="bg-green-300 h-screen text-white">
      <Header />
      <ProfDisplay />
    </div>
  );
};

export default ProfessorDashboard;
