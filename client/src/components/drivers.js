import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMParser} from 'xmldom';
import { Pie, Bar} from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {ArcElement, Chart, Legend, Tooltip} from 'chart.js';
import './drivers.css';
import {json2xml} from "xml-js";
import Hamilton from './drivers/Hamilton.png';
import Albon from './drivers/Albon.png';
import Alonso from './drivers/Alonso.png';
import Bottas from './drivers/Bottas.png';
import deVries from './drivers/de Vries.png';
import Gasly from './drivers/Gasly.png';
import Hülkenberg from './drivers/Hülkenberg.png';
import Leclerc from './drivers/Leclerc.png';
import Magnussen from './drivers/Magnussen.png';
import Norris from './drivers/Norris.png';
import Ocon from './drivers/Ocon.png';
import Pérez from './drivers/Pérez.png';
import Piastri from './drivers/Piastri.png';
import Russell from './drivers/Russell.png';
import Sainz from './drivers/Sainz.png';
import Sargeant from './drivers/Sargeant.png';
import Stroll from './drivers/Stroll.png';
import Tsunoda from './drivers/Tsunoda.png';
import Verstappen from './drivers/Verstappen.png';
import Zhou from './drivers/Zhou.png';


window.Buffer = window.Buffer || require("buffer").Buffer;

Chart.register(ArcElement, Legend, Tooltip);

const driverImages = {
    Albon, Hamilton, Alonso, Bottas, deVries, Gasly, Hülkenberg, Leclerc, Magnussen, Norris, Ocon, Pérez, Piastri, Russell, Sainz, Sargeant, Stroll, Tsunoda, Verstappen, Zhou
  };

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [nationalityData, setNationalityData] = useState({});
    const [exported, setExported] = useState(false);
    const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [chartType, setChartType] = useState('table');

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
                    permanentNumber: driver.getElementsByTagName('PermanentNumber')[0].textContent,
                    dateOfBirth: driver.getElementsByTagName('DateOfBirth')[0].textContent,
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

        const fetchDriverStandings = async () => {
            try {
              const response = await axios.get(`http://ergast.com/api/f1/current/driverStandings`);
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
                  const constructorResponse = await axios.get(`http://ergast.com/api/f1/current/constructorstandings`);
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
    }, []);

    const Download = (props, type) => {
        const url = URL.createObjectURL(props);
        const link = document.createElement('a');
        link.href = url;
        link.download = `drivers.${type}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setExported(true);
    }
    const ExportJSON = () => {
        const jsonData = JSON.stringify(drivers, null, 2);
        const blob = new Blob([jsonData], {type: 'application/json'});
        Download(blob,'json')
    };

    const ExportXML = () => {
        const jsonData = JSON.stringify(drivers, null, 2);
        const xmlData = json2xml(jsonData, {compact: true, spaces: 4});
        const blob = new Blob([xmlData], {type: 'application/xml'});
        Download(blob, 'xml')
    }

    return (
        <div className="drivers-container">
            <div className="drivers-list">
                <h3>F1 Drivers in 2023 Season</h3>
                <div className="card-container">
                    {drivers.map(driver => (
                         <Card key={driver.driverId} style={{ width: '18rem' }}>
                         <Card.Img className= 'card-img-top' variant="top" src={driverImages[driver.familyName.replace(' ', '')]}/>
                         <Card.Body>
                           <Card.Title className='driver-name'>{`${driver.givenName} ${driver.familyName}`}</Card.Title>
                           <Card.Text>
                             Nationality: {driver.nationality} <br></br>
                             Date of birth: {driver.dateOfBirth} <br></br>
                             Racing number: {driver.permanentNumber}
                           </Card.Text>
                         </Card.Body>
                       </Card>
                    ))}
                </div>
                <div className="buttons-container">
                <button onClick={ExportJSON} className='export-button'>
                    JSON
                </button>
                <button onClick={ExportXML} className='export-button' style={{marginLeft: 15}}>
                    XML
                </button>
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
          <div className="chart-container chart-full-width">
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
            <div className= "table-container">
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
          <div className="chart-container">
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
                    max: Math.max(...constructorStandings.map(standing => Number(standing.points))) + 100,
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

export default Drivers;