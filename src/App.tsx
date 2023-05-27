import React, { useEffect, useState } from 'react';
import './App.css';
import Popup from './components/popup/Popup';

function App() {
  const [apiData, setApiData] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/sample') // Replace with your server's API endpoint
      .then((response) => response.text())
      .then((data) => setApiData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p className='Api-test'>
          API response: {apiData}
        </p>
        <Popup />
      </header>
    </div>
  );
}

export default App;
