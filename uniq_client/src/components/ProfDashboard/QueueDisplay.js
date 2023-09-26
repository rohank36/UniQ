import React, { useState, useEffect } from "react";
import { getStud } from "../../services";

const QueueDisplay = ({ propQueue }) => {
  const [studentNames, setStudentNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      const names = [];
      for (let id of propQueue) {
        try {
          const name = await getStud(id);
          names.push(name);
        } catch (error) {
          console.error("Error fetching student name:", error);
          names.push("Unknown");
        }
      }
      setStudentNames(names);
    };

    fetchNames();
  }, [propQueue]);

  return (
    <div>
      <ol>
        {studentNames.map((name, index) => (
          <li key={index}>
            <h2>
              {index + 1}. {name}
            </h2>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default QueueDisplay;
