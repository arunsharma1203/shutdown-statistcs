import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Table from "react-bootstrap/Table";
import Widget from "./Widget";
import "../Widget.css";

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
      const formattedData = formatSectionData(response.data);
      setSectionData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatSectionData = (data) => {
    const formattedSections = {};

    data.sections.forEach((item) => {
      const { section, subsections, customValue, updatedAt } = item;

      if (!formattedSections[section]) {
        formattedSections[section] = {
          section: section,
          subsections: [], // Initialize subsections as an empty array
          subsectionData: {}, // Initialize subsectionData as an empty object
          updatedAt: null, // Initialize updatedAt as null
        };
      }

      subsections.forEach((subsection) => {
        if (!formattedSections[section].subsections.includes(subsection)) {
          formattedSections[section].subsections.push(subsection);
        }
      });

      if (
        customValue !== undefined &&
        (formattedSections[section].updatedAt === null ||
          updatedAt > formattedSections[section].updatedAt)
      ) {
        formattedSections[section].updatedAt = updatedAt;
      }

      if (customValue !== undefined) {
        formattedSections[section].subsectionData[subsections[0]] = customValue;
      }
    });

    return Object.values(formattedSections);
  };

  return (
    <div>
      <div>
        {sectionData.map((data, index) => (
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
              {sectionData.map((data, dataIndex) => (
                <>
                  {data.subsections.map((subsection, subIndex) => (
                    <tr key={`${dataIndex}-${subIndex}`}>
                      <td>{data.section}</td>
                      <td>{subsection}</td>
                      <td>
                        {data.subsectionData[subsection] !== undefined
                          ? data.subsectionData[subsection]
                          : "-"}
                      </td>
                      <td>{moment(data.updatedAt).toString()}</td>
                    </tr>
                  ))}
                </>
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
