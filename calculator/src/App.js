import React, { useState } from 'react';
import axios from 'axios';

function AverageCalculator() {
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async (numberId) => {
    try {
      const response = await axios.get(`http://localhost:3001/numbers/${numberId}`);
      const data = response.data;
      setNumbers(data.windowCurrState);
      setAvg(data.avg);
      setError(null);
    } catch (error) {
      setError('Error fetching numbers');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
      <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
      <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
      <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>
      <div>
        <h2>Numbers:</h2>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Average:</h2>
        <p>{avg !== null ? avg : 'N/A'}</p>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AverageCalculator;
