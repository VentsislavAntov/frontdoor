import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const Popup = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Retrieve the current enabled state of the extension
    chrome.management.getSelf((result) => {
      setIsEnabled(result.enabled);
    });
  }, []);

  const handleToggle = () => {
    // Toggle the enable/disable state of the extension
    chrome.management.getSelf((result) => {
      const newEnabledState = !result.enabled;
      chrome.management.setEnabled(result.id, newEnabledState, () => {
        setIsEnabled(newEnabledState);
      });
    });
  };

  return (
    <>
      <div className="container">
        <button onClick={handleToggle}>{isEnabled ? 'Disable Extension' : 'Enable Extension'}</button>
      </div>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
