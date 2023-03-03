import React, { useState, useEffect } from 'react';

function Report() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = () => {
      fetch('http://localhost:8080/report/topten', { mode: 'cors' })
        .then(response => response.json())
        .then(data => setCustomers(data))
        .catch(error => console.error(error));
    };

    fetchCustomers();

    const intervalId = setInterval(fetchCustomers, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>Top 10 Customers by Overall Sum</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Overall Sum</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.name}>
              <td>{customer.name}</td>
              <td>{customer.sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report;