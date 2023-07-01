import React from "react";

const Widget = ({ data }) => {
  const progressStyle = {
    width: `${data.customValue}%`,
  };

  return (
    <div
      className="widget-container"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        margin: "10px",
        border: "0.5px solid black",
        borderRadius: "25px",
        display: "inline-block",
      }}
    >
      <p>Section: {data.section}</p>
      <p>Subsection: {data.subsection}</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={progressStyle}
          aria-valuenow={data.customValue}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {data.customValue}%
        </div>
      </div>
    </div>
  );
};

export default Widget;
