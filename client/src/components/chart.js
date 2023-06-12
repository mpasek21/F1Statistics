import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, LinearScale} from 'chart.js';
import "./chart.css";
Chart.register(CategoryScale);
Chart.register(LinearScale, BarElement);
const ChartCircuits = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/users/list');
            const data = response.data;

            const countriesCount = {};

            data.forEach(item => {
                const country = item.country;
                if (countriesCount[country]) {
                    countriesCount[country] += 1;
                } else {
                    countriesCount[country] = 1;
                }
            });

            const labels = Object.keys(countriesCount);
            const counts = Object.values(countriesCount);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Number of circuits',
                        data: counts,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching data from server', error);
        }
    };

    return (
        <div>
          <h3 style={{ marginLeft: 15, marginTop: 5 }}>Circuits</h3>
          <div className="barchart-container" style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            {chartData ? (
              <Bar data={chartData} options={{ plugins: { legend: { display: false } } }} />
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      );
};

export default ChartCircuits;
  