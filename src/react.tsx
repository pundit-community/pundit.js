import * as React from 'react';

const PunditContext = React.createContext();

export const usePundit = () => {
  const value = React.useContext(PunditContext);
  return value;
};

export const PunditProvider = ({ user, record, policy, children }) => {
  return (
    <PunditContext.Provider value={{ user, record, policy }}>
      {children}
    </PunditContext.Provider>
  );
};

export const When = ({ can, children }) => {
  const { policy } = usePundit();
  const canPerformAction = policy.can(can);
};
