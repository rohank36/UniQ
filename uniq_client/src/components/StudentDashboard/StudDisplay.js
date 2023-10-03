import React, { useState, useEffect } from "react";
import Header from "../Landing/Header";
import LeaveQBtn from "./LeaveQBtn";
import { useNavigate } from "react-router-dom";
import { joinQueue, leaveQueue } from "../../services";

const StudDisplay = () => {
  const navigate = useNavigate();
  const [courseNameStud, setCourseNameStud] = useState(
    sessionStorage.getItem("courseNameStud") || ""
  );
  const [courseCodeStud, setCourseCodeStud] = useState(
    sessionStorage.getItem("courseCodeStud") || ""
  );
  const [timeRem, setTimeRem] = useState("");
  const [studentName, setStudentName] = useState(
    sessionStorage.getItem("studentName") || ""
  );
  const [place, setPlace] = useState(
    sessionStorage.getItem("place") || "Loading..."
  );
  const [joinCode, setJoinCode] = useState(
    sessionStorage.getItem("joinCodeStud") || ""
  );
  const [validJoinCode, setValidJoinCode] = useState(
    sessionStorage.getItem("validJoinCode") === "true"
  );
  const [studentID, setStudentID] = useState(
    sessionStorage.getItem("studentID") || ""
  );
  const [queue, setNewQueue] = useState([]);

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const updatedQueue = JSON.parse(event.data);
      setNewQueue(updatedQueue);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();

      setTimeout(() => {
        eventSource = new EventSource("http://localhost:3001/events");
      }, 5000); // Try to reconnect every 5 seconds
    };

    // Cleanup the connection when the component is unmounted
    return () => eventSource.close();
  }, []);

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const res = await joinQueue(joinCode, studentName);
      if (res.status === 200 && res.data.status === "success") {
        sessionStorage.setItem("courseNameStud", res.data.prof.courseName);
        sessionStorage.setItem("courseCodeStud", res.data.prof.courseCode);
        sessionStorage.setItem("studentName", res.data.stud.name);
        sessionStorage.setItem("joinCodeStud", res.data.stud.joinCode);
        sessionStorage.setItem("validJoinCode", true);
        sessionStorage.setItem("studentID", res.data.stud._id);
        setStudentID(res.data.stud._id);
        setCourseNameStud(res.data.prof.courseName);
        setCourseCodeStud(res.data.prof.courseCode);
        setStudentName(res.data.stud.name);
        setJoinCode(res.data.stud.joinCode);
        setValidJoinCode(true);
      } else {
        sessionStorage.setItem("validJoinCode", false);
        setValidJoinCode(false);
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error in handleAccess", error);
      alert("An error occured. Please try again.");
    }
  };

  useEffect(() => {
    const index = queue.findIndex((id) => id === studentID);
    const placeInQueue = index + 1;

    if (studentID && placeInQueue <= 0) {
      const userConfirmed = window.confirm(
        "It is your turn now! Click OK to continue."
      );
      if (userConfirmed) {
        sessionStorage.clear();
        navigate("/");
      }
    }
    setPlace(placeInQueue);
    sessionStorage.setItem("place", placeInQueue);
  }, [queue]);

  return (
    <div className="bg-green-300 h-screen text-white">
      <div className="flex flex-row">
        <Header />
        <LeaveQBtn propName={studentName} />
      </div>
      <div>
        {!validJoinCode && (
          <div>
            <form className="mx-auto mt-40 flex flex-col items-center">
              <label className="block w-1/4">
                <span className="block text-sm font-medium">Join Code</span>
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-green-400  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </label>
              <label className="block w-1/4">
                <span className="block text-sm font-medium">Name</span>
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-green-400  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </label>
              <button
                type="button"
                onClick={handleJoin}
                className=" hover:text-green-500 mt-10 text-xl font-medium"
              >
                Join
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        {validJoinCode && (
          <div className="flex flex-col justify-center items-center mt-28 font-bold text-4xl">
            <h1>{studentName}</h1>
            <h1 className="mt-8">
              {courseCodeStud}: {courseNameStud}
            </h1>
            <h1 className="mt-20 text-8xl">Place in queue: {place}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudDisplay;
