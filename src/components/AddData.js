import React, { useState, useEffect } from "react";
import SubmissionConfirmation from "./SubmissionConfirmation";
import PinScreen from "./PinScreen";

const KilnForm = () => {
  const [section, setSection] = useState("");
  const [subSection, setSubSection] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [sectionOptions, setSectionOptions] = useState([]);
  const [subSectionOptions, setSubSectionOptions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [pinEntered, setPinEntered] = useState(false);

  useEffect(() => {
    // Fetch section options from backend
    fetchSectionOptions();
  }, []);

  const fetchSectionOptions = async () => {
    try {
      const response = await fetch(
        "https://backend-n15a.onrender.com/sections/new-sections"
      );
      if (response.ok) {
        const data = await response.json();
        // Set section and subsection options from the fetched data
        const uniqueSections = [
          ...new Set(data.sections.map((section) => section.section)),
        ];
        const uniqueSubsections = [
          ...new Set(data.sections.flatMap((section) => section.subsections)),
        ];
        setSectionOptions(uniqueSections);
        setSubSectionOptions(uniqueSubsections);
      } else {
        console.error("Failed to fetch section options");
      }
    } catch (error) {
      console.error("Error fetching section options:", error);
    }
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
    setSubSection(""); // Reset subSection when section changes
  };

  const handleSubSectionChange = (event) => {
    setSubSection(event.target.value);
  };

  const handleCustomValueChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!section || !subSection || !customValue) {
      alert("Please fill in all fields");
      return;
    }
    // Create an object with the form data
    const formData = {
      section: section,
      subSection: subSection,
      customValue: customValue,
    };

    // Display the submission confirmation
    setShowConfirmation(true);
    setFormData(formData);
  };

  const handleConfirm = async () => {
    // Create an object with the form data
    const formData = {
      section: section,
      subSection: subSection,
      customValue: customValue,
    };

    try {
      const response = await fetch(
        "https://backend-n15a.onrender.com/sections/new-sections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully");
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }

    // Reset form fields
    setSection("");
    setSubSection("");
    setCustomValue("");

    // Hide the submission confirmation
    setShowConfirmation(false);
    setFormData(null);
  };

  const handleCancel = () => {
    // Hide the submission confirmation
    setShowConfirmation(false);
    setFormData(null);
  };

  return (
    <div>
      {!pinEntered ? (
        <PinScreen onPinEntered={() => setPinEntered(true)} />
      ) : (
        <div>
          {/* Existing KilnForm code goes here */}
          <div>
            {!showConfirmation ? (
              <form style={{ margin: "15px" }} onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Section</label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      value={section}
                      onChange={handleSectionChange}
                    >
                      <option value="">Select a Section</option>
                      {sectionOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Sub Section</label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      value={subSection}
                      onChange={handleSubSectionChange}
                    >
                      <option value="">Select a Sub Section</option>
                      {subSectionOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Percentage Done:</label>
                  <div style={{textAlign:"center",display : "flex"}} className="col-sm-10">
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="100"
                      step="5"
                      value={customValue}
                      onChange={handleCustomValueChange}
                    />{" "}
                    <p style={{ textAlign: "center" }}>
                      <input
                        style={{ width: "65px",marginRight : "5px" }}
                        disabled
                        className="form-control"
                        defaultValue={customValue}
                      />
                    </p>
                  </div>
                </div>
                {/* Submit button */}
                <div className="row">
                  <div className="col-sm-10 offset-sm-2">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <SubmissionConfirmation
                formData={formData}
                section={section}
                subSection={subSection}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KilnForm;
