import React from "react";

const QueueDisplay = ({ propQueue }) => {
  return (
    <div>
      <ol>
        {propQueue.map((item, index) => (
          <li key={index}>
            <h2>
              {index + 1}. {item}
            </h2>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default QueueDisplay;
