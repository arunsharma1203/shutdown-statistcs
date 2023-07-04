import React from "react";

const Widget = ({ data }) => {
  console.log("data in widget", data);

  return (
    <div  className="widget-container">
      <h3>Section: {data.section}</h3>
      {data.subsections && data.subsections.length > 0 ? (
        <div >
          {data.subsections.map((subsection, index) => (
            <div key={index}>
              <p>Subsection: {subsection}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${data.subsectionData[subsection] || 0}%`, 
                  }}
                  aria-valuenow={data.subsectionData[subsection] || 0} 
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {data.subsectionData[subsection] || 0}% 
                
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No subsections available</p>
      )}
    </div>
  );
};

export default Widget;
