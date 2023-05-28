import React, { createContext, useState } from 'react';

interface EnableButtonContextProps {
  isEnabled: boolean;
  toggleEnable: () => void;
}

export const EnableButtonContext = createContext<EnableButtonContextProps>({
  isEnabled: true,
  toggleEnable: () => {},
});

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleEnable = () => {
    setIsEnabled((prevEnabled) => !prevEnabled);
  };

  return (
    <EnableButtonContext.Provider value={{ isEnabled, toggleEnable }}>
      {children}
    </EnableButtonContext.Provider>
  );
};
