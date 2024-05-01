import "./CompForm.css";
import { useState } from "react";

function ComplaintsForm() {
  const [formData, setFormData] = useState({
    name: "",
    complaintsEmail: "",
    complaints: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send form data to the server
      const response = await fetch("https://petverse-3.onrender.com/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }
  
      // Display success message
      setIsSubmitted(true);
  
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2500);
  
      // Reset form data
      setFormData({
        name: "",
        complaintsEmail: "",
        complaints: "",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      // Handle error
    }
  };
  

  return (
    <>
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="compform" >
          <label className='complabel'>Name</label>
          <input
          className="compinput"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          ></input>
          <label className='complabel'>Complaints</label>
          <input
          className="compinput"
            id="complaintsEmail"
            placeholder="Enter your complaint"
            value={formData.complaintsEmail}
            onChange={handleInputChange}
            required
          ></input>
          <label className='complabel'>Suggestions??</label>
          <textarea
          className="comptextarea"
            id="complaints"
            placeholder="Please tell us more"
            value={formData.complaints}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit" className="compbutton">Submit</button>
        </form>
      )}
      {isSubmitted && (
        <div className={`success-message ${isSubmitted ? "visible" : ""}`}>
          <p>Form submitted successfully!</p>
        </div>
      )}
    </>
  );
}

export default ComplaintsForm;
