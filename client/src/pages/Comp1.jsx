import React, { useState } from "react";
import "./Comp1.css";
import ComplaintsForm from "./CompForm";

const ComplaintsButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  return (
    <div className="complaints-container">
      <div className="before" onClick={toggleFormVisibility}>
        <strong>Complaints? Let us know</strong>
        <span className={`arrowc ${!isFormVisible ? "up" : "down"}`}>
          &#9660;
        </span>
      </div>
      {isFormVisible && (
        <div className={`after ${isFormVisible ? "active" : ""}`}>
          <ComplaintsForm></ComplaintsForm>
        </div>
      )}
    </div>
  );
};

export default ComplaintsButton;
