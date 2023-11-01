import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const GraphShow = () => {
  const [startTime, setStartTime] = useState('2023-07-16T21:35:00.000Z');
  const [endTime, setEndTime] = useState('2023-07-16T21:55:00.000Z');
  const [cable, setCable] = useState('1');
  const [data, setData] = useState([]);

  const fetchData = async () => {
  const url = `https://mining-qosx.onrender.com/getData`;
  const params = {
    cable_name: `cable ${cable}`,
    start_time: startTime,
    end_time: endTime,
  };

  console.log("URL:", url);        // Debugging log
  console.log("Params:", params);  // Debugging log

  try {
    const response = await axios.get(url, { params });
    setData(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
  };

  const chartContainerStyle = {
    margin: '20px 0',
    width: '100%',
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1>GraphShow</h1>
      <div style={formStyle}>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={new Date(startTime).toISOString().slice(0, 16)}
            onChange={(e) => setStartTime(new Date(e.target.value).toISOString())}
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={new Date(endTime).toISOString().slice(0, 16)}
            onChange={(e) => setEndTime(new Date(e.target.value).toISOString())}
          />
        </label>
        <label>
          Cable:
          <select value={cable} onChange={(e) => setCable(e.target.value)}>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i} value={i + 1}>Cable {i + 1}</option>
            ))}
          </select>
        </label>
        <button onClick={fetchData}>
          Fetch and Plot Data
        </button>
      </div>

      {data.length > 0 && (
        <div style={chartContainerStyle}>
          <h2>Graph Data</h2>
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="inverse_velocity" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      )}

      <div style={chartContainerStyle}>
        <h2>Deformation</h2>
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="deformation" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default GraphShow;
