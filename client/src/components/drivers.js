import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMParser} from 'xmldom';
import {Pie} from 'react-chartjs-2';
import {ArcElement, Chart, Legend, Tooltip} from 'chart.js';
import './drivers.css';
import {json2xml} from "xml-js";
window.Buffer = window.Buffer || require("buffer").Buffer;

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
                <ul>
                    {drivers.map(driver => (
                        <li key={driver.driverId}>
                            {driver.givenName} {driver.familyName} - {driver.nationality}
                        </li>
                    ))}
                </ul>
                <button onClick={ExportJSON} className='export-button'>
                    JSON
                </button>
                <button onClick={ExportXML} className='export-button' style={{marginLeft: 15}}>
                    XML
                </button>
            </div>
            <div className="chart-container">
                <Pie
                    data={{
                        labels: Object.keys(nationalityData),
                        datasets: [
                            {
                                data: Object.values(nationalityData),
                                backgroundColor: ['#BA110C', '#FF1801', '#FF2E2E'],
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