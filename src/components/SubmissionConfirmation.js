import React from "react";

const SubmissionConfirmation = ({
  formData,
  section,
  subSection,
  onConfirm,
  onCancel,
}) => {
  return (
    <div>
      <h2>Confirmation</h2>
      <p>Section: {section}</p>
      <p>Sub Section: {subSection}</p>
      <p>Percentage Completed: {formData.customValue}</p>
      <button className="btn btn-primary" onClick={onConfirm}>
        Confirm
      </button>
      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};


export default SubmissionConfirmation;
