import React, { useState, useEffect } from 'react';
import './Toast.css'; // You need to create a corresponding CSS file

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return visible ? <div className="xtoast">{message}</div> : null;
};

export default Toast;
