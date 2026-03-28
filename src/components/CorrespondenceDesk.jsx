import React, { useState } from 'react';
import axios from 'axios';
import '../css/CorrespondenceDesk.css';
import Footer from './Footer';

const CorrespondenceDesk = () => {
  const [isSent, setIsSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);

      const response = await axios.post(
        'https://jeankariuki.alwaysdata.net/api/writetous',
        data
      );

      console.log(response.data);

      setIsSent(true);

      // Clear form after sending
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error(error);
      alert('Message failed to send');
    }
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
          <Form
            onSend={handleSend}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <Success onReset={() => setIsSent(false)} />
        )}
      </div>

      <Footer />
    </div>
  );
};

const Form = ({ onSend, formData, setFormData }) => {
  return (
    <form onSubmit={onSend} className="form">
      <div className="texture"></div>

      <div className="form-content">
        <div className="grid">
          <InputField
            label="Your Name"
            type="text"
            placeholder="e.g. A Fellow Dreamer"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
          />

          <InputField
            label="Your Email"
            type="email"
            placeholder="Where should we reply?"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />
        </div>

        <div className="message-group">
          <label className="label center">Your Message</label>
          <textarea
            rows="8"
            className="textarea"
            placeholder="Dearest Reader, I wanted to share..."
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value
              })
            }
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

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange
}) => {
  return (
    <div className="input-group">
      <label className="label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="input"
        value={value}
        onChange={onChange}
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