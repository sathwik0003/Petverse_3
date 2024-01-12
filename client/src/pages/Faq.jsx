import { useState } from "react";
import "./Faq.css";
import dog from "../assets/Dog.jpg";
import safetyFaq from "./safetyFaq";
import nutritionFaq from "./nutritionFaq";
import Header from '../componants/Header'
import Heade2r from '../componants/Heade2r'
import { useParams } from "react-router-dom";
import Footer from "../componants/mainpage/Footer";
const FrequentlyAskedQuestions = () => {
  const {userid}=useParams()
  console.log(userid)
  const [openIndexes, setOpenIndexes] = useState([]);

  // Function to toggle the open/closed state of a FAQ
  const toggleFAQ = (index) => {
    setOpenIndexes((prevIndexes) => {
      const indexExists = prevIndexes.includes(index);

      if (indexExists) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  return (
    <>
    {userid === 'undefined' ? (
      <Heade2r />
    ) : <Header/>}
    <div>
      <div className="faqheading">
        <img src={dog} style={{height: '23rem',
    width: '85rem'}}></img>
        <h1 className="faqhead">Frequently Asked Questions</h1>
      </div>
      <div className="faqsidehead">
        <h2>Safety</h2>
      </div>
      {safetyFaq.map((faq) => (
        <div key={faq.id} className={`faq-item `}>
          <div className="faqquestion" onClick={() => toggleFAQ(faq.id)}>
            <strong>{faq.question}</strong>
            <span
              className={`faqarrow ${
                openIndexes.includes(faq.id) ? "up" : "down"
              }`}
            >
              &#9660;
            </span>
          </div>
          {openIndexes.includes(faq.id) && (
            <div
              className={`faqanswer ${openIndexes.includes(faq.id) ? "open" : ""}`}
            >
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
      <div className="faqsidehead">
        <h2>Nutrition and Ingredients</h2>
      </div>
      {nutritionFaq.map((faq) => (
        <div key={faq.id} className={`faq-item `}>
          <div className="faqquestion" onClick={() => toggleFAQ(faq.id)}>
            <strong>{faq.question}</strong>
            <span
              className={`faqarrow ${
                openIndexes.includes(faq.id) ? "up" : "down"
              }`}
            >
              &#9660;
            </span>
          </div>
          {openIndexes.includes(faq.id) && (
            <div
              className={`faqanswer ${openIndexes.includes(faq.id) ? "open" : ""}`}
            >
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default FrequentlyAskedQuestions;
