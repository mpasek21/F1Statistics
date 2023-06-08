/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement, Legend, Tooltip} from 'chart.js';
import './drivers.css';
Chart.register(ArcElement, Legend, Tooltip);

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [nationalityData, setNationalityData] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://ergast.com/api/f1/2023/drivers');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const driverTable = xmlDoc.getElementsByTagName('DriverTable')[0];
        const driverList = driverTable.getElementsByTagName('Driver');

        const formattedDrivers = Array.from(driverList).map(driver => ({
          driverId: driver.getAttribute('driverId'),
          givenName: driver.getElementsByTagName('GivenName')[0].textContent,
          familyName: driver.getElementsByTagName('FamilyName')[0].textContent,
          nationality: driver.getElementsByTagName('Nationality')[0].textContent,
        }));

        setDrivers(formattedDrivers);

        const nationalityCounts = formattedDrivers.reduce((counts, driver) => {
          counts[driver.nationality] = (counts[driver.nationality] || 0) + 1;
          return counts;
        }, {});

        setNationalityData(nationalityCounts);
        console.log(nationalityCounts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="drivers-container">
      <div className="drivers-list">
        <h1>F1 Drivers in 2023 Season</h1>
        <ul>
          {drivers.map(driver => (
            <li key={driver.driverId}>{driver.givenName} {driver.familyName} - {driver.nationality}</li>
          ))}
        </ul>
      </div>
      <div className="chart-container">
        <Pie
          data={{
            labels: Object.keys(nationalityData),
            datasets: [
              {
                data: Object.values(nationalityData),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                ],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const index = context.dataIndex;
                    const label = context.chart.data.labels[index];
                    const value = context.formattedValue;
                    return `${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Drivers;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import './drivers.css';

Chart.register(ArcElement, Legend, Tooltip);

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [nationalityData, setNationalityData] = useState({});
  const [exported, setExported] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://ergast.com/api/f1/2023/drivers');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const driverTable = xmlDoc.getElementsByTagName('DriverTable')[0];
        const driverList = driverTable.getElementsByTagName('Driver');

        const formattedDrivers = Array.from(driverList).map(driver => ({
          driverId: driver.getAttribute('driverId'),
          givenName: driver.getElementsByTagName('GivenName')[0].textContent,
          familyName: driver.getElementsByTagName('FamilyName')[0].textContent,
          nationality: driver.getElementsByTagName('Nationality')[0].textContent,
        }));

        setDrivers(formattedDrivers);

        const nationalityCounts = formattedDrivers.reduce((counts, driver) => {
          counts[driver.nationality] = (counts[driver.nationality] || 0) + 1;
          return counts;
        }, {});

        setNationalityData(nationalityCounts);
        console.log(nationalityCounts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrivers();
  }, []);

  const ExportJSON = () => {
    const jsonData = JSON.stringify(drivers, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drivers.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExported(true);
  };

  return (
    <div className="drivers-container">
      <div className="drivers-list">
        <h1>F1 Drivers in 2023 Season</h1>
        <ul>
          {drivers.map(driver => (
            <li key={driver.driverId}>
              {driver.givenName} {driver.familyName} - {driver.nationality}
            </li>
          ))}
        </ul>
        <button onClick={ExportJSON}>
          JSON
        </button>
      </div>
      <div className="chart-container">
        <Pie
          data={{
            labels: Object.keys(nationalityData),
            datasets: [
              {
                data: Object.values(nationalityData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const index = context.dataIndex;
                    const label = context.chart.data.labels[index];
                    const value = context.formattedValue;
                    return `${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Drivers;
