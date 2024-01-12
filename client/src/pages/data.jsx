// src/components/DataComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/complaints');

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render your data here */}
          {data.map((item) => (
            <div key={item._id}>
              <p>Name: {item.username}</p>
              <p>Description: {item.complaint}</p>
              {/* ... other fields */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataComponent;
