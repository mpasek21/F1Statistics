import React, { useState } from 'react';
import axios from 'axios';
import { DOMParser } from 'xmldom';

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
    <div>
      <h1>Drivers Database</h1>
      <div>
        <input
          type="text"
          value={familyName}
          onChange={e => setFamilyName(e.target.value)}
          placeholder="Enter Surname"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {driverData && driverData.length > 0 ? (
        <div>
          <h2>Driver Information</h2>
          {driverData.map((driver, index) => (
            <div key={index}>
              <p>First Name: {driver.givenName}</p>
              <p>Surname: {driver.familyName}</p>
              <p>Date of Birth: {driver.dateOfBirth}</p>
              <p>Nationality: {driver.nationality}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No drivers found.</p>
      )}
    </div>
  );
};

export default SearchDrivers;


