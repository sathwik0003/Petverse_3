import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import './AdminDashBoard.css';
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import AdminHeader from '../componants/Admin/AdminHeader';

const AdminInsights = () => {
  const [branddata, setBranddata] = useState(null);
  const [userdata, setUserdata] = useState(null);

  const fetchBrandData = async () => {
    try {
      const response = await fetch(`https://petverse-3.onrender.com/fetchbrandinsights`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setBranddata(data);
    } catch (error) {
      console.error('Error fetching brands data:', error);
    }
  };
  const fetchUsersData = async () => {
    try {
      const response = await fetch(`https://petverse-3.onrender.com/fetchusersinsights`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setUserdata(data)
    } catch (error) {
      console.error('Error fetching brands data:', error);
    }
  };

  

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  });
  const [chartDatau, setChartDatau] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchBrandData();
    fetchUsersData();
  }, []);

  useEffect(() => {
    if (branddata === null || branddata === undefined) {
      return;
    }

    const labels = Object.keys(branddata);
    const initialData = labels.map(() => 0);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Number',
          data: initialData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [branddata]);
  useEffect(() => {
    if (userdata === null || userdata === undefined) {
      return;
    }

    const labels = Object.keys(userdata);
    const initialData = labels.map(() => 0);

    setChartDatau({
      labels: labels,
      datasets: [
        {
          label: 'Number',
          data: initialData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [userdata]);

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      animation: {
        duration: 5000,
        easing: 'linear',
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const chartOptions2 = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    if (branddata === null || branddata === undefined) {
      return;
    }

    const startData = [0, 0, 0, 0, 0];
    const endData = Object.values(branddata);
    const duration = 3000;
    const interval = 100;
    const steps = duration / interval;
    let step = 0;

    const updateDataInterval = setInterval(() => {
      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: prevData.datasets[0].data.map((value, index) => {
              const increment = (endData[index] - startData[index]) / steps;
              return value + increment;
            }),
          },
        ],
      }));

      step += 1;

      if (step >= steps) {
        clearInterval(updateDataInterval);
      }
    }, interval);

    return () => clearInterval(updateDataInterval);
  }, [branddata]);
  useEffect(() => {
    if (userdata === null ||userdata === undefined) {
      return;
    }

    const startData = [0, 0, 0, 0, 0];
    const endData = Object.values(userdata);
    const duration = 3000;
    const interval = 100;
    const steps = duration / interval;
    let step = 0;

    const updateDataInterval = setInterval(() => {
      setChartDatau((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: prevData.datasets[0].data.map((value, index) => {
              const increment = (endData[index] - startData[index]) / steps;
              return value + increment;
            }),
          },
        ],
      }));

      step += 1;

      if (step >= steps) {
        clearInterval(updateDataInterval);
      }
    }, interval);

    return () => clearInterval(updateDataInterval);
  }, [userdata]);

  return (
    <div>
      <div style={{ marginLeft: '20vw' }}>
        <AdminHeader />
      </div>
      <h1 style={{ marginLeft: '45vw', marginTop: '1vw', fontFamily: 'fangsong' }}>ADMIN INSIGHTS</h1>
      <SidebarAdmin />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '24vw' }}>
        <div style={{ display: 'flex', width: '50vw', border: '1px solid black', padding: '30px', borderRadius: '3vw', margin: '2vw', height: '25vw', flexDirection:"column" }}>
        <div>DATA OF SELLERS </div>
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div style={{ display: 'flex', width: '50vw', border: '1px solid black', padding: '30px', borderRadius: '3vw', margin: '2vw', height: '25vw',  flexDirection: 'column' }}>
        <div>DATA OF USERS (TOP 10) </div>
          <Line data={chartDatau} options={chartOptions} />
        </div>
      </div>
      <div style={{marginLeft:'45vw', paddingTop:'1vw', paddingBottom:' 1vw'}}>SAME INSIGHTS IN DOUGHNUT CURVE</div>
      <div style={{ marginLeft: '24vw', width: '70VW', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ width: '20vw', marginLeft:'15vw'}}>
        
          <Doughnut data={chartData} options={chartOptions2} />
        </div>
        <div style={{ width: '20vw' }}>
          <Doughnut data={chartDatau} options={chartOptions2} />
        </div>
      </div>
    </div>
  );
};

export default AdminInsights;
