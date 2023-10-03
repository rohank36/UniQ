import React, { useEffect, useState } from "react";
import { getProf, startOH, dequeue } from "../../services";
import QueueDisplay from "./QueueDisplay";

const ProfDisplay = () => {
  const [profAccessCode, setProfAccessCode] = useState(
    sessionStorage.getItem("profAccessCode") || ""
  );
  const [validAccessCode, setValidAccessCode] = useState(
    sessionStorage.getItem("validAccessCode") === "true"
  );
  const [lastName, setLastName] = useState(
    sessionStorage.getItem("lastName") || ""
  );
  const [joinCode, setJoinCode] = useState(
    sessionStorage.getItem("joinCode") || ""
  );
  const [courseCode, setCourseCode] = useState(
    sessionStorage.getItem("courseCode") || ""
  );
  const [courseName, setCourseName] = useState(
    sessionStorage.getItem("courseName") || ""
  );
  const [started, setStarted] = useState(
    sessionStorage.getItem("started") === "true"
  );
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState(
    JSON.parse(sessionStorage.getItem("queue")) || []
  );
  useEffect(() => {
    let eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const updatedQueue = JSON.parse(event.data);
      setQueue(updatedQueue);
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

  const handleAccess = async (e) => {
    e.preventDefault();
    try {
      const res = await getProf(profAccessCode);
      if (res.status === 200 && res.data.status === "success") {
        setValidAccessCode(true);
        sessionStorage.setItem("validAccessCode", true);
        sessionStorage.setItem("profAccessCode", profAccessCode);
        sessionStorage.setItem("lastName", res.data.prof.lastName);
        sessionStorage.setItem("joinCode", res.data.prof.joinCode);
        sessionStorage.setItem("courseName", res.data.prof.courseName);
        sessionStorage.setItem("courseCode", res.data.prof.courseCode);
        sessionStorage.setItem("queue", JSON.stringify(res.data.prof.queue));
        setJoinCode(res.data.prof.joinCode);
        setCourseCode(res.data.prof.courseCode);
        setCourseName(res.data.prof.courseName);
        //setDuration(res.data.prof.duration);
        setQueue(res.data.prof.queue);
        setLastName(res.data.prof.lastName);
      } else {
        sessionStorage.setItem("validAccessCode", false);
        setValidAccessCode(false);
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error in handleAccess", error);
      alert("An error occured. Please try again.");
    }
  };

  const handleDequeue = async (e) => {
    e.preventDefault();
    try {
      const res = await dequeue(profAccessCode);
      if (res.status != 200 || res.data.status != "success") {
        alert("Error with dequeue");
      }
    } catch (error) {
      console.error("Error in handleDequeue", error);
      alert("An error occured. Please try again.");
    }
  };
  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const res = await startOH(profAccessCode, !started);
      if (res.status === 200 && res.data.status === "success") {
        sessionStorage.setItem("started", res.data.prof.ohStarted);
        setStarted(res.data.prof.ohStarted);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error in handleStart", error);
      alert("An error occured. Please try again.");
    }
  };

  return (
    <div>
      <div>
        {!validAccessCode && (
          <div>
            <form className="mx-auto mt-20 flex flex-col items-center">
              <label className="block w-1/4">
                <span className="block text-sm font-medium">Access Code</span>
                <input
                  value={profAccessCode}
                  onChange={(e) => setProfAccessCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-green-400  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </label>

              <button
                type="button"
                onClick={handleAccess}
                className=" hover:text-green-500 mt-10 text-xl font-medium"
              >
                Access
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        {validAccessCode && (
          <div className="flex flex-col justify-center items-center mt-16 font-bold text-4xl">
            <h1 className="text-6xl">Welcome Professor {lastName}</h1>
            <div className="flex flex-row space-x-24 mt-10">
              <button onClick={handleStart} className=" hover:text-green-500">
                {started ? "Stop" : "Start"} Office Hours
              </button>
              <h1>
                {courseCode}: {courseName}
              </h1>
              <h1>Join Code: {joinCode}</h1>
            </div>
            <div className="flex flex-row space-x-20 mt-10">
              <button onClick={handleDequeue} className=" hover:text-green-500">
                Dequeue Student
              </button>
              <h1>Queue Count: {queue.length}</h1>
            </div>
            <div className="mt-16">
              <QueueDisplay propQueue={queue} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfDisplay;
