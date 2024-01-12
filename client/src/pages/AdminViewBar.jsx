import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './AdminDashBoard.css'
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import AdminHeader from '../componants/Admin/AdminHeader';

const AdminViewBar = () => {
    const [chartData, setChartData] = useState({
        labels: ['Users(buyers)', 'Sellers(Brands)', 'Products', 'BagValue', 'Sales'],
        datasets: [
            {
                label: 'Number',
                data: [0, 0, 0, 0, 0], // Initial data set to zeros
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    });

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
                duration: 5000, // Set the total duration of the animation in milliseconds
                easing: 'linear', // Choose an easing function
            },
        },
    };

    useEffect(() => {
        // Simulate gradual data increase over 5 seconds
        const startData = [0, 0, 0, 0, 0];
        const endData = [10, 15, 7, 22, 18];
        const duration = 3000;
        const interval = 100; // Update every 100 milliseconds
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

        // Clear the interval to avoid memory leaks
        return () => clearInterval(updateDataInterval);
    }, []); // Empty dependency array ensures this effect runs only once on component mount



    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#c3c3ced4'}}>
            <SidebarAdmin />
            <div style={{ marginLeft: '20vw', width: '85vw' }}>
            <AdminHeader/>
                <div className='adbar' style={{width:'65vw', paddingLeft:'10vw'}}>
                    <Bar data={chartData} options={chartOptions} style={{height:'350px'}}/>
                </div>
            </div>
        </div>
    );
};

export default AdminViewBar;
