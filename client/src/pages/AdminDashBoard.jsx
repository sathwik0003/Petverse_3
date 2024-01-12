import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faShoppingCart,
  faCommentAlt,
  faRupeeSign,
  faCut,
} from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import AdminHeader from '../componants/Admin/AdminHeader';

const StatisticCard = ({ icon, title, initialValue, value, background }) => {
  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    let interval;

    const animationDuration = 1000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(animationDuration / frameDuration);
    let frame = 0;

    const increment = (endValue) => {
      const difference = endValue - initialValue;
      const perFrameIncrement = difference / totalFrames;

      interval = setInterval(() => {
        setDisplayValue((prevValue) => prevValue + perFrameIncrement);
        frame += 1;

        if (frame === totalFrames) {
          clearInterval(interval);
          setDisplayValue(endValue);
        }
      }, frameDuration);
    };

    increment(value);

    return () => {
      clearInterval(interval);
    };
  }, [initialValue, value]);

  return (
    <div className={`card bg-${background}`}>
      <div className="card-statistic-3 p-4">
        <div className="card-icon">{icon}</div>
        <div className="mb-4">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
        <div className="row align-items-center mb-2 d-flex">
          <div className="col-8">
            <h2 className="d-flex align-items-center mb-0 card-value">
              {displayValue.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashBoard = () => {
  const data = {
    u1: 30,
    u2: 100,
    messages: 10,
    products: 300,
    bagValue: 5000,
    saloons: 10,
  };

  return (
    <>
      <SidebarAdmin />
     <div style={{marginLeft:'20vw'}}>
     <AdminHeader />
     </div>
      <div className="card-container" style={{marginLeft:'20vw'}}>
        <StatisticCard
          icon={<FontAwesomeIcon icon={faUsers} size="2x" />}
          title="Users"
          initialValue={0}
          value={data.u1}
          background="7386D5"
        />
        <StatisticCard
          icon={<FontAwesomeIcon icon={faShoppingCart} size="2x" />}
          title="Products"
          initialValue={0}
          value={data.u2}
          background="373b44"
        />
        <StatisticCard
          icon={<FontAwesomeIcon icon={faCommentAlt} size="2x" />}
          title="Complaints"
          initialValue={0}
          value={data.messages}
          background="009688"
        />
        <StatisticCard
          icon={<FontAwesomeIcon icon={faRupeeSign} size="2x" />}
          title="Bag Value"
          initialValue={0}
          value={data.bagValue}
          background="FF9800"
        />
        <StatisticCard
          icon={<FontAwesomeIcon icon={faCut} size="2x" />}
          title="Saloons"
          initialValue={0}
          value={data.saloons}
          background="E91E63"
        />
      </div>
    </>
  );
};

export default AdminDashBoard;
