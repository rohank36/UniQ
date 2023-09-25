import React from "react";
import Header from "../components/Landing/Header";
import Description from "../components/Landing/Description";
import ProfessorBtn from "../components/Landing/ProfessorBtn";
import StudentBtn from "../components/Landing/StudentBtn";

const Landing = () => {
  return (
    <div className="bg-green-300 h-screen text-white ">
      <Header />

      <div className="text-6xl font-bold text-center mt-32">
        <Description />
      </div>
      <div className="text-4xl font-semibold space-x-24 text-center mt-32">
        <ProfessorBtn />
        <StudentBtn />
      </div>
    </div>
  );
};

export default Landing;
