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

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 2500);

    setFormData({
      name: "",
      complaintsEmail: "",
      complaints: "",
    });
  };

  return (
    <>
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="compform">
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
