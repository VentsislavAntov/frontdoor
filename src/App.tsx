import React, { useEffect, useState } from 'react';
import './App.css';
import Popup from './components/popup/Popup';
import { ContextProvider } from './contexts/EnableButtonContext';

function App() {
  const [apiData, setApiData] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/sample')
      .then((response) => response.text())
      .then((data) => setApiData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p className="Api-test">
          API response: {apiData}
        </p>
        <ContextProvider>
          <Popup />
        </ContextProvider>
      </header>
    </div>
  );
}

export default App;
