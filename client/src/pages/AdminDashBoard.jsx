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
import { Link } from 'react-router-dom';
import Loader from '../componants/Loader';

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

const AdminDashboard = () => {
  const [totalusers, setTotalusers] = useState(null);
  const [totalsellers, setTotalsellers] = useState(null);
  const [totalcomplaints, setTotalcomplaints] = useState(null);
  const [totalproducts, setTotalproducts] = useState(null);
  const [totalsalons, setTotalsalons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const responseu = await fetch('http://localhost:3002/api/user/total');
        if (!responseu.ok) {
          throw new Error(`Error: ${responseu.statusText}`);
        }
        const responsese = await fetch('http://localhost:3002/api/sellerss/total');
        if (!responsese.ok) {
          throw new Error(`Error: ${responsese.statusText}`);
        }
        const responsep = await fetch('http://localhost:3002/api/productss/total');
        if (!responsep.ok) {
          throw new Error(`Error: ${responsep.statusText}`);
        }
        const responsec = await fetch('http://localhost:3002/api/complaintss/total');
        if (!responsec.ok) {
          throw new Error(`Error: ${responsec.statusText}`);
        }
        const responsesa = await fetch('http://localhost:3002/api/salonss/total');
        if (!responsesa.ok) {
          throw new Error(`Error: ${responsesa.statusText}`);
        }
        const datau = await responseu.json();
        console.log(datau)
        setTotalusers(datau.totalusers);
        const datase = await responsese.json();
        setTotalsellers(datase.totalsellers)
        const datap = await responsep.json();
        setTotalproducts(datap.totalproducts)
        const datac = await responsec.json();
        setTotalcomplaints(datac.totalcomplaints)
        const datasa = await responsesa.json();
        setTotalsalons(datasa.totalsalons)
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching total users:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };
  
    fetchTotalUsers();
  }, []);
  
  // If loading, return null until data is fetched
  if (isLoading) {
    return <Loader/>;
  }

  

  const data = {
    u1: 1,
    u2: 100,
    messages: 10,
    products: 300,
    bagValue: 5000,
    saloons: 10,
  };

  return (
    <>
      <SidebarAdmin />
      <div style={{ marginLeft: '20vw' }}>
        <AdminHeader />
      </div>
      <div className="card-container" style={{ marginLeft: '20vw' }}>
        <Link to='/admin/users'>
          <StatisticCard
            icon={<FontAwesomeIcon icon={faUsers} size="2x" />}
            title="Users"
            initialValue={0}
            value={totalusers||0}
            background="7386D5"
          />
        </Link>
        <Link to='/admin/brands'>
          <StatisticCard
            icon={<FontAwesomeIcon icon={faUsers} size="2x" />}
            title="Brands"
            initialValue={0}
            value={totalsellers||0}
            background="7386D6"
          />
        </Link>

        <Link to='/admin/products'>
        <StatisticCard
          icon={<FontAwesomeIcon icon={faShoppingCart} size="2x" />}
          title="Products"
          initialValue={0}
          value={totalproducts||0}
          background="373b44"
        />
        </Link>
        <Link to='/admin/complaints'>
        <StatisticCard
          icon={<FontAwesomeIcon icon={faCommentAlt} size="2x" />}
          title="Complaints"
          initialValue={0}
          value={totalcomplaints||0}
          background="009688"
        />
        </Link>
        <StatisticCard
          icon={<FontAwesomeIcon icon={faRupeeSign} size="2x" />}
          title="Bag Value"
          initialValue={0}
          value={data.bagValue}
          background="FF9800"
        />
        <Link to='/admin/salon'>
        <StatisticCard
          icon={<FontAwesomeIcon icon={faCut} size="2x" />}
          title="Saloons"
          initialValue={0}
          value={totalsalons||0}
          background="E91E63"
        />
        </Link>
      </div>
    </>
  );
};

export default AdminDashboard;
