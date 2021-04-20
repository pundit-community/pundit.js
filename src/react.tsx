import * as React from 'react';

import { Policy } from './policy';

const PunditContext = React.createContext({ policy: new Policy(null, null) });

interface PunditContextProps {
  children: React.ReactNode;
  policy: Policy;
}

interface WhenProps {
  children: React.ReactNode;
  can: string;
}

export const usePundit = () => {
  const value = React.useContext(PunditContext);
  return value;
};

export const PunditProvider = ({ policy, children }: PunditContextProps) => {
  return (
    <PunditContext.Provider value={{ policy }}>
      {children}
    </PunditContext.Provider>
  );
};

export const When = ({ can, children }: WhenProps) => {
  const { policy } = usePundit();
  const canPerformAction = policy?.can(can);
  return canPerformAction ? children : null;
};
