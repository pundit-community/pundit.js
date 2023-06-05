import React, { JSX, ReactElement } from 'react';
import { Policy } from './policy';

const PunditContext = React.createContext({ policy: new Policy(null, null) });

interface PunditContextProps {
  children: JSX.Element | JSX.Element[] | null;
  policy: Policy;
}

interface WhenProps {
  children: JSX.Element | null;
  can: string;
}

export const usePundit = (): { policy: Policy } => {
  const value = React.useContext(PunditContext);
  return value;
};

export const PunditProvider = ({
  policy,
  children,
}: PunditContextProps): ReactElement => {
  return (
    <PunditContext.Provider value={{ policy }}>
      {children}
    </PunditContext.Provider>
  );
};

export const When = ({ can, children }: WhenProps): JSX.Element | null => {
  const { policy } = usePundit();
  const canPerformAction = policy?.can(can);
  return canPerformAction ? children : null;
};
