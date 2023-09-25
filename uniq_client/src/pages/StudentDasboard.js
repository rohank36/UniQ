import React, { useState } from "react";
import Header from "../components/Landing/Header";
import LeaveQBtn from "../components/StudentDashboard/LeaveQBtn";

const StudentDashboard = () => {
  const [course, setCourse] = useState("Temp Course");
  const [timeRem, setTimeRem] = useState("Temp Time Rem");
  const [studentName, setStudentName] = useState("Temp Student Name");
  const [place, setPlace] = useState(5);

  return (
    <div className="bg-green-300 h-screen text-white">
      <div className="flex flex-row">
        <Header />
        <LeaveQBtn />
      </div>
      <div className="text-4xl mt-32 font-bold flex flex-col justify-center items-center">
        <h1>{studentName}</h1>
        <h1 className="mt-8">{course}</h1>
        <h1 className="mt-8">Time Remaining in Office Hours: {timeRem}</h1>
        <h1 className="mt-20 text-8xl">Place in queue: {place}</h1>
      </div>
    </div>
  );
};

export default StudentDashboard;
