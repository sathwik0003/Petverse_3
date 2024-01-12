import React, { useState, useEffect } from 'react';
import Loader from '../componants/Loader';
import ControlledCarousel from '../componants/ControlledCarousel';

const Run = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <ControlledCarousel />}
    </div>
  );
}

export default Run;
