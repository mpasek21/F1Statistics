import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import { Pie, Bar} from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.css';
import './history.css';
import banner2018 from "./history/2018.jpg"
import banner2019 from "./history/2019.jpg"
import banner2020 from "./history/2020.jpg";
import banner2021 from "./history/2021.jpg";
import banner2022 from "./history/2022.jpg";

Chart.register(ArcElement, Legend, Tooltip);

const historyBanners = {
    banner2018,
    banner2019,
  banner2020,
  banner2021,
  banner2022,
};

const History = () => {
  const [drivers, setDrivers] = useState([]);
  const [nationalityData, setNationalityData] = useState({});
  const [exported, setExported] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2022);
  let bannerImage = selectedYear.toString();
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [chartType, setChartType] = useState('table');


  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`http://ergast.com/api/f1/${selectedYear}/drivers`);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const driverTable = xmlDoc.getElementsByTagName('DriverTable')[0];
        const driverList = driverTable.getElementsByTagName('Driver');

        const formattedDrivers = Array.from(driverList).map(driver => ({
          driverId: driver.getAttribute('driverId'),
          givenName: driver.getElementsByTagName('GivenName')[0].textContent,
          familyName: driver.getElementsByTagName('FamilyName')[0].textContent,
          nationality: driver.getElementsByTagName('Nationality')[0].textContent,
          permanentNumber: driver.getElementsByTagName('PermanentNumber')[0].textContent,
        }));

        setDrivers(formattedDrivers);

        const nationalityCounts = formattedDrivers.reduce((counts, driver) => {
          counts[driver.nationality] = (counts[driver.nationality] || 0) + 1;
          return counts;
        }, {});

        setNationalityData(nationalityCounts);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDriverStandings = async () => {
      try {
        const response = await axios.get(`http://ergast.com/api/f1/${selectedYear}/driverStandings`);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const standingsTable = xmlDoc.getElementsByTagName('StandingsTable')[0];
        const standingsList = standingsTable.getElementsByTagName('DriverStanding');

        const formattedDriverStandings = Array.from(standingsList).map(standing => ({
          driverId: standing.getElementsByTagName('Driver')[0].getAttribute('driverId'),
          givenName: standing.getElementsByTagName('GivenName')[0].textContent,
          familyName: standing.getElementsByTagName('FamilyName')[0].textContent,
          position: standing.getAttribute('position'),
          points: standing.getAttribute('points'),
        }));

        setDriverStandings(formattedDriverStandings);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchConstructorStandings =async() => {
        try {
            const constructorResponse = await axios.get(`http://ergast.com/api/f1/${selectedYear}/constructorstandings`);
            const constructorParser = new DOMParser();
            const constructorXmlDoc = constructorParser.parseFromString(constructorResponse.data, 'text/xml');
            const standingsTable = constructorXmlDoc.getElementsByTagName('StandingsTable')[0];
            const standingsList = standingsTable.getElementsByTagName('ConstructorStanding');
    
            const formattedConstructorStandings = Array.from(standingsList).map(standing => ({
              position: standing.getAttribute('position'),
              positionText: standing.getAttribute('positionText'),
              points: standing.getAttribute('points'),
              wins: standing.getAttribute('wins'),
              constructorId: standing.getElementsByTagName('Constructor')[0].getAttribute('constructorId'),
              name: standing.getElementsByTagName('Name')[0].textContent,
              nationality: standing.getElementsByTagName('Nationality')[0].textContent,
            }));
    
            setConstructorStandings(formattedConstructorStandings);
          } catch (error) {
            console.error(error);
          }
        };
    

    fetchDrivers();
    fetchDriverStandings();
    fetchConstructorStandings();
  }, [selectedYear]);

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
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="text-center"> {selectedYear} Season</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="drivers-container">
            
            <div className="drivers-list">
              <ul className="driver-table-2">
                {drivers.map((driver, index) => (
                  <li key={driver.driverId} className={index % 2 === 0 ? 'even' : 'odd'}>
                    {driver.givenName} {driver.familyName} - {driver.nationality} - {driver.permanentNumber}
                  </li>
                ))}
              </ul>
              <button onClick={ExportJSON} className="btn btn-danger">
                Export JSON
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="years-container">
            <h2>Choose a year:</h2>
            <ul className="year-list">
            <li className={selectedYear === 2018 ? 'active' : ''} onClick={() => setSelectedYear(2018)}>
                2018
              </li>
              <li className={selectedYear === 2019 ? 'active' : ''} onClick={() => setSelectedYear(2019)}>
                2019
              </li>
              <li className={selectedYear === 2020 ? 'active' : ''} onClick={() => setSelectedYear(2020)}>
                2020
              </li>
              <li className={selectedYear === 2021 ? 'active' : ''} onClick={() => setSelectedYear(2021)}>
                2021
              </li>
              <li className={selectedYear === 2022 ? 'active' : ''} onClick={() => setSelectedYear(2022)}>
                2022
              </li>
            </ul>
            <div className="banner-container">
              {bannerImage && (
                <div className="banner-frame">
                  <img
                    src={historyBanners['banner' + selectedYear]}
                    alt={`Banner ${selectedYear}`}
                    className="banner-image"
                  />
                  <div className="banner-caption">Relieve beautiful moment from this season!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="chart-selection">
  <button
    className={`btn btn-danger ${chartType === 'table' ? 'active' : ''}`}
    onClick={() => setChartType('table')}
  >
    Drivers Standings
  </button>
  <button
    className={`btn btn-danger ${chartType === 'bar' ? 'active' : ''}`}
    onClick={() => setChartType('bar')}
  >
    Constructors Standings
  </button>
  <button
    className={`btn btn-danger ${chartType === 'pie' ? 'active' : ''}`}
    onClick={() => setChartType('pie')}
  >
    Nationality Chart
  </button>
</div>

      <div className="row">
        <div className="col-lg-12">
        {chartType === 'pie' && (
          <div className="chart-container-2">
            <Pie
              data={{
                labels: Object.keys(nationalityData),
                datasets: [
                  {
                    data: Object.values(nationalityData),
                    backgroundColor: ['#AA0000', '#fd5c63', '#9e1b32'],
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
                        const value = context.formattedValue;
                        return `${value}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
        {chartType === 'table' && (
            <div className= "table-container-2">
          <table className="table">
  <thead>
    <tr>
      <th>Position</th>
      <th>Driver</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    {driverStandings.map(standing => {
      return (
        <tr key={standing.driverId}>
          <td>{standing.position}</td>
          <td>{`${standing.givenName} ${standing.familyName}`}</td>
          <td>{standing.points}</td>
        </tr>
      );
    })}
  </tbody>
</table>
        </div>
        )}
      </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
        {chartType === 'bar' && (
          <div className="chart-container-2">
            <Bar
              data={{
                labels: constructorStandings.map(standing => standing.name),
                datasets: [
                  {
                    label: 'Points',
                    data: constructorStandings.map(standing => Number(standing.points)),
                    backgroundColor: '#ff0000',
                  },
                ],
              }}
              options={{
                indexAxis: 'x',
                scales: {
                  x: {
                    beginAtZero: true,
                    max: Math.max(...constructorStandings.map(standing => Number(standing.points))) + 10,
                    position: 'left',
                  },
                  y: {
                    offset: true,
                  },
                },
              }}
            />
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;

