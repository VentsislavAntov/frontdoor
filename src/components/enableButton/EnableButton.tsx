import React, { useContext } from 'react';
import { EnableButtonContext } from '../../contexts/EnableButtonContext';
import './EnableButton.css';

const EnableButton = () => {
  const { isEnabled, toggleEnable } = useContext(EnableButtonContext);

  return (
    <button className={`EnableButton ${isEnabled ? 'enabled' : 'disabled'}`} onClick={toggleEnable}>
      {isEnabled ? 'Disable' : 'Enable'}
    </button>
  );
};


export default EnableButton;
