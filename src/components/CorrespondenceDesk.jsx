import React, { useState } from 'react';
import '../css/CorrespondenceDesk.css';
import Footer from './Footer';

const CorrespondenceDesk = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div>
      <div className="page">
      
      
      <header className="header">
        <h1 className="title">The Writing Bureau</h1>
        <p className="subtitle">
          Leave a note for our curators. We read every word.
        </p>
      </header>

      {!isSent ? (
        <Form onSend={handleSend} />
      ) : (
        <Success onReset={() => setIsSent(false)} />
      )}
    </div>
    <Footer />
    </div>
  );
};


const Form = ({ onSend }) => {
  return (
    <form onSubmit={onSend} className="form">

      
      <div className="texture"></div>

      <div className="form-content">

      
        <div className="grid">
          <InputField 
            label="Your Name" 
            type="text" 
            placeholder="e.g. A Fellow Dreamer" 
          />
          <InputField 
            label="Your Email" 
            type="email" 
            placeholder="Where should we reply?" 
          />
        </div>

        
        <div className="message-group">
          <label className="label center">Your Message</label>
          <textarea
            rows="8"
            className="textarea"
            placeholder="Dearest Reader, I wanted to share..."
            required
          ></textarea>
        </div>

        
        <div className="button-wrapper">
          <button type="submit" className="seal-button">
            <span className="button-text">Seal & Send</span>
            <span className="seal-border"></span>
          </button>
        </div>

      </div>
    </form>
  );
};


const InputField = ({ label, type, placeholder }) => {
  return (
    <div className="input-group">
      <label className="label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="input"
      />
    </div>
  );
};


const Success = ({ onReset }) => {
  return (
    <div className="success">
      <div className="icon">✉️</div>

      <h2 className="success-title">Message Dispatched</h2>

      <p className="success-text">
        The postman is on his way. Thank you for your words.
      </p>

      <button onClick={onReset} className="reset-btn">
        Write another note
      </button>
    </div>
  
  );
};

export default CorrespondenceDesk;