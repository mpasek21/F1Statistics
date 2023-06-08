  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Bar } from 'react-chartjs-2';
  import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
  
  Chart.register(CategoryScale);
  Chart.register(LinearScale, BarElement);
  const ChartComponent = () => {
    const [chartData, setChartData] = useState(null);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/record');
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
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
        {chartData ? <Bar data={chartData} /> : 'Loading...'}
      </div>
    );
  };
  
  export default ChartComponent;
  