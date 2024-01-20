import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './AdminDashBoard.css'
import SidebarAdmin from '../componants/Admin/SideBarAdmin';
import AdminHeader from '../componants/Admin/AdminHeader';

const AdminInsights = () => {
    const [chartData, setChartData] = useState({
        labels: ['Users(buyers)', 'Sellers(Brands)', 'Products', 'BagValue', 'Sales'],
        datasets: [
            {
                label: 'Number',
                data: [0, 0, 0, 0, 0], // Initial data set to zeros
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)'
                ],
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
        maintainAspectRatio: false, // Add this line to make the chart responsive
        responsive: true, // Add this line to make the chart responsive
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
        <div >
            <div style={{marginLeft:'20vw'}}>
                <AdminHeader/>
            </div>
            <SidebarAdmin />
            <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center', marginLeft: '24vw' }}>
                <div style={{ display: 'flex', width: '50vw', border: '1px solid black', padding: '30px', borderRadius: '3vw', margin: "2vw", height: '25vw' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
                <div style={{ display: 'flex', width: '50vw', border: '1px solid black', padding: '30px', borderRadius: '3vw', margin: "2vw", height: '25vw' }}>
                    <Line data={chartData} options={chartOptions} />
                </div>

            </div>
            <div style={{ marginLeft: "24vw", width:'70VW', display:'flex',flexDirection:'row', flexWrap:"wrap"}}>
               <div style={{width:'20vw'}}>
               <Doughnut data={chartData} options={chartOptions2} />
               </div>
               <div style={{width:'20vw'}}>
               <Doughnut data={chartData} options={chartOptions2} />
               </div>
               <div style={{width:'20vw'}}>
               <Doughnut data={chartData} options={chartOptions2} />
               </div>
            </div>
        </div>
    );
};

export default AdminInsights;