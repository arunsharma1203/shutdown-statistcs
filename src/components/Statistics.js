import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Table from "react-bootstrap/Table";
import Widget from "./Widget";
import "../Widget.css"; // Import the CSS file for Widget styling

const MasterRoute = () => {
  const [sectionData, setSectionData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend-n15a.onrender.com/sections/sections"
      );
      const formattedData = formatSectionData(response.data.sections);
      setSectionData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

 const formatSectionData = (data) => {
   if (!Array.isArray(data)) {
     return []; // Return empty array if data is not an array
   }

   const uniqueSections = {};

   data.forEach((item) => {
     const { section, subsections, customValue, updatedAt } = item;

     subsections.forEach((subsection) => {
       const key = section + "|" + subsection;
       if (!uniqueSections[key] || updatedAt > uniqueSections[key].updatedAt) {
         uniqueSections[key] = {
           section: section,
           subsection: subsection,
           customValue: customValue,
           updatedAt: updatedAt,
          
         };
       }
     });
   });

   return Object.values(uniqueSections);
 };




  return (
    <div>
      <div>
        {sectionData
          .filter((data) => data.customValue !== undefined)
          .map((data, index) => (
            <Widget key={index} data={data} />
          ))}
      </div>

      <h3>Master View</h3>

      {sectionData && sectionData.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Section</th>
                <th>Subsection</th>
                <th>Percentage Completed</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sectionData
                .filter((data) => data.customValue !== undefined)
                .map((data, dataIndex) => (
                  <tr key={dataIndex}>
                    <td>{data.section}</td>
                    <td>{data.subsection}</td>
                    <td>{data.customValue}</td>
                    <td>{data.updatedAt.toString()}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MasterRoute;
