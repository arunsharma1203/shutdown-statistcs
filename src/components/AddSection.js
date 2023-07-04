import React, { useState, useEffect } from "react";
import axios from "axios";

const MasterEdit = () => {
  const [newSection, setNewSection] = useState("");
  const [newSubSection, setNewSubSection] = useState("");
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    fetchData();
         
  }, []);

  const fetchData = async () => {
     setIsLoading(true);
    try {
      const response = await axios.get(
        "https://backend-n15a.onrender.com/sections/sections"
      );
      setSections(response.data.sections);
       setIsLoading(false);
    } catch (error) {
      console.error(error);
       setIsLoading(false);
    }
  };

  const handleAddSection = async () => {
    try {
      const sectionData = {
        section: newSection,
        subsections: [newSubSection],
      };

      const response = await axios.post(
        "https://backend-n15a.onrender.com/sections/add-section",
        sectionData
      );

      setNewSection("");
      setNewSubSection("");
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await axios.delete(
        `https://backend-n15a.onrender.com/sections/sections/${sectionId}`
      );
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubsection = async (subsectionId) => {
    try {
      await axios.delete(
        `https://backend-n15a.onrender.com/sections/subsections/${subsectionId}`
      );
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSection = async (sectionId, updatedSection) => {
    try {
      await axios.put(
        `https://backend-n15a.onrender.com/sections/sections/${sectionId}`,
        updatedSection
      );
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSubsection = async (subsectionId, updatedSubsection) => {
    try {
      await axios.put(
        `https://backend-n15a.onrender.com/sections/subsections/${subsectionId}`,
        updatedSubsection
      );
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading === true ? (
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h6 style={{ width: "60%", margin: "5px" }}>
              Add New Section and Subsection
            </h6>
            <input
              style={{ width: "60%", margin: "5px" }}
              className="form-control"
              type="text"
              placeholder="Section"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
            />
            <input
              style={{ width: "60%", margin: "5px" }}
              className="form-control"
              type="text"
              placeholder="Subsection"
              value={newSubSection}
              onChange={(e) => setNewSubSection(e.target.value)}
            />
            <button
              style={{ marginLeft: "5px", margin: "5px" }}
              className="btn btn-primary"
              onClick={handleAddSection}
            >
              Add
            </button>
          </div>

          <h3>Edit Sections and Subsections</h3>

          {sections.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Subsections</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr key={section._id}>
                    <td>{section.section}</td>
                    <td>
                      {section.subsections.map((subsection) => (
                        <div key={subsection}>
                          {subsection}
                          <button
                            style={{ marginLeft: "5px" }}
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteSubsection(subsection)}
                          >
                            Delete
                          </button>
                          <button
                            style={{ marginLeft: "5px" }}
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              const updatedSubsection = prompt(
                                "Enter updated subsection:"
                              );
                              if (updatedSubsection) {
                                handleUpdateSubsection(section._id, {
                                  subsection: updatedSubsection,
                                });
                              }
                            }}
                          >
                            Update
                          </button>
                        </div>
                      ))}
                    </td>
                    <td>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteSection(section._id)}
                      >
                        Delete Section
                      </button>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          const updatedSection = prompt(
                            "Enter updated section:"
                          );
                          if (updatedSection) {
                            handleUpdateSection(section._id, {
                              section: updatedSection,
                            });
                          }
                        }}
                      >
                        Update Section
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sections available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MasterEdit;
