import React, { useState } from 'react';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import "./searchdriver.css";
import { Card } from 'react-bootstrap';
const SearchDrivers = () => {
  const [familyName, setFamilyName] = useState('');
  const [driverData, setDriverData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://ergast.com/api/f1/drivers?limit=1000&offset=0&FamilyName=${familyName}`);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const driverList = xmlDoc.getElementsByTagName('Driver');

      if (driverList.length > 0) {
        const drivers = Array.from(driverList).map(driver => ({
          givenName: driver.getElementsByTagName('GivenName')[0].textContent,
          familyName: driver.getElementsByTagName('FamilyName')[0].textContent,
          dateOfBirth: driver.getElementsByTagName('DateOfBirth')[0].textContent,
          nationality: driver.getElementsByTagName('Nationality')[0].textContent,
        }));

        const filteredDrivers = drivers.filter(driver => driver.familyName.toLowerCase() === familyName.toLowerCase());

        setDriverData(filteredDrivers);
      } else {
        setDriverData([]);
      }
    } catch (error) {
      console.error(error);
      setDriverData([]);
    }
  };

  return (
    <div className='search-container'>
      <h3>Drivers Database</h3>
      <div className='search-input-container'>
        <input
          type="text"
          value={familyName}
          onChange={e => setFamilyName(e.target.value)}
          placeholder="Enter Surname"
        />
        <button onClick={handleSearch} className='search-button'>Search</button>
      </div>
      {driverData && driverData.length > 0 ? (
        <div className="driver-list">
          {driverData.map((driver, index) => (
            <Card key={index} className="driver-card">
            <Card.Body>
              <Card.Title>{driver.givenName} {driver.familyName}</Card.Title>
              <Card.Text>
                <p>Date of Birth: {driver.dateOfBirth}</p>
                <p>Nationality: {driver.nationality}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          ))}
        </div>
      ) : (
        <p style={{marginTop: 15}}>No drivers found.</p>
      )}
    </div>
  );
};

export default SearchDrivers;

