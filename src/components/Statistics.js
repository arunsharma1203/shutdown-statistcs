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
    return data.reduce((formattedData, section) => {
      const filteredSubsections = section.subsections.filter(
        (subsection) => subsection.customValue !== null
      );

      if (filteredSubsections.length > 0) {
        filteredSubsections.forEach((subsection) => {
          const updatedAt = new Date(moment(section.updatedAt));

          formattedData.push({
            section: section.section,
            subsection: subsection,
            customValue: section.customValue,
            updatedAt: updatedAt,
          });
        });
      }

      return formattedData;
    }, []);
  };

  return (
    <div>
      <div>
        {sectionData.map((data, index) => {
          // Check if customValue is defined
          if (data.customValue !== undefined) {
            return <Widget key={index} data={data} />;
          } else {
            return null; // Exclude the widget without customValue
          }
        })}
      </div>

      <h3>Master View</h3>

      {sectionData && sectionData.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Section</th>
                <th>Subsection</th>
                <th>Custom Value</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sectionData.map((data, dataIndex) => {
                if (data.customValue !== undefined) {
                  return (
                    <tr key={dataIndex}>
                      <td>{data.section}</td>
                      <td>{data.subsection}</td>
                      <td>{data.customValue}</td>
                      <td>{data.updatedAt.toString()}</td>
                    </tr>
                  );
                } else {
                  return null; // Exclude the row with no customValue
                }
              })}
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
